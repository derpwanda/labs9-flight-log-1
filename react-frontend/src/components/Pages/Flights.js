import React, { Component } from "react";
import Layout from "../Header component/Layout";
import axios from "axios";
import FlightForm from "../Module Components/flights/FlightsForm";
import FlightEdit from "../Module Components/flights/FlightEdit";
import FlightDelete from "../Module Components/flights/FlightDelete";
import FlightView from "../Module Components/flights/FlightView";
import SkyVector from "../Module Components/flights/SkyVector";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  card: {
    height: 400
  },
  buttonrow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1
  },
  button: {
    margin: "0 8px"
  },
  media: {
    height: 140
  }
});

class Flights extends Component {
  constructor() {
    super();
    this.state = {
      flightsList: [],
      airplanes: [],
      instructors: []
    };
  }
  componentDidMount() {
    const UID = this.props.UID;
    console.log("from flights", UID);
    //https://labs9-flight-log.herokuapp.com/pilots/access/${UID}/airplanes
    //https://labs9-flight-log.herokuapp.com/pilots/access/${UID}/instructors
    // http://localhost:9000/pilots/access/${UID}/airplanes
    //http://localhost:9000/pilots/access/${UID}/instructors
    axios
      .get(
        `https://labs9-flight-log.herokuapp.com/pilots/access/${UID}/airplanes`
      )
      .then(response => {
        console.log(response.data);
        this.setState({ airplanes: response.data });
      });
    axios
      .get(
        `https://labs9-flight-log.herokuapp.com/pilots/access/${UID}/instructors`
      )
      .then(response => {
        console.log(response.data);
        this.setState({ instructors: response.data });
      });

    axios
      .get(`https://labs9-flight-log.herokuapp.com/flights/${UID}`)
      .then(response => {
        console.table(response.data);
        this.setState({ flightsList: response.data });
      });
  }
  switcher = () => {
    console.log("fired");
    this.componentDidMount();
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Layout>
          <div style={{ marginTop: "16px"}}>
            <Grid
              container
              className={classes.root}
              justify="flex-start"
              alignItems="flex-start"
              direction="row"
              spacing={16}
            >
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FlightForm
                  {...this.props}
                  airplanes={this.state.airplanes}
                  instructors={this.state.instructors}
                  switcher={this.switcher}
                  UID={this.props.UID}
                />
              </Grid>

              {this.state.flightsList.map(flight => (
                <Grid item lg={4} md={6} sm={12}>
                  <Card className={classes.card}>
                    <CardContent>
                      {flight.id}

                      <Typography gutterBottom variant="h5" component="h2">
                        Flight Name: {flight.flightName}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Routes/Airports: {flight.airports}
                      </Typography>
                      <SkyVector id={flight.id} skyVector={flight.skyVector} />
                      <Typography gutterBottom variant="h6" component="h2">
                        Flight Date: {flight.flightDate}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Total time: {flight.total}
                      </Typography>

                      <div className={classes.buttonrow}>
                        <FlightEdit
                          {...this.props}
                          airplanes={this.state.airplanes}
                          instructors={this.state.instructors}
                          switcher={this.switcher}
                          flight={flight}
                        />
                        <FlightDelete id={flight.id} switcher={this.switcher} />
                        <FlightView
                          airplanes={this.state.airplanes}
                          instructors={this.state.instructors}
                          flight={flight}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}

Flights.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Flights);
