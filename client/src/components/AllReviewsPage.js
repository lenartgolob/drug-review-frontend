import React from "react";
import NavMenu from "./NavMenu";
import ReviewRect from "./ReviewRect";
import './components.scss';

class AllReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        reviews: [{}],
        isLoaded: false,
    };
  }

  componentDidMount() {

    fetch('https://drug-review-backend.herokuapp.com/all/reviews')
      .then(res => res.json())
      .then(reviews => this.handleReviews(reviews));

  }

  handleReviews(reviews) {
    console.log("reviews")

    console.log(reviews)
    this.setState({
      reviews: reviews,
      isLoaded: true,
    })
  }


  render() {
    return (
        <div className="container">
        <NavMenu />
        <div className="myReviewContainer">
        <p className="myReviewTitle">All reviews</p>
          <hr className="underlineReview" />
          {
            this.state.reviews.map((item, i) => {
              if(this.state.isLoaded){
                var name = this.state.reviews[i].name;
                var lastName = this.state.reviews[i].lastname;
                var avatarName = name.charAt(0);
                var avatarLastName = lastName.charAt(0);
        
                var initials = avatarName + avatarLastName;

              return <ReviewRect 
                        key={i}
                        id={this.state.reviews[i].id}
                        user_id={this.state.reviews[i].user_id}
                        initials={initials} 
                        user={this.state.reviews[i].name + " " + this.state.reviews[i].lastname}
                        title={this.state.reviews[i].title}
                        avatarColor={this.state.reviews[i].avatar_color}
                        avatarFontColor={this.state.reviews[i].avatar_font_color}
                        rating={this.state.reviews[i].rating}
                        drugName={this.state.reviews[i].drug}
                        review={this.state.reviews[i].review}
                     />
              }
              else {
                return null;
              }
              })
          }
        </div>
      </div>
    );
  }
}

export default AllReviewsPage;