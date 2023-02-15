import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { setSearchField } from '../actions.js';
import './App.css';

function App() {
  const [robots, setRobots] = useState([]);

  const searchField = useSelector((state) => state.searchField);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  function onSearchChange(event) {
    dispatch(setSearchField(event.target.value));
  }

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
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
