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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import queryString from 'query-string';
import './components.scss';

const MySwal = withReactContent(Swal)


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


class ReviewEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.state = {
      drugs: [],
      drug: "@",
      rating: null,
      title: "",
      review: "",
      id: null,
      redirectSuccess: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("id") == null) {
        window.location.replace("/login");
    }
    else {
        var url = this.props.location.search;
        var params = queryString.parse(url);
        var id = params.id;
        this.setState({id: id});

        fetch('http://localhost:5000/edit/review',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: id
            })
          })
          .then(res => res.json())
          .then(review => this.handleResponse(review));

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
      }
  }

  handleResponse(review) {
    this.setState({
        drug: review[0].drug,
        rating: review[0].rating,
        title: review[0].title,
        review: review[0].review,
      })
  }

  handleSubmit() {
    console.log(this.state.drug)
    console.log(this.state.rating)
    console.log(this.state.title)
    console.log(this.state.review)

    if(this.state.drug !== "" && this.state.rating !== null && this.state.title !== "" && this.state.review !== "" && this.state.drug !== null) {
      fetch('http://localhost:5000/review/edit',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.id,
          drug: this.state.drug,
          rating: this.state.rating,
          title: this.state.title,
          review: this.state.review,

        })
      })
      .then(res => res.json())
      .then(msg => this.handleAlert(msg));
    }
    else {
      MySwal.fire({
        icon: 'error',
        title: 'All fields are required!',
      })
    }
  }

  handleAlert(msg) {
    if(msg) {
      MySwal.fire({
        icon: 'success',
        title: 'Your review was updated successfuly!',
      })
    }
    else {
      MySwal.fire({
        icon: 'error',
        title: 'Something went wrong',
      })
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }



  render() {
    return (
    <div className="container">
      <NavMenu />
      <div className="reviewContainer">
        <div style={{margin: "0", textAlign: "center"}}><p className="myReviewTitle">Edit your review - {this.state.drug}</p></div>
        <hr className="underlineReview" />
        <form noValidate autoComplete="off">
            {
                (this.state.drug !== "@") ? <Autocomplete
                                                defaultValue={this.state.drug}
                                                onChange={(event, value) => this.setState({drug: value})}
                                                id="combo-box-demo"
                                                options={this.state.drugs}
                                                getOptionLabel={(option) => option}
                                                className="reviewAutocomplete"
                                                renderInput={(params) => <TextField {...params} label="Search for drugs" variant="outlined" />}
                                            />
                                            : null
            }

          <Box className="reviewBox" component="fieldset" mb={3} borderColor="transparent">
            <p>Your overall rating of this drug</p>
            {
                (this.state.rating>0) ? <Rating
                defaultValue={this.state.rating}
                size="large"
                name="customized-icons"
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
                onChange={(event, newValue) => {
                this.setState({rating: newValue});
                }}
            />
            :
            null
            }
          </Box>
          <TextField className="reviewFormItem" value={this.state.title} name="title" id="outlined-basic" label="Title of your review" variant="outlined" onChange={this.handleChange} />
          <TextField
            value={this.state.review}
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
    </div>
    );
  }
}

export default ReviewEditPage;