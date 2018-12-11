import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Pusher from 'pusher-js';

// This is your Pusher App Key. You will need to update this with your own.
const PUSHER_ID = '52f9e2610463b44f0e09';

class Carriers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }

  updateStateData() {
    axios
      .get('/carriers')
      .then(res => {
        const carriers = res.data;
        const labels = [];
        const datasetLabel = this.props.label;
        const datasetData = [];

        carriers.forEach(carrierDetail => {
          carrierDetail.carrier === null
            ? labels.push('Unknown')
            : labels.push(carrierDetail.carrier);
          datasetData.push(carrierDetail.count);
        });

        const chartData = {
          labels,
          datasets: [
            {
              label: datasetLabel,
              data: datasetData
            }
          ]
        };

        this.setState({ chartData });
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
      <Bar
        data={this.state.chartData}
        width={10}
        height={5}
        options={{
          title: { display: true, text: this.props.title, fontSize: 25 },
          animation: {
            duration: 1000,
            easing: 'linear'
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          maintainAspectRatio: true
        }}
      />
    );
  }
}

export default Carriers;
