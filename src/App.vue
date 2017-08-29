<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>
                        <router-link to="/">
                            Night out Coordinator
                        </router-link>
                    </h1>
                    <div class="row">
                        <div class="col">
                            <form class="animated bounce">
                              <div class="form-group">
                                <label for="placelooking">Where are you from?</label>
                                <input type="text" class="form-control" id="placelooking" placeholder="San Francisco, California" v-on:keydown="lookForCity" v-model="cityinput">
                                <small id="smallhelp" class="form-text text-muted">Look for good places to eat something or places to go.</small>
                              </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <hr>
                            <div v-if="weHaveResultsCities && selectedCity === 'none'" id="citiesresults">
                                <ul class="list-group">
                                    <li v-for="city in cities" class="list-group-item" v-on:click="lookFor(city.matching_full_name)">{{ city.matching_full_name }}</li>
                                </ul>
                            </div>
                            <div v-if="resultsForUser.length > 0 && cityinput.length === 0"class="jumbotron">
                                <h3 style="color:#6441A5;">{{ holderCityPrev }}</h3>
                                <ul class="list-group">
                                    <li v-for="(place,index) in resultsForUser" class="list-group-item">
                                        {{ place.name }}
                                        <br>
                                        <button class="btn btn-success btn-sm" v-on:click="joinPlace(index)" v-if="!isPlaceActive(index)">I'm Going</button>
                                        <div v-if="isPlaceActive(index)"> You are going here!</div>
                                    </li>
                                </ul>
                            </div>
                            <router-view></router-view>
                        </div>      
                    </div>
                </div>
            </div>
            <footer class="row">
                <div class="col" align="center">
                        <router-link to="/about" v-if="onhome">About the project.</router-link>
                         <router-link to="/" v-else>Go to Search Results</router-link>
                        <br>
                    MIT - Coded with love for Freecodecamp by Wilson Muñoz
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default{

        name:'App',
        data () {
            return {
                onhome              : true,
                cities              : [],
                userAuth            : false,
                weHaveResultsCities : false,
                selectedCity        : undefined,
                accessToken         : process.env.YELP.tempbearertoken,
                yelpid              : process.env.YELP.id,
                yelpsecret          : process.env.YELP.secret,                
                cityinput           : '',
                currentuserid       : undefined,
                holderCityPrev      : '',
                resultsForUser      : []
            }
        },
        watch: {
            resultsForUser: function (item) {
                console.log(item);
            }
        },
        created(){
            
            console.log(this.$route.query);
            this.selectedCity   = 'none';

            //Fetch information from callback
            //http://localhost:3000/ / On dev add call to express own server.
            fetch('api/users/session', {'method': 'GET'})
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if(json.userid !== undefined){

                    //Set information, we have a callback session
                    this.currentuserid          = json.userid;
                    this.holderCityPrev         = json.locationuser;
                    this.weHaveResultsCities    = true;
                    this.resultsForUser         = json.placesuser;
                }
            })
        },
        methods: {  
            joinPlace : function(indexplace){

                //Update place, user is going.
                this.resultsForUser[indexplace]['usergoing'] = true;
                console.log(indexplace, this.resultsForUser[indexplace]);

                // If we do not have current user id it means we are gonna log the user
                // with Twitter, save current results and the places for return.
                if(this.currentuserid === undefined){

                    axios.post('api/users/savesession', {
                        'location'      : this.holderCityPrev, 
                        'places'        : this.resultsForUser
                    })
                    .then(response => {

                        //Once saved to session we redirect him/ser
                        location.href = 'api/auth/twitter';
                    });

                } 

            },
            isPlaceActive: function(index){

                var status = this.resultsForUser[index];
                if(status.usergoing === true){
                    return true;
                } else {
                    return false;
                }
            },
            lookForCity : function(e){
                var cityState = e.target.value;
                if(cityState !== undefined && cityState !== ""){
                    var urlTeleport = 'https://api.teleport.org/api/cities/?search='+ cityState;
                    //console.log(this.selectedCity);
                    fetch(urlTeleport, {'method': 'GET'})
                    .then(response => response.json())
                    .then(json => {
                        this.cities = [];
                        if(json.count > 0){
                            this.cities = json._embedded['city:search-results'];
                            this.reloadresults()
                        }
                    })
                }
            },
            reloadresults: function(){
                if(this.cities !== undefined){
                    if(this.cities.length > 0){
                        this.weHaveResultsCities = true;
                    }
                }
            },
            lookFor: function(city){

                //Set selected City 
                this.selectedCity = city;
                this.holderCityPrev = city;

                console.log("User selected a city: ", this.selectedCity);

                //Run Fetch and present results.
                if(this.selectedCity !== undefined){

                    var 

                    console.log("Requesting: ", this.accessToken ? undefined : 'token Bearer defined', this.selectedCity);
                    
                    //Search for it
                    axios.post('http://localhost:3000/api/yelp/search', 
                        {
                            location: this.selectedCity,
                            limit   : 10
                        }, 
                        {        
                            headers: 
                            {
                                'Authorization': 'Bearer ' + this.accessToken
                            }
                    })
                    .then(response => {

                        //Real Response

                        //Dev Response
                        this.resultsForUser = [];

                        for(var i =0; i< 10;i++){
                            response.data[i]['usergoing'] = false;

                            //Yelp
                            this.resultsForUser.push(response.businesses[i]);

                            //Dev
                            //this.resultsForUser.push(response.data[i]);
                            //Use title instead of name on the front.
                        }
                        console.log(this.resultsForUser);

                        //Reset for reuse
                        this.cityinput = '';
                        this.weHaveResultsCities = false;
                        this.cities = [];
                        this.selectedCity = 'none'

                        
                    })
                    .catch(function (error) {
                        console.log("Got error: ", error);
                    });
                }
                
            }
        }
    }
</script>