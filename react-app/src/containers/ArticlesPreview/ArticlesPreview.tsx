import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import NavBar from "../../components/navbar/navbar";
import axios from "axios";

const ArticlesPreview: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const [articles, setArticles] = useState({});

  const getArticlesPreview = async (team: string) => {
    const articles = await axios.get(`http://localhost:3001/teams/${team}`);
    setArticles(articles.data);
    console.log(articles.data);
  };

  useEffect(() => {
    getArticlesPreview(match.params.teamName);
  }, [match.params.teamName]);

  return <NavBar showFilter={false} handleFilterChange={() => {}} />;
};

type params = {
  teamName: any;
};

export default ArticlesPreview;
