import React from "react";
import "../App.scss";
import NavMenu from "./NavMenu";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './components.scss';


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drugs: [],
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
        <Autocomplete
          className="autocomplete"
          id="combo-box-demo"
          options={this.state.drugs}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search for drugs" variant="outlined" />}
        />
    </div>
    );
  }
}

export default SearchPage;