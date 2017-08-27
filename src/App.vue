<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>Night out Coordinator</h1>
                    <div class="row">
                        <div class="col">
                            <form class="animated bounce">
                              <div class="form-group">
                                <label for="placelooking">Where are you from?</label>
                                <input type="text" class="form-control" id="placelooking" placeholder="San Francisco, California">
                                <small id="smallhelp" class="form-text text-muted">Look for good places / events near you area and meet with your friends.</small>
                              </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <hr>
                            <router-view></router-view>
                        </div>  
                    </div>
                </div>
            </div>
            <footer class="row">
                <div class="col" align="center">
                        <router-link to="/about">About the project</router-link>.<br>
                    MIT - Coded with love for Freecodecamp by Wilson Muñoz
                </div>
            </footer>
        </div>
    </div>
</template>


