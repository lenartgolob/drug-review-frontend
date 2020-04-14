import React from "react";
import "./App.scss";
import LoginPageResponsive from "./components/LoginPageResponsive";
import SearchPage from "./components/SearchPage";
import ReviewPage from "./components/ReviewPage";
import MyReviewsPage from "./components/MyReviewsPage";
import ProfilePage from "./components/ProfilePage";
import ReviewsPage from "./components/ReviewsPage";
import AllReviewsPage from "./components/AllReviewsPage";
import ReviewEditPage from "./components/ReviewEditPage";
import MobileLogin from "./components/MobileLogin";
import MobileRegister from "./components/MobileRegister";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



class App extends React.Component {

  render() {

    return (
      <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact component={SearchPage} />
          <Route path="/login" component={LoginPageResponsive} />
          <Route path="/review" component={ReviewPage} />
          <Route path="/edit/review" component={ReviewEditPage} />
          <Route path="/user/reviews" component={MyReviewsPage} />
          <Route path="/user/profile" component={ProfilePage} />
          <Route path="/reviews" component={ReviewsPage} />
          <Route path="/all/reviews" component={AllReviewsPage} />
          <Route path="/mobile_login" component={MobileLogin} />
          <Route path="/register/mobile" component={MobileRegister} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
      </Router>
    );
  }
}



export default App;