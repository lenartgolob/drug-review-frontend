import React from "react";
import "./App.scss";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import ReviewPage from "./components/ReviewPage";
import NavMenu from "./components/NavMenu";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



class App extends React.Component {

  render() {

    return (
      <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact component={SearchPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/review" component={ReviewPage} />
          <Route path="/nav" component={NavMenu} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
      </Router>
    );
  }
}



export default App;