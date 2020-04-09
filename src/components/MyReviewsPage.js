import React from "react";
import NavMenu from "./NavMenu";
import ReviewRect from "./ReviewRect";
import './components.scss';



class MyReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
      <NavMenu />
      <div className="myReviewContainer">
        <p className="myReviewTitle">My reviews</p>
        <hr className="underlineReview" />
        <ReviewRect
          initials={"LG"} 
          title={"Title"}
          avatarColor={"#FCEAD5"}
          avatarFontColor={"#AA6410"}
          rating={3}
          drugName={"Xanax"}
          review={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        
        />
        <ReviewRect
          initials={"LG"} 
          title={"Title"}
          avatarColor={"#FCEAD5"}
          avatarFontColor={"#AA6410"}
          rating={3}
          drugName={"Xanax"}
          review={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
        
        />
        <ReviewRect
          initials={"LG"} 
          title={"Title"}
          avatarColor={"#FCEAD5"}
          avatarFontColor={"#AA6410"}
          rating={3}
          drugName={"Xanax"}
          review={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}
        
        />
      </div>
    </div>
    );
  }
}

export default MyReviewsPage;