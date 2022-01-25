<template>
  <div :class="[$style.register, registerFormIsOpen && $style.active]">
    <div :class="[$style['register-wrap'], registerFormIsOpen && $style.active]">
      <div :class="$style.header">
        <h2 :class="$style.title">Sign Up</h2>
        <button
          type="button"
          :class="$style.btn"
          class="bx bx-x"
          @click="handleRegisterFormIsOpen"
        >
        </button>
      </div>
      <p :class="$style.response">{{ response.message }}</p>
      <form method="post" :class="$style.form" @submit.prevent="handleSubmit">
        <label for="fullname" :class="$style.fields">
          <i class="bx bx-user" :class="$style.icon"></i>
          <input
            type="fullname"
            name="fullname"
            id="fullname"
            placeholder="Full Name"
            v-model="form.fullname"
          >
        </label>
        <label for="division" :class="$style.fields">
          <i class="bx bx-rocket" :class="$style.icon"></i>
          <select name="division" id="division" v-model="form.division">
            <option value="hr">Human Resources</option>
            <option value="tech">Technology</option>
            <option value="marketing">Marketing</option>
            <option value="production">Production</option>
          </select>
        </label>
        <label for="email" :class="$style.fields">
          <i class="bx bx-envelope" :class="$style.icon"></i>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            v-model="form.email"
          >
        </label>
        <label for="password" :class="$style.fields">
          <i class="bx bx-lock-alt" :class="$style.icon"></i>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            v-model="form.password"
          >
        </label>
        <span :class="$style.action">
          <button type="submit" :class="$style['submit-btn']">Sign Up</button>
          <button
            type="button"
            :class="$style.btn"
            @click="handleRegisterFormIsOpen"
          >
            Sign In
          </button>
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'register-form',
  props: {
    handleRegisterFormIsOpen: Function,
    registerFormIsOpen: Boolean,
  },
  data: () => ({
    response: {
      success: false,
      message: '',
      active: false,
    },
    form: {
      email: '',
      fullname: '',
      division: '',
      password: '',
    },
  }),
  methods: {
    async handleSubmit() {
      try {
        const request = await this.$apollo.mutate({
          mutation: gql`
            mutation ($email: String!, $fullname: String!, $division: String! $password: String!) {
              EmployeeRegister (email: $email, fullname: $fullname, division: $division, password: $password) {
                success
                message
              }
            }
          `,
          variables: {
            email: this.form.email,
            fullname: this.form.fullname,
            division: this.form.division,
            password: this.form.password,
          },
        });

        const { EmployeeRegister: result } = request.data;
        if (!result.success) throw result;

        this.form = {
          email: '',
          fullname: '',
          division: '',
          password: '',
        }

        this.response = {
          success: true,
          message: result.message,
          active: true,
        }

        setTimeout(() => {
          this.handleRegisterFormIsOpen();
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
.register {
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
.register.active {
  z-index: 9;
  opacity: 1;
  transition-delay: 0s;
}
.register-wrap {
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
.register-wrap.active {
  padding: 20px;
  width: 500px;
  height: 320px;
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
  margin: 10px 0;
  font-size: 0.95rem;
}
.form {
  display: grid;
  align-content: flex-end;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
  "fullname email"
  "division division"
  "password password"
  "action action";
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
.fields:nth-child(1) { grid-area: fullname; }
.fields:nth-child(2) { grid-area: division; }
.fields:nth-child(3) { grid-area: email; }
.fields:nth-child(4) { grid-area: password; }

.form .fields input {
  cursor: text;
  width: 100%;
}
.form .submit-btn {
  background: #baffd9;
  padding: 15px 0;
  border-radius: 10px;
}
.form .action {
  grid-area: action;
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
select {
  transform: translate(-5px);
}
select, option {
  font-family: var(--font-body);
  font-size: 1rem;
  cursor: pointer;
}
</style>
