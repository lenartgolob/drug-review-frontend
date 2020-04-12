import React from "react";
import NavMenu from "./NavMenu";
import ReviewRect from "./ReviewRect";
import { Redirect } from 'react-router';
// import Grid from '@material-ui/core/Grid';
import './components.scss';



class MyReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleReviews = this.handleReviews.bind(this);
    this.state = {
      reviews: [{}],
      isLoaded: false,
      redirect: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("id") == null) {
      this.setState({ redirect: true })
    }
    else {
    fetch('http://localhost:5000/my/reviews',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: localStorage.getItem("id")
      })
    })
    .then(res => res.json())
    .then(reviews => this.handleReviews(reviews));
    }
  }

  handleReviews(reviews) {
    console.log(reviews)
    this.setState({
      reviews: reviews,
      isLoaded: true,
    })
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/login'/>;
    }
    return (
      <div className="container">
      <NavMenu />
      <div className="myReviewContainer">
        <p className="myReviewTitle">My reviews</p>
        <hr className="underlineReview" />
        {
          this.state.reviews.map((item, i) => {
            if(this.state.isLoaded){
            return <ReviewRect 
                      key={i}
                      id={this.state.reviews[i].id}
                      user_id={this.state.reviews[i].user_id}
                      initials={localStorage.getItem("initials")} 
                      user={this.state.reviews[i].name + " " + this.state.reviews[i].lastname}
                      title={this.state.reviews[i].title}
                      avatarColor={localStorage.getItem("avatar_color")}
                      avatarFontColor={localStorage.getItem("avatar_font_color")}
                      rating={this.state.reviews[i].rating}
                      drugName={this.state.reviews[i].drug}
                      review={this.state.reviews[i].review}
                   />
            }
            else {
              return null
            }
            })
        }
      </div>
    </div>
    );
  }
}

export default MyReviewsPage;