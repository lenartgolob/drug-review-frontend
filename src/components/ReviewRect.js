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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './components.scss';

const MySwal = withReactContent(Swal)


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


class ReviewRect extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
    };
  }

  handleDelete() {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        fetch('http://localhost:5000/review/delete',{
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.props.id,
          })
        })
        .then(res => res.json())
        .then(msg => (msg) ?         
        Swal.fire(
          'Deleted!',
          'Your review has been deleted.',
          'success'
        ).then(() => window.location.reload())
        :
        Swal.fire(
          'Something went wrong!',
          'Your review hasn\'t been deleted.',
          'error'
        ))
      }
    })
  }

  render() {
    return (
      <Box className="reviewRectBoxContainer" boxShadow={3} borderRadius={4} >
        <div>
            <Avatar style={{backgroundColor: this.props.avatarColor, color: this.props.avatarFontColor, width: "45px", height: "45px"}} className="avatarRect">{this.props.initials}</Avatar>
            <p className="reviewAuthor">{this.props.user}</p>
            {
              (localStorage.getItem("admin")) ? 
              <div className="iconContainer">
                <IconButton href={"../edit/review?id=" + this.props.id} className="reviewRectIconButton" aria-label="edit">
                    <EditIcon style={{ fontSize: 30 }} className="reviewRectIcon" />
                </IconButton>
                <IconButton onClick={this.handleDelete}  className="reviewRectIconButton" aria-label="delete">
                    <DeleteIcon style={{ fontSize: 30 }} className="reviewRectIcon" />
                </IconButton>
              </div>
            : 
            <div className="iconContainer" style={(this.props.user_id === parseInt(localStorage.getItem("id"))) ? null : {display: "none"}}>
              <IconButton href={"../edit/review?id=" + this.props.id} className="reviewRectIconButton" aria-label="edit">
                  <EditIcon style={{ fontSize: 30 }} className="reviewRectIcon" />
              </IconButton>
              <IconButton onClick={this.handleDelete}  className="reviewRectIconButton" aria-label="delete">
                  <DeleteIcon style={{ fontSize: 30 }} className="reviewRectIcon" />
              </IconButton>
            </div>
            }
        </div>
            <hr className="rectUnderline" />
            <Rating
              className="ratingRect"
              name="customized-icons"
              defaultValue={this.props.rating}
              IconContainerComponent={IconContainer}
              readOnly 
            />
            <p className="reviewRectTitle"><span className="reviewRectComponentTitle">{this.props.title}</span><span className="reviewRectComponentParagraph"> review of </span><span className="reviewRectComponentTitleName">{this.props.drugName}</span></p>
            <p className="reviewRectParagraph">{this.props.review}</p>
      </Box>
    );
  }
}

export default ReviewRect;