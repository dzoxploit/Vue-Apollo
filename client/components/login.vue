<template>
  <div :class="[$style.login, loginFormIsOpen && $style.active]">
    <div :class="[$style['login-wrap'], loginFormIsOpen && $style.active]">
      <div :class="$style.header">
        <h2 :class="$style.title">Sign In</h2>
        <button
          type="button"
          :class="$style.btn"
          class="bx bx-x"
          @click="handleLoginFormIsOpen"
        >
        </button>
      </div>
      <p :class="$style.response">{{ response.message }}</p>
      <form method="post" :class="$style.form" @submit.prevent="handleSubmit">
        <label for="login-email" :class="$style.fields">
          <i class="bx bx-envelope" :class="$style.icon"></i>
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder="Email Address"
            v-model="form.email"
          >
        </label>
        <label for="login-password" :class="$style.fields">
          <i class="bx bx-lock-alt" :class="$style.icon"></i>
          <input
            type="password"
            name="password"
            id="login-password"
            placeholder="Password"
            v-model="form.password"
          >
        </label>
        <span :class="$style.action">
          <button type="submit" :class="$style['submit-btn']">Sign In</button>
          <button
            type="button"
            :class="$style.btn"
            @click="handleRegisterFormIsOpen"
          >
            Sign Up
          </button>
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'login-form',
  props: {
    handleLoginFormIsOpen: Function,
    loginFormIsOpen: Boolean,
    handleRegisterFormIsOpen: Function,
  },
  data: () => ({
    response: {
      success: false,
      message: '',
      active: false,
    },
    form: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async handleGetEmployee(token) {
      try {
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
    async handleSubmit() {
      try {
        const request = await this.$apollo.query({
          query: gql`
            query ($email: String!, $password: String!) {
              EmployeeLogin (email: $email, password: $password) {
                success
                message
                token
              }
            }
          `,
          variables: {
            email: this.form.email,
            password: this.form.password,
          },
        });

        const { EmployeeLogin: result } = request.data;
        if (!result.success) throw result;

        this.form = {
          email: '',
          password: '',
        }

        this.response = {
          success: true,
          message: result.message,
          active: true,
        }

        localStorage.setItem('token', result.token);

        this.$store.dispatch('counter/isLoggedIn', true);
        this.handleGetEmployee(result.token);

        setTimeout(() => {
          this.handleLoginFormIsOpen();
        }, 2000);
      }
      catch (error0) {
        this.response = {
          success: false,
          message: error0.message,
          active: true,
        }

        this.form = {
          email: '',
          fullname: '',
          division: '',
          password: '',
        }
      }
    },
  },
}
</script>

<style module>
.login {
  position: fixed;
  width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #22283180;
  z-index: -9;
  opacity: 0;
  transition-delay: 0.5s;
}
.login.active {
  z-index: 9;
  opacity: 1;
  transition-delay: 0s;
}
.login-wrap {
  width: 0px; height: 0;
  background: #ffffff;
  box-shadow: 0 0 50px #22283140;
  overflow: hidden;
  margin: 20px;
  transition: cubic-bezier(0.6,-0.28,0.74,0.05) 0.3s;
  transition-delay: 0s;
  display: grid;
  grid-template-rows: auto auto 1fr;
}
.login-wrap.active {
  padding: 20px;
  width: 500px;
  height: 300px;
  transition: cubic-bezier(0.18,0.89,0.32,1.27) 0.3s;
  transition-delay: 0.3s;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .btn {
  font-size: 1.5rem;
}
.response {
  margin: 10px 0 0 0;
  font-size: 0.95rem;
}
.form {
  margin: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.form .icon {
  font-size: 1.5rem;
}
.form .fields {
  border-bottom: 1px solid #707070;
  padding: 15px 0;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 15px;
  cursor: text;
}
.form .fields input {
  cursor: text;
}
.form .submit-btn {
  background: #baffd9;
  padding: 15px 0;
  border-radius: 10px;
}
.form .action {
  margin: 20px 0 0 0;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
}
.form .action .btn {
  padding: 15px;
  background: #bac4ff;
  border-radius: 10px;
}
</style>
