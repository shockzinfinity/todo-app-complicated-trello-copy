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
export default {
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  computed: {
    invalidForm() {
      return !this.username || !this.password;
    }
  },
  methods: {
    onSubmit() {
      console.log(this.username, this.password);
    }
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