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
                                <input type="text" class="form-control" id="placelooking" placeholder="San Francisco, California" v-on:keydown="lookForCity">
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
// https://api.teleport.org/api/cities/{?search} 
    export default{

        name:'about',
        data () {
            return {
                onhome: true,
                cities : [],
                weHaveResultsCities : false,
                selectedCity: undefined
            }
        },
        created(){
            this.selectedCity = 'none';
            console.log("ID and Key from YELP: ", process.env.FREECODECAMPYELPCLIENTID,  process.env.FREECODECAMPYELPCLIENTSECRET );
        },
        methods: {
            lookForCity : function(e){
                var cityState = e.target.value;
                if(cityState !== undefined && cityState !== ""){
                    var urlTeleport = 'https://api.teleport.org/api/cities/?search='+ cityState;
                    console.log(this.selectedCity);
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
                this.selectedCity = city;

                console.log("User selected a city: ", this.selectedCity);

                //Run Fetch and present results.
                if(this.selectedCity !== undefined){
                    var yelpFunsionUrl = 'https://api.yelp.com/v3/businesses/search'
                    fetch()
                }
                
            }
        }
    }
</script>