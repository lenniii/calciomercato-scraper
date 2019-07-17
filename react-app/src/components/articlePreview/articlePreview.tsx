import React from "react";
import styles from "./articlePreview.module.css";
const ArticlePreview: React.FC<IProps> = ({ title, description, image }) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${image})` }}
    >
      <span>
        <h1>{title}</h1>
      </span>
      <div className={styles.description}>
        <span>{description}</span>
      </div>
    </div>
  );
};

interface IProps {
  title: string;
  description: string;
  image: string;
}

export default ArticlePreview;
