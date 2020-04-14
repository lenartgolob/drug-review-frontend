import React from "react";
import "../App.scss";
import NavMenu from "./NavMenu";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Review from "./Review";
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import './components.scss';

const styles = {
  popupIndicatorOpen: {
    display: "none"
  }
};

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleRecentReviews = this.handleRecentReviews.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state = {
      drugs: [],
      review1: {},
      review2: {},
      review3: {},
      drug: null,
    };
  }

  componentDidMount() {
    fetch("https://datadiscovery.nlm.nih.gov/resource/crzr-uvwg")
        .then(response => {
            return response.json();
        })
        .then(data => {
            let tmpArray = []
            for (var i = 0; i < data.length; i++) {
                tmpArray.push(data[i].medicine_name)
            }

            const uniqueDrugs = Array.from(new Set(tmpArray));


            this.setState({
                drugs: uniqueDrugs
            })
        });

        fetch('http://localhost:5000/reviews/recent')
        .then(res => res.json())
        .then(reviews => this.handleRecentReviews(reviews));
          
}

keyPress(e){
  if(e.keyCode === 13){
    if(this.state.drug === null) {

    }
    else {
      localStorage.setItem('drug', this.state.drug);
      window.location.href = "/reviews?drug=" + this.state.drug;

    }
  }
}

  handleRecentReviews(reviews) {
    this.setState({
      review1: reviews[0],
      review2: reviews[1],
      review3: reviews[2],

    });

  }

  render() {
    const { classes } = this.props;

    return (
    <div className="container">
      <NavMenu />
      <h1 className="welcome">Welcome to drug review!</h1>
      <h4 className="subtitle">Read reviews. Write reviews. Find drugs.</h4>
      <div className="searchContainer">
        <Autocomplete
          openText={"Search"}
          popupIcon={<a href={(this.state.drug === null) ? null : "/reviews?drug=" + this.state.drug}><SearchIcon /></a>}
          classes={{ popupIndicatorOpen: classes.popupIndicatorOpen }}          
          openOnFocus={true}
          onKeyDown={this.keyPress}
          onChange={(event, value) => this.setState({drug: value})}
          className="autocomplete"
          id="combo-box-demo"
          options={this.state.drugs}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Search for drugs" variant="outlined" />}
        />
        <Button
          variant="contained"
          color="default"
          href="/review"
          className="reviewButton"
          startIcon={<CloudUploadIcon />}
        >
          Write Your Review
        </Button>
      </div>
        <h2 className="recentReviewsTitle">Featured</h2>
        <hr className="underlineRecentReviews" />
        <div className="reviewRow">
          {(this.state.review1.rating > 0) ?  
            <Review 
              initials={this.state.review1.initials} 
              title={this.state.review1.title}
              avatarColor={this.state.review1.avatar_color}
              avatarFontColor={this.state.review1.avatar_font_color}
              rating={this.state.review1.rating}
              drugName={this.state.review1.drug}
              review={this.state.review1.review}
            />  
            :
            null
          }
          {(this.state.review1.rating > 0) ?  
            <Review 
              initials={this.state.review2.initials} 
              title={this.state.review2.title}
              avatarColor={this.state.review2.avatar_color}
              avatarFontColor={this.state.review2.avatar_font_color}
              rating={this.state.review2.rating}
              drugName={this.state.review2.drug}
              review={this.state.review2.review}
            />  
            :
            null
          }
          {(this.state.review1.rating > 0) ?  
            <Review 
              initials={this.state.review3.initials} 
              title={this.state.review3.title}
              avatarColor={this.state.review3.avatar_color}
              avatarFontColor={this.state.review3.avatar_font_color}
              rating={this.state.review3.rating}
              drugName={this.state.review3.drug}
              review={this.state.review3.review}
            />  
            :
            null
          }
        </div>
    </div>
    );
  }
}
export default withStyles(styles)(SearchPage)