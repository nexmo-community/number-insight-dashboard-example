# Nexmo Number Insight API Dashboard

This project demonstrates how to build a real time dashboard that uses data from the Nexmo Number Insight API to power charts and graphs.

To set up your own version, run the following commands after cloning the repo:

```bash
$ npm install
$ cp .env.sample > .env # Remember to include your own API keys
$ npm run dev
```

There are a few dependencies on third party services (all of which have free tiers you can sign up for without a credit card). You'll also need accounts with these services:

- [mLab](https://mlab.com)
- [Pusher](https://www.pusher.com/)

All of the credentials, URIs, and other pieces of information to make this app work are located in a `.env` file. Take a look at the `.env.sample` file in this repo to see what you'll need to make a note of.
