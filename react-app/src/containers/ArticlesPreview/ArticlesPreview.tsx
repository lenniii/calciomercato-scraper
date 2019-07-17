import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import NavBar from "../../components/navbar/navbar";
import ArticlePreview from "../../components/articlePreview/articlePreview";
import axios from "axios";
import { string } from "prop-types";

const ArticlesPreview: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const [articles, setArticles] = useState([
    {
      title: "",
      contentSnippet: "",
      img_url: ""
    }
  ]);

  const getArticlesPreview = async (team: string) => {
    const articles = await axios.get(`http://localhost:3001/teams/${team}`);
    setArticles(articles.data);
    console.log(articles.data);
  };

  useEffect(() => {
    getArticlesPreview(match.params.teamName);
  }, [match.params.teamName]);

  return (
    <div>
      <NavBar showFilter={false} handleFilterChange={() => {}} />
      {articles &&
        articles.map((article, i) => {
          return (
            <ArticlePreview
              title={article.title}
              description={article.contentSnippet}
              image={article.img_url}
            />
          );
        })}
    </div>
  );
};

type params = {
  teamName: any;
};

export default ArticlesPreview;
