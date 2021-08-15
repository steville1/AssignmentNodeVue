<template>
<div class="inner-block">
<form @submit.prevent="handleSubmit">
	<h3>Register</h3>
	<div class="form-group">
		<label>FirstName</label>
        <input :disabled="loading" name="firstname" type="text" id="inputName" class="form-control form-control-lg"
                   placeholder=""
                   required
                   autofocus>
		
	</div>
    <div class="form-group">
		<label>LastName</label>
	<input :disabled="loading" name="lastname" type="text" id="inputName" class="form-control form-control-lg"
                   placeholder=""
                   required
                   autofocus>
	</div>
    <div class="form-group">
		<label>Email</label>
		<input :disabled="loading" name="email" type="text" id="inputName" class="form-control form-control-lg"
                   placeholder=""
                   required
                   autofocus>
	</div>
	<div class="form-group">
		<label>Password</label>
		<input :disabled="loading" name="password" type="text" id="inputName" class="form-control form-control-lg"
                   placeholder=""
                   required
                   autofocus>
	</div>
    <div class="form-group">
		<label>Confirm Password</label>
		<input :disabled="loading" name="password_confirm" type="text" id="inputName" class="form-control form-control-lg"
                   placeholder=""
                   required
                   autofocus>
	</div>
     <p>{{error}}</p>
	<button :disabled="loading" class="btn btn-dark btn-lg btn-block" type="submit">Sign Up</button>


</form>
</div>
</template>
<script>
    // import axios from 'axios';
    import toastr from 'toastr';

    export default {
        name: "Register",

        data() {
            return {
                error: "",
                loading: false
            }
        },
        mounted() {
        },
        methods: {
            handleSubmit(event) {
                this.loading = true;
                event.preventDefault();
                const postData = {
                    firstname: event.target.firstname.value,
                    lastname: event.target.lastname.value,
                    email: event.target.email.value,
                    password: event.target.password.value,
                }
                this.axios.post('signup', postData).then(() => {
                    toastr.success("Registration successful");
                    this.loading = false;
                    this.$router.push('/login');
                }).catch(err => {
                    toastr.error("Something went wrong");
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


