import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import CountUp from 'react-countup';
import axios from 'axios';
import Pusher from 'pusher-js';

// This is your Pusher App Key. You will need to update this with your own.
const PUSHER_ID = '52f9e2610463b44f0e09';

class Cost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: 0.0
    };
  }

  updateStateData() {
    axios
      .get('/cost')
      .then(res => {
        const cost = Math.round(res.data.totalAmount * 100) / 100;
        this.setState({ cost });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.updateStateData();

    const pusher = new Pusher(PUSHER_ID, {
      cluster: 'eu',
      forceTLS: true
    });

    const channel = pusher.subscribe('updates');

    channel.bind('new-insight-added', data => {
      this.updateStateData();
    });
  }

  render() {
    return (
      <Fragment>
        <Row>
          <h2>Insight Cost To Date</h2>
        </Row>
        <Row>
          <CountUp
            className="cost"
            prefix="€"
            end={this.state.cost}
            delay={1}
            decimals={2}
            decimal="."
            redraw={true}
          />
        </Row>
      </Fragment>
    );
  }
}

export default Cost;
