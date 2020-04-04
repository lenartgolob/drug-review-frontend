import React from "react";
import "./App.scss";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import UserSearchPage from "./components/Review";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



class App extends React.Component {

  render() {

    return (
      <Router>
      <div>
        <Switch>
        <Route path="/" exact component={SearchPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/search" component={UserSearchPage} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
      </Router>
    );
  }
}



export default App;