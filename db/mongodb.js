if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {
  MLAB_USERNAME,
  MLAB_PASSWORD,
  MLAB_URI,
  MLAB_COLLECTION_NAME
} = process.env;

const mongoose = require('mongoose');
mongoose
  .connect(
    `mongodb://${MLAB_USERNAME}:${MLAB_PASSWORD}@${MLAB_URI}/${MLAB_COLLECTION_NAME}`,
    { useNewUrlParser: true }
  )
  .then(console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const Insight = mongoose.model('Insight', {
  status: Number,
  status_message: String,
  lookup_outcome: Number,
  lookup_outcome_message: String,
  request_id: String,
  international_format_number: String,
  national_format_number: String,
  country_code: String,
  country_code_iso3: String,
  country_name: String,
  country_prefix: String,
  request_price: String,
  remaining_balance: String,
  current_carrier: {
    network_code: String,
    name: String,
    country: String,
    network_type: String
  },
  original_carrier: {
    network_code: String,
    name: String,
    country: String,
    network_type: String
  },
  valid_number: String,
  reachable: String,
  ported: String,
  roaming: { status: String }
});

const db = {
  storeInsight: async insightObject => {
    const newInsightObject = new Insight(insightObject);
    const result = await newInsightObject.save();
    return result._id;
  },
  aggregateCountries: async () => {
    try {
      const records = await Insight.aggregate([
        {
          $group: {
            _id: '$country_code',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        {
          $project: {
            country_code: '$_id',
            country_name: true,
            count: 1,
            _id: 0
          }
        }
      ]);

      return records;
    } catch (err) {
      return err;
    }
  },
  aggregateCarriers: async () => {
    try {
      const records = await Insight.aggregate([
        {
          $group: {
            _id: '$current_carrier.name',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        {
          $project: {
            carrier: '$_id',
            count: 1,
            _id: 0
          }
        }
      ]);

      return records;
    } catch (err) {
      return err;
    }
  },
  aggregatePricing: async () => {
    try {
      const records = await Insight.find();
      let amount = 0;
      for (let i = 0; i < records.length; i++) {
        const price = parseFloat(records[i].request_price);
        amount += price;
      }
      return { totalAmount: amount };
    } catch (err) {
      return err;
    }
  }
};

module.exports = db;
