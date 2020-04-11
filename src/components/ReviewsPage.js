import React from "react";
import queryString from 'query-string';
import NavMenu from "./NavMenu";
import ReviewRect from "./ReviewRect";
import './components.scss';



class ReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        reviews: [{}],
        isLoaded: false,
    };
  }

  componentDidMount() {
    var url = this.props.location.search;
    var params = queryString.parse(url);
    var drug = params.drug;
    this.setState({drug: drug})

    fetch('http://localhost:5000/reviews',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          drug: drug
        })
      })
      .then(res => res.json())
      .then(reviews => this.handleReviews(reviews));

  }

  handleReviews(reviews) {
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
        <p className="myReviewTitle">{this.state.drug}</p>
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

export default ReviewsPage;