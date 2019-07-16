import React from "react";
import styles from "./navbar.module.css";

const NavBar: React.FC<IProps> = ({ filterValue, handleFilterChange }) => {
  return (
    <nav className={styles.navbar}>
      <span>
        <h1>MercApp</h1>
      </span>
      <input
        type="text"
        className={styles.filter}
        value={filterValue}
        placeholder="Filter.."
        onChange={e => handleFilterChange(e)}
      />
      <span>
        <h1>
          <a href="/">Home</a>
        </h1>
      </span>
    </nav>
  );
};

interface IProps {
  filterValue: string;
  handleFilterChange: Function;
}

export default NavBar;
