import React from "react";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import './components.scss';


const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: 30 }} />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon style={{ fontSize: 30 }} />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon style={{ fontSize: 30 }} />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon style={{ fontSize: 30 }} />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon style={{ fontSize: 30 }} />,
      label: 'Very Satisfied',
    },
  };
  
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  function IconContainerUser(props) {
    if(localStorage.getItem("admin")){
      return <div className="iconContainer">
                <IconButton href={"../edit/review?id=" + props.id} className="reviewRectIconButton" aria-label="edit">
                    <EditIcon style={{ fontSize: 30 }} className="reviewRectIcon" />
                </IconButton>
                <IconButton className="reviewRectIconButton" aria-label="delete">
                    <DeleteIcon style={{ fontSize: 30 }} className="reviewRectIcon" />
                </IconButton>
              </div>;    
    }
    else {
    return <div className="iconContainer" style={(props.user_id == localStorage.getItem("id")) ? null : {display: "none"}}>
              <IconButton href={"../edit/review?id=" + props.id} className="reviewRectIconButton" aria-label="edit">
                  <EditIcon style={{ fontSize: 30 }} className="reviewRectIcon" />
              </IconButton>
              <IconButton className="reviewRectIconButton" aria-label="delete">
                  <DeleteIcon style={{ fontSize: 30 }} className="reviewRectIcon" />
              </IconButton>
            </div>;
}  
}



class ReviewRect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="reviewRectBoxContainer" boxShadow={3} borderRadius={4} >
        <div>
            <Avatar style={{backgroundColor: this.props.avatarColor, color: this.props.avatarFontColor, width: "45px", height: "45px"}} className="avatarRect">{this.props.initials}</Avatar>
            <p className="reviewAuthor">{this.props.user}</p>
            <IconContainerUser id={this.props.id} user_id={this.props.user_id} />
        </div>
            <hr className="rectUnderline" />
            <Rating
              className="ratingRect"
              name="customized-icons"
              defaultValue={this.props.rating}
              IconContainerComponent={IconContainer}
              readOnly 
            />
            <p className="rectTime">10 hours ago</p>
            <p className="reviewRectTitle"><span className="reviewRectComponentTitle">{this.props.title}</span><span className="reviewRectComponentParagraph"> review of </span><span className="reviewRectComponentTitle">{this.props.drugName}</span></p>
            <p className="reviewRectParagraph">{this.props.review}</p>
      </Box>
    );
  }
}

export default ReviewRect;