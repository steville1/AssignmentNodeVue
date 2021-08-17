<template>
    <div class="inner-block">
       <form @submit.prevent="handleSubmit">
            <h3>Sign In</h3>
	<div class="form-group">
		<label>Email</label>
		<input :disabled="loading" name="email" type="email"  class="form-control form-control-lg" 
                   placeholder="Email address"
                   required
                   autofocus>
		
	</div>
	<div class="form-group">
		<label>Password</label>
		<input :disabled="loading" minlength="6" name="password" type="password" id="inputPassword"
                   class="form-control form-control-lg" placeholder="Password"
                   required>
            <p>{{error}}</p>
	</div>
    <div class="form-group" style="margin-top:10px">
	<button  :disabled="loading"  class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
    </div>


</form>
</div>
</template>
<script>
    import toastr from 'toastr';

    export default {
        name: "Login",

        data() {
            return {
                error: "",
                loading: false,
            }
        },
        methods: {
            handleSubmit(event) {
                event.preventDefault();
                this.loading = true;
                const postData = {
                    email: event.target.email.value,
                    password: event.target.password.value,
                }
                this.axios.post('signin', postData).then((response) => {
                    toastr.success("Login successful")
                    this.loading = false;
                    localStorage.setItem("token", "bearer "+response.data.token);
                    this.axios.defaults.headers['Authorization'] = "bearer "+response.data.token;
                    console.log("bearer "+response.data.token);
                    this.$router.push('/')
                }).catch(err => {
                    this.loading = false;
                    if (err.response.status === 400) {
                        this.error = err.response.data
                    }
                })
            }
        }
    }
</script>
<style>
.inner-block {
    width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }
</style>
