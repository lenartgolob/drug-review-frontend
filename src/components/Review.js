import React from "react";
import './components.scss';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Avatar from '@material-ui/core/Avatar';

const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: 29 }} />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon style={{ fontSize: 29 }} />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon style={{ fontSize: 29 }} />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon style={{ fontSize: 29 }} />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon style={{ fontSize: 29 }} />,
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

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // const url = "http://localhost:5000/api/customers";

    // fetch(url)
    //   .then(res => res.json())
    //   .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (
      <Box className="reviewBoxContainer" boxShadow={3} borderRadius={4} >
            <Avatar style={{backgroundColor: this.props.avatarColor, color: this.props.avatarFontColor}} className="avatar">{this.props.initials}</Avatar>
            <Rating
              className="rating"
              name="customized-icons"
              defaultValue={this.props.rating}
              // getLabelText={(value) => customIcons[value].label}
              IconContainerComponent={IconContainer}
              readOnly 
            />
            <p><span className="reviewComponentTitle">{this.props.title}</span><span className="reviewComponentParagraph"> review of </span><span className="reviewComponentTitle">{this.props.drugName}</span></p>
            <p>{this.props.review}</p>
      </Box>
    );
  }
}

export default Review;
