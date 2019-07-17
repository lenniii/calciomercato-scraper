import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

const NavBar: React.FC<IProps> = ({
  filterValue,
  handleFilterChange,
  showFilter
}) => {
  return (
    <nav className={styles.navbar}>
      <span>
        <h1>MercApp</h1>
      </span>
      {showFilter ? (
        <input
          type="text"
          className={styles.filter}
          value={filterValue}
          placeholder="Filter.."
          onChange={e => handleFilterChange(e)}
        />
      ) : null}
      <span>
        <h1>
          <Link to="/">Home</Link>
        </h1>
      </span>
    </nav>
  );
};

interface IProps {
  filterValue?: string;
  handleFilterChange: Function;
  showFilter: boolean;
}

export default NavBar;
