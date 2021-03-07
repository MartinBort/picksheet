<template>
  <div>
    <h1>Sign up</h1>

    <b-field label="Username">
      <b-input v-model="username"></b-input>
    </b-field>

    <b-field label="Email">
      <b-input type="email" v-model="email"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input type="password" password-reveal v-model="password"></b-input>
    </b-field>
    <b-button @click="signUp">Sign up</b-button>
    <div v-if="errors">
      {{ errors }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errors: null,
      returnedUser: null,
    };
  },
  computed: {
    errorsParsed() {
      for (const [key, value] of errors.entries()) {
        console.log(key, value);
      }
    },
  },
  methods: {
    async signUp() {
      try {
        const res = await this.$axios.$post('http://localhost:8000/users', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.returnedUser = res;
      } catch (e) {
        console.log(e.response);
        this.errors = `${e.response.data}`;
      }
    },
  },
};
</script>
