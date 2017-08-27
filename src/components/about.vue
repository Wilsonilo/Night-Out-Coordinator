<template>
	<div class="jumbotron" id="about">
		Night Out Coordinator is a web-app created for the challenge "Build a Nightlife Coordination App" of <a href="http://freecodecamp.org" target="_blank">Freecodecamp.org</a>, check more information here: <a href="https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app" target="_blank">https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app</a>
		or get the full github repo here: <a href="https://github.com/Wilsonilo/Night-Out-Coordinator" target="_blank">https://github.com/Wilsonilo/Night-Out-Coordinator</a>
	</div>
</template>
<script>
	export default{

		name:'about',
		data () {
			return {
				onhome: false
			}
		}
	}
</script>
<style scoped>
	#about.jumbotron{
  		color:#000;
  		font-size: 0.9em;
	}
	#about.jumbotron a {
		font-size: 0.8em;
		color:#C66C34;
	}
</style>