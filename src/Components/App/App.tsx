import { Route, Switch, useLocation } from 'react-router-dom';
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
import Hanoi from '../Hanoi/Hanoi';
import Game2048 from "../2048/2048";
import Wordle from '../Wordle/Wordle';
import GraphiqlPage from '../Graphiql/Graphiql';

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
                <Route path="/quiz" key={"quiz"} ><Quiz /></Route>
                <Route path="/about" key={"about"} ><About /></Route>
                <Route path="/contact" key={"contact"} ><Contact /> </Route>
                <Route path="/memory" key={"memory"}  ><Memory /> </Route>
                <Route path="/sudoku" key={"sudoku"}  ><Sudoku /> </Route>
                <Route path="/hanoi" key={"hanoi"}  ><Hanoi /> </Route>
                <Route path="/2048" key={"2048"}  ><Game2048 /> </Route>
                <Route path="/wordle" key={"wordle"}  ><Wordle /> </Route>
                <Route path="/graphiql" key={"graphiql"}  ><GraphiqlPage /> </Route>
            </Switch>
        </AnimatePresence>
    )
}

export default App;


