import "./App.scss";
import Play from "./Play";
import Intro from "./Intro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import useLocalStorage from "./utils/useLocalStorage";

function App() {
  const [isActive, setIsActive] = useLocalStorage("isActive", false);

  return (
    <div className="app">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Intro setIsActive={setIsActive} />
          </Route>
          <Route path="/play">
            <Play isActive={isActive} setIsActive={setIsActive} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
