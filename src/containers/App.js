import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { searchField } from '../actions.js';

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfiled, setSearchfiled] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  function onSearchChange(event) {
    setSearchfiled(event.target.value);
  }

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfiled.toLowerCase());
  });

  return !robots.length ? (
    <h2 className="white mt3 ml3">Loading...</h2>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  );
}

export default App;
