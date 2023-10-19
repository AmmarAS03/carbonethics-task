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

const centerTextStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70px", // Center vertically in the viewport
    marginTop: "80px",
  };
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



const FavoritesPage = ({ selectedArticles }) => {
  return (
    <div>
      <div style={centerTextStyle}>
        <Typography variant="h4" gutterBottom>
          Favorite Page
        </Typography>
      </div>
      
      <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "50px"
      }}
    >
      {selectedArticles.map((article, index) => (
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
      </Card>
      
      ))}
      </div>
    </div>
  );
};

export default FavoritesPage;