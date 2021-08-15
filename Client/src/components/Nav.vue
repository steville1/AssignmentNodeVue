<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
			<div class="container">
				<router-link to="/Home" class="navbar-brand">Home</router-link>
				<div class="collapse navbar-collapse">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item">
							<router-link to="/Login" class="nav-link">Login</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/Register" class="nav-link">Sign Up</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
</template>
<script>
    export default {
        name:'Nav'
    }
</script>