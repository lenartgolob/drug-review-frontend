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
import SweetAlert from 'sweetalert2-react';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import { Redirect } from 'react-router';



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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      drugs: [],
      drug: "",
      rating: null,
      title: "",
      review: "",
      showError: false,
      msg: '',
      redirect: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("id") == null) {
      this.setState({ redirect: true })
    }
    else {
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
  }

  handleSubmit() {
    console.log(this.state.drug)
    console.log(this.state.rating)
    console.log(this.state.title)
    console.log(this.state.review)

    if(this.state.drug !== "" && this.state.rating !== null && this.state.title !== "" && this.state.review !== "") {
      fetch('http://localhost:5000/review/new',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user_id: localStorage.getItem("id"),
          drug: this.state.drug,
          rating: this.state.rating,
          title: this.state.title,
          review: this.state.review,

        })
      })
      .then(res => res.json())
      .then(msg => this.setState({msg}));
    }
    else {
      this.setState({showError: true});
    }


  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }



  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/login'/>;
    }
    return (
    <div className="container">
      <NavMenu />
      <div className="reviewContainer">
        <p className="reviewTitle">Your first-hand experiences really helps other patients. Thanks!</p>
        <hr className="underlineReview" />
        <form noValidate autoComplete="off">
          <Autocomplete
            onChange={(event, value) => this.setState({drug: value})}
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
              onChange={(event, newValue) => {
                this.setState({rating: newValue});
              }}
            />
          </Box>
          <TextField className="reviewFormItem" name="title" id="outlined-basic" label="Title of your review" variant="outlined" onChange={this.handleChange} />
          <TextField
            className="reviewFormItem"
            id="outlined-multiline-static"
            label="Your review"
            name="review"
            onChange={this.handleChange}
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
            onClick={this.handleSubmit}
          >
            Submit your review
          </Button>
        </form>
      </div>
        <SweetAlert
          type="error"
          show={this.state.showError}
          title="All the fields are required!"
          onConfirm={() => this.setState({ showError: false })}
          onEscapeKey={() => this.setState({ showError: false })}
          onOutsideClick={() => this.setState({ showError: false })}
        />
    </div>
    );
  }
}

export default Review;