<template>
  <div v-if="user">
    {{ user }}
  </div>
  <div v-else>
    <h1>User not found</h1>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      user: null,
    };
  },
  async beforeMount() {
    const username = this.$route.params.user;

    try {
      const res = await this.$axios.$get(
        `http://localhost:8000/users/${username}`
      );
      this.user = res[0];
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
