var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  YELP : {
  	id : '"'+process.env.FREECODECAMPYELPCLIENTID+'"',
  	secret: '"'+process.env.FREECODECAMPYELPCLIENTSECRET+'"',
  	tempbearertoken: '"'+process.env.FREECODECAMPYELPBEARER+'"'
  },
  TWITTER : {
  	id : '"'+process.env.FREECODECAMPTWITTERKEYNIGHTOUT+'"',
  	secret: '"'+process.env.FREECODECAMPTWITTERSECRETNIGHTOUT+'"'
  }
})
