import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Calculator from '../Calculator/calculator';
import Home from '../Home/Home';
import RouteNavigator from '../Navigator/navigator';
import Pomodoro from '../Pomodoro/pomodoro';
import Projects from '../Projects/Projects';
import Quotes from '../Quotes/quotes';
import Soundboard from '../Soundboard/soundboard';
import Forum from '../Forum/forum';
import Markdown from '../Markdown/markdown';

function App() {
  return (
    <Router >
      <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/"><RouteNavigator /></Route>
      </Switch>
      <Route path="/projects"><Projects /> </Route>
      <Route path="/pomodoro"><Pomodoro /></Route>
      <Route path="/quotes"><Quotes /></Route>
      <Route path="/soundboard"><Soundboard /></Route>
      <Route path="/calculator"><Calculator /></Route>
      <Route path="/forum"><Forum /> </Route>
      <Route path="/markdown-preview"><Markdown />  </Route>
    </Router>)
}

export default App;

export const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
]
