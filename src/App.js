import React from "react";
import { ProvideAuth } from "./use-auth.js";
import AuthSignIn from './components/AuthSignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './style.scss';
import Menu from "./components/Menu/Menu.js";
import Game from "./components/Game/Game.js";
import Leaderboard from "./components/Leaderboard/Leaderboard.js";

function App() {

  const wallies = [
    {
      url: './images/wally-1.jpg',
      title: 'Wally 1',
      level: 1,
      id: '0001',
      WallyPos: {
        left: 28.26,
        top: 34.69
      }
    },
    {
      url: './images/wally-2.jpg',
      title: 'Wally 2',
      level: 2,
      id: '0002',
      WallyPos: {
        left: 49.02,
        top: 42.82
      }
    },
    {
      url: './images/wally-3.jpg',
      title: 'Wally 3',
      level: 3,
      id: '0003',
      WallyPos: {
        left: 61.87,
        top: 38.97
      }
    },
    {
      url: './images/wally-4.jpg',
      title: 'Wally 4',
      level: 1,
      id: '0004',
      WallyPos: {
        left: 40.51,
        top: 63.34
      }
    },
    {
      url: './images/wally-5.jpg',
      title: 'Wally 5',
      level: 5,
      id: '0005',
      WallyPos: {
        left: 59.23,
        top: 67.69
      }
    }
  ]

  return (
    <ProvideAuth>
      <Router>
        <nav>
          <div className='nav-links'>
            <Link to="/"><h1>Menu</h1></Link>
            <Link to="/leaderboard"><h1>Leaderboard</h1></Link>
          </div>
          <AuthSignIn />
        </nav>
        <Switch>
            <Route exact path="/">
              <Menu wallies={wallies}/>
            </Route>
            <Route path="/game/:id" children={<Game wallies={wallies}/>} />
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
          </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
