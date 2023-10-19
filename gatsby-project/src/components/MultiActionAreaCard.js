import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea, CardActions } from "@mui/material"
import IconCheckboxes from "./IconCheckbox"
import { useEffect, useState } from "react"
import { navigate } from "@reach/router"
import "./card.css"

// const cardStyle = {
//   margin: "0.5rem",
//   flex: "1 1 calc(33.33% - 1rem)",
// }

export default function MultiActionAreaCard({ searchQuery }) {
  const [articles, setArticles] = useState([])
  const [selectedArticles, setSelectedArticles] = useState([]);


  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2023-09-19&sortBy=publishedAt&apiKey=d5a8d176c7164cd9a575504e00505fb1"
    )
      .then(response => response.json())
      .then(data => {
        if (data && data.articles && data.articles.length > 0) {
          // Set the articles from the response in state
          setArticles(data.articles.slice(35, 50)) // Get the first 15 articles
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }, [])
  console.log(articles)
  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };
  const truncateAuthor = (author, maxLength) => {
    // Check if author is null and provide a fallback value
    const authorText = author || 'Unknown Author';
    
    if (authorText.length <= maxLength) return authorText;
    return authorText.substring(0, maxLength) + '...';
  };

  const formatDate = dateString => {
    // Convert the ISO date string to a Date object
    const date = new Date(dateString);
    // Format the date as "YYYY-MM-DD" (e.g., 2023-09-25)
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  const filteredArticles = articles.filter((article) =>
  article.title.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleCheckboxChange = (article) => {
    setSelectedArticles((prevSelectedArticles) => {
      const articleIndex = prevSelectedArticles.findIndex((a) => a.id === article.id);
      if (articleIndex !== -1) {
        const updatedSelectedArticles = [...prevSelectedArticles];
        updatedSelectedArticles.splice(articleIndex, 1);
        return updatedSelectedArticles;
      } else {
        return [...prevSelectedArticles, article];
      }
    });
  };
  
  useEffect(() => {
    // Load selected articles from localStorage
    const storedSelectedArticles = JSON.parse(localStorage.getItem('selectedArticles')) || [];
    setSelectedArticles(storedSelectedArticles);
  }, []);
  
  useEffect(() => {
    // Save selected articles to localStorage whenever it changes
    localStorage.setItem('selectedArticles', JSON.stringify(selectedArticles));
  }, [selectedArticles]);

  console.log(selectedArticles);



  return (
    
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "50px"
      }}
    >
        
      {filteredArticles.map((article, index) => (
        <Card
          key={index}
          sm={{ maxWidth: 250, maxHeight: 270 }}
          sx={{ maxWidth: 345, maxHeight: 401 }}
          className="card"
        >
          <div
            onClick={() => {
              navigate(article.url) // Navigating to the article's URL
            }}
          >
            <CardActionArea>
              {article && (
                <CardMedia
                  component="img"
                  height="140"
                  image={article.urlToImage}
                  alt="Image Description"
                />
              )}
              <CardContent>
                {article && (
                  <>
                    <Typography gutterBottom variant="h5" component="div">
                    {truncateTitle(article.title, 40)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.source.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: {truncateAuthor(article.author,20)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Published At: {formatDate(article.publishedAt)}
                    </Typography>
                  </>
                )}
              </CardContent>
            </CardActionArea>
          </div>

          <CardActions>
          <IconCheckboxes onCheckboxChange={() => handleCheckboxChange(article)} />
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
