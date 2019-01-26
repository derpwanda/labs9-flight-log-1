import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
// import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
// import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
// import Card from "@material-ui/core/Card";
// import Grid from "@material-ui/core/Grid";
import axios from "axios";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  card: {
    height: "290px",
    maxWidth: 345
    // marginBottom: 20,
    // minWidth: 200,
  }
});

class AirplaneEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      tailNumber: "",
      make: "",
      model: "",
      category: ""
    };
  }

  editFormHandler = e => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ ...this.props.airplane, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(files) {
    this.setState({
      files: files
    });
  }

  submitEditForm = () => {
    console.log("fired", this.state);
    const UID = localStorage.getItem("userID");
    console.log("uid", UID);
    const updatedAirplane = {
      make: this.state.make,
      model: this.state.model,
      tailNumber: this.state.tailNumber,
      category: this.state.category
    };
    axios
      .put(
        `https://labs9-flight-log.herokuapp.com/airplanes/${this.state.id}`,
        updatedAirplane
      )
      .then(response => {
        console.log(response);
        this.setState({
          open: false,
          files: [],
          id: 0,
          tailNumber: "",
          make: "",
          model: "",
          category: ""
        });
        console.log("this.props", this.props);
        this.props.switcher();
      })
      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          aria-label="Add"
          onClick={this.handleClickOpen}
        >
          Edit
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Airplane</DialogTitle>

          <DialogContent>
            <TextField
              type="string"
              name="tailNumber"
              label="TailNumber"
              value={this.state.tailNumber}
              onChange={this.editFormHandler}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              type="string"
              name="make"
              label="Make"
              value={this.state.make}
              onChange={this.editFormHandler}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              type="string"
              name="model"
              label="Model"
              value={this.state.model}
              onChange={this.editFormHandler}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              type="string"
              name="category"
              label="Category"
              value={this.state.category}
              onChange={this.editFormHandler}
              required
              fullWidth
              variant="outlined"
            />
            <DropzoneArea
              onChange={this.handleChange.bind(this)}
              showPreviews={true}
            />
            <DialogActions>
              <Button onClick={this.submitEditForm} color="primary">
                Update
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AirplaneEdit);

// import React, { Component } from "react";
// import axios from "axios";
// import AircraftD from "./AircraftD";

// //aircraft edit component
// class AircraftE extends Component {
//   constructor() {
//     super();
//     this.state = {
//       make: "",
//       model: "",
//       tailNumber: ""
//     };
//   }
//   //edit form handler
//   editFormHandler = e => {
//     console.log(e.target.name, e.target.value);
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };
//   //submit edit form
//   submitEditForm = () => {
//     console.log("edited");
//     //axios call to put
//   };
//   //submit delete
//   submitDelete = () => {
//     console.log("deleted");
//     //axios call to delete
//   };
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.submitEditForm}>
//           <div>Input make: </div>
//           <input
//             type="text"
//             name="make"
//             placeholder="aircraft make"
//             value={this.state.make}
//             onChange={this.editFormHandler}
//             required
//           />
//           <div>Input model: </div>
//           <input
//             type="text"
//             name="model"
//             placeholder="aircraft model"
//             value={this.state.model}
//             onChange={this.editFormHandler}
//             required
//           />
//           <div>Input tail number: </div>
//           <input
//             type="text"
//             name="tailNumber"
//             placeholder="aircraft tail number"
//             value={this.state.tailNumber}
//             onChange={this.editFormHandler}
//             required
//           />
//           <div>
//             <button>Edit Aircraft</button>
//           </div>
//         </form>
//         <div>{/* <AircraftD submitDelete = {this.submitDelete}/> */}</div>
//       </div>
//     );
//   }
// }

// export default AircraftE;

/* <Grid item lg={2} xs={10} sm={6} md={4}>
          <Card className={classes.card}>
            <Typography variant="h6" color="inherit" noWrap>
              Add Aircraft
            </Typography>
            <Fab
              color="primary"
              aria-label="Add"
              onClick={this.handleClickOpen}
            >
              <AddIcon />
            </Fab>
          </Card>
        </Grid> */
// <InputLabel htmlFor="aircraft-native-simple">Aircraft</InputLabel>
// <Select
//   native
//   value={this.state.aircraft}
//   onChange={this.handleChange("aircraft")}
//   inputProps={{
//     name: "aircraft",
//     id: "aircraft-native-simple"
//   }}
// >
//   <option value="N" />
// </Select>
