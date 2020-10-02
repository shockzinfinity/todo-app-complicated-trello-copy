<template lang="pug">
.login
  h2 Log in to Todo App
  form(@submit.prevent="onSubmit")
    div
      label(for="username") Username
      input.form-control(
        type="text",
        name="username",
        v-model="username",
        autofocus,
        placeholder="e.g., shockz"
      )
    div
      label(for="password")
      input.form-control(
        type="password",
        v-model="password",
        placeholder="12341234"
      )
    button.btn(
      :class="{ 'btn-success': !invalidForm }",
      type="submit",
      :disabled="invalidForm"
    ) Log In
  p.error(v-if="error") {{ error }}
</template>

<script>
import { auth, setAuthInHeader } from "../api";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      rPath: ""
    };
  },
  computed: {
    invalidForm() {
      return !this.username || !this.password;
    }
  },
  methods: {
    onSubmit() {
      // console.log(this.username, this.password);
      auth
        .login(this.username, this.password)
        .then(data => {
          // console.log(data);
          localStorage.setItem("token", data.token);
          setAuthInHeader(data.token);
          this.$router.push(this.rPath);
        })
        .catch(err => {
          // console.log(err);
          this.error = err.data.message;
        });
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  }
};
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}

.error {
  color: #f00;
}
</style>