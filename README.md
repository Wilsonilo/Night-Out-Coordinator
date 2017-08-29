# Night Out Coordinator

> Night Out Coordinator Webapp Challenge for Freecodecamp

## About
Really simple app, combines Yelp Fusion (for the places), Teleport (for request autocomplete on cities, https://developers.teleport.org ) Passport for the Auth and Vue (express and other dependencies can be checked on package.json).

## Demo
https://nightoutcoordinator.herokuapp.com

## CORS on Yelp Fusion.
Tricky situation on Yelp, check more info on this issues / article.md
https://github.com/Yelp/yelp-fusion/issues/64
https://github.com/builderLabs/Yelp-Fusion-JavaScript/blob/master/yelpFusionJS.md

For now i had to hack it, to be honest because implementing a full mongodb for the user and refresher of the token on express felt like an overkill.
But you need to keep in mind that as right now Yelp Fusion do not support CORS so you need a Bearer Token to make the requests, this lasts 180 days so i just made one and save it as a ENV VAR.

## ENV VARS.

- FREECODECAMPTWITTERKEYNIGHTOUT
- FREECODECAMPTWITTERSECRETNIGHTOUT
- FREECODECAMPYELPCLIENTID
- FREECODECAMPYELPCLIENTSECRET
- FREECODECAMPYELPBEARER (Token to make request to Yelp: https://www.yelp.com/developers/documentation/v3/get_started
- APIKEYSEARCHGOOGLE (Salt for Passport)