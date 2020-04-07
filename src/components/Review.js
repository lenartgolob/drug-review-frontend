import React from "react";
import NavMenu from "./NavMenu";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';


const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon fontSize="large" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon fontSize="large" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon fontSize="large" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon fontSize="large" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon fontSize="large" />,
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
      drugs: [],
      drug: null
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
            console.log(uniqueDrugs);
        });
}

  render() {
    return (
    <div className="container">
      <NavMenu />
      <div className="reviewContainer">
        <p className="reviewTitle">Your first-hand experiences really helps other patients. Thanks!</p>
        <hr className="underlineReview" />
        <form noValidate autoComplete="off">
          <Autocomplete
            onChange={(event, value) => console.log(value)}
            id="combo-box-demo"
            options={this.state.drugs}
            getOptionLabel={(option) => option}
            className="reviewAutocomplete"
            renderInput={(params) => <TextField {...params} label="Search for drugs" variant="outlined" />}
          />
          <Box className="reviewBox" component="fieldset" mb={3} borderColor="transparent">
            <p>Your overall rating of this drug</p>
            <Rating
              size="large"
              name="customized-icons"
              defaultValue={null}
              getLabelText={(value) => customIcons[value].label}
              IconContainerComponent={IconContainer}
            />
          </Box>
          <TextField className="reviewFormItem" id="outlined-basic" label="Title of your review" variant="outlined" />
          <TextField
            className="reviewFormItem"
            id="outlined-multiline-static"
            label="Your review"
            placeholder="Tell people about your expirience with this drug."
            multiline
            rows="4"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            className="reviewSubmit"
          >
            Submit your review
          </Button>
        </form>
      </div>
    </div>
    );
  }
}

export default Review;