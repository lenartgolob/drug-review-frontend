import React from "react";
import "../App.scss";
import NavMenu from "./NavMenu";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Review from "./Review";

import './components.scss';


class SearchPage extends React.Component {
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
      <h1 className="welcome">Welcome to drug review!</h1>
      <h4 className="subtitle">Read reviews. Write reviews. Find drugs.</h4>
        <Autocomplete
          onChange={(event, value) => console.log(value)}
          className="autocomplete"
          id="combo-box-demo"
          options={this.state.drugs}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
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
        <div className="reviewRow">
          <Review />
          <Review />
          <Review />
        </div>
    </div>
    );
  }
}

export default SearchPage;