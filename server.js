const Koa = require('koa');
const Next = require('next');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const axios = require('axios');
const Pusher = require('pusher');
const db = require('./db/mongodb');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handle = app.getRequestHandler();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {
  API_KEY,
  API_SECRET,
  PUSHER_APP_ID,
  PUSHER_APP_KEY,
  PUSHER_APP_SECRET,
  PUSHER_APP_CLUSTER
} = process.env;

var pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_APP_KEY,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  encrypted: true
});

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(cors());
  server.use(bodyParser());

  const getInsight = async number => {
    const insightRequest = await axios.get(
      `https://api.nexmo.com/ni/advanced/json?api_key=${API_KEY}&api_secret=${API_SECRET}&number=${number}`
    );

    return insightRequest.data;
  };

  const routes = {
    index: async ctx => {
      await app.render(ctx.req, ctx.res, '/index', ctx.query);
      ctx.respond = false;
    },
    star: async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    },
    inbound: async ctx => {
      const number = await ctx.request.body.msisdn;
      const insight = await getInsight(number);
      const result = await db.storeInsight(insight);
      if (typeof result !== 'undefined') {
        pusher.trigger('updates', 'new-insight-added', {
          insightId: `${result}`
        });
        console.log(`Successfully stored insight as ${result}`);
        ctx.status = 200;
      }
    },
    getCountryAggregation: async ctx => {
      const records = await db.aggregateCountries();
      ctx.body = records;
    },
    getCarrierAggregation: async ctx => {
      const records = await db.aggregateCarriers();

      ctx.body = records;
    },
    getPricingAggregation: async ctx => {
      const records = await db.aggregatePricing();

      ctx.body = records;
    }
  };

  router.get('/', routes.index);
  router.get('/_next/*', routes.star);
  router.post('/inbound', routes.inbound);
  router.get('/countries', routes.getCountryAggregation);
  router.get('/carriers', routes.getCarrierAggregation);
  router.get('/cost', routes.getPricingAggregation);

  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
