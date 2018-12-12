import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demoMode: '',
      number: ''
    };
  }

  checkDemoStatus() {
    axios
      .get('/demo')
      .then(res => {
        const demo = res.data;
        console.log(demo);
        this.setState({ ...demo });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.checkDemoStatus();
  }

  render() {
    if (this.state.demoMode) {
      return <p className="demoMode">Send an SMS to {this.state.number}</p>;
    } else {
      return <Fragment />;
    }
  }
}

export default Demo;
