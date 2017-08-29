module.exports = {
  NODE_ENV: '"production"',
  YELP : {
  	id : '"'+process.env.FREECODECAMPYELPCLIENTID+'"',
  	secret: '"'+process.env.FREECODECAMPYELPCLIENTSECRET+'"',
  	tempbearertoken: '"'+process.env.FREECODECAMPYELPBEARER+'"'
  },
  TWITTER : {
  	id : '"'+process.env.FREECODECAMPTWITTERKEYNIGHTOUT+'"',
  	secret: '"'+process.env.FREECODECAMPTWITTERSECRETNIGHTOUT+'"'
  }
}
