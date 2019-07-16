import React from "react";
import styles from "./teamBadge.module.css";
const TeamBadge: React.FC<IProps> = ({ team }) => {
  return (
    <div
      className={styles.badge}
      style={{
        backgroundImage: `URL(/teambadges/${team.toLowerCase()}.png)`
      }}
    >
      <span className={styles.badgeText}>{team}</span>
    </div>
  );
};

interface IProps {
  team: string;
}

export default TeamBadge;
