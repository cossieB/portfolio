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
import Quiz from '../Quiz/Quiz';
import About from '../About/about';
import Contact from '../Contact/contact';
import Memory from '../Memory/Memory';

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
      <Route path="/quiz"><Quiz  /></Route>
      <Route path="/about"><About  /></Route>
      <Route path="/contact"><Contact /> </Route>
      <Route path="/memory"><Memory /> </Route>
    </Router>)
}

export default App;


