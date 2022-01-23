<template>
  <router-view></router-view>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'App',
  data: () => ({
    ok: false,
  }),
  methods: {
    handleIsLoggedIn() {
      const token = localStorage.getItem('token');
      this.$store.dispatch('counter/isLoggedIn', !!token);

      if (token) {
        this.handleGetEmployee();
      }
    },
    async handleGetEmployee() {
      try {
        const token = localStorage.getItem('token');

        const request = await this.$apollo.query({
          query: gql`
            query ($token: String!) {
              EmployeeFindOne (token: $token) {
                id
                fullname
                division
                email
                createdAt
                updatedAt
              }
            }
          `,
          variables: { token },
        });

        this.$store.dispatch('counter/setEmployeeData', request.data.EmployeeFindOne);
      }
      catch (error0) {
        console.error(error0.message);
      }
    },
  },
  mounted() {
    this.handleIsLoggedIn();
  },
  updated() {
    this.handleIsLoggedIn();
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap');

:root {
  --font-body: 'Inter', sans-serif;
  --font-head: 'Noto Serif', serif;
}

* {
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
}

input,
textarea,
button,
p {
  font-size: 1rem;
  font-family: var(--font-body);
  background: transparent;
}

input:-webkit-autofill {
  transition: "color 9999s ease-out, background-color 9999s ease-out";
  transition-delay: 9999s;
}

textarea {
  resize: none;
}

h1, h2, h3 {
  font-family: var(--font-body);
  line-height: 1.8rem;
}
</style>
