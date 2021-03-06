import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
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
import { AnimatePresence } from 'framer-motion';
import Sudoku from '../Sudoku/Sudoku';

function App() {
    const location = useLocation()
  return (
    <AnimatePresence>
      <Switch>
      <Route exact path="/" key={"home"} ><Home /></Route>
      <Route path="/" key={"nav"} ><RouteNavigator /></Route>
      </Switch>
      <Route path="/projects" key={"projects"} ><Projects /> </Route>
      <Switch location={location} key={location.pathname}>
      <Route path="/pomodoro" key={"pomodoro"} ><Pomodoro /></Route>
      <Route path="/quotes" key={"quotes"} ><Quotes /></Route>
      <Route path="/soundboard" key={"soundboard"} ><Soundboard /></Route>
      <Route path="/calculator" key={"calculator"} ><Calculator /></Route>
      <Route path="/forum" key={"forum"} ><Forum /> </Route>
      <Route path="/markdown-preview" key={"markdown"} ><Markdown />  </Route>
      <Route path="/quiz" key={"quiz"} ><Quiz  /></Route>
      <Route path="/about" key={"about"} ><About  /></Route>
      <Route path="/contact" key={"contact"} ><Contact /> </Route>
      <Route path="/memory" key={"memory"}  ><Memory /> </Route>
      <Route path="/sudoku" key={"sudoku"}  ><Sudoku /> </Route>
      </Switch>
      </AnimatePresence>
    )
}

export default App;


