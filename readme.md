# Nexmo Number Insight API Dashboard

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/https://glitch.com/edit/#!/nexmo-number-insight-dashboard) [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This project demonstrates how to build a real time dashboard that uses data from the Nexmo Number Insight API to power charts and graphs.

Check out a live version [on Heroku](https://nexmo-realtime-dashboard.herokuapp.com/).

To set up your own version, run the following commands after cloning the repo, clicking the Deploy To Heroku button, or [remix the Glitch version](https://glitch.com/edit/#!/nexmo-number-insight-dashboard):

```bash
$ npm install
$ cp .env.sample > .env # Remember to include your own API keys
$ npm run dev
```

There are a few dependencies on third party services (all of which have free tiers you can sign up for without a credit card). You'll also need accounts with these services:

- [mLab](https://mlab.com)
- [Pusher](https://www.pusher.com/)

All of the credentials, URIs, and other pieces of information to make this app work are located in a `.env` file. Take a look at the `.env.sample` file in this repo to see what you'll need to make a note of.

## Contributing new graphs

Each graph in this application is a React component. They all follow the same pattern so can be easily copied should you wish to create your own.

Any new components can be submitted for inclusion in this project via pull request and would be gratefully received.
