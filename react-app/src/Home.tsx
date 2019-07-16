import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar/navbar";
import TeamBadge from "./components/teamBadge/teamBadge";
import { teamsList } from "./helpers/teams";

const Home: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([""]);
  const handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFilterValue(event.currentTarget.value);
  };
  useEffect(() => {
    console.log(filterValue);
    const newArray: string[] = teamsList.filter(item =>
      item.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredArray(newArray);
  }, [filterValue]);
  return (
    <div className="App">
      <NavBar
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />
      <div className="container ">
        {!filterValue
          ? renderTeamBadges(teamsList)
          : renderTeamBadges(filteredArray)}
      </div>
    </div>
  );
};

const renderTeamBadges = (teamsList: string[]) => {
  return teamsList.map((team: string, i: number) => {
    return <TeamBadge team={team} key={i} />;
  });
};

export default Home;
