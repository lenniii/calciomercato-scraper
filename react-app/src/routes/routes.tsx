import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../containers/home/Home";
import ArticlesPreview from "../containers/ArticlesPreview/ArticlesPreview";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:teamName" component={ArticlesPreview} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
