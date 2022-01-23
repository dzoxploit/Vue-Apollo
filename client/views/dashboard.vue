<template>
  <div :class="$style.dashboard">
    <login
      :handleLoginFormIsOpen="handleLoginFormIsOpen"
      :loginFormIsOpen="loginFormIsOpen"
      :handleRegisterFormIsOpen="handleRegisterFormIsOpen"
    >
    </login>
    <register
      :handleRegisterFormIsOpen="handleRegisterFormIsOpen"
      :registerFormIsOpen="registerFormIsOpen"
    >
    </register>
    <create-news
      :createNewsIsOpen="createNewsIsOpen"
      :handleCreateNewsIsOpen="handleCreateNewsIsOpen"
      :handleGetAllNews="handleGetAllNews"
    >
    </create-news>
    <logout
      :logoutIsOpen="logoutIsOpen"
      :handleLogoutIsOpen="handleLogoutIsOpen"
    >
    </logout>
    <div :class="$style.plus" v-if="isLoggedIn() && employee().division === 'hr'">
      <div :class="$style['plus-wrap']">
        <button
          type="button"
          :class="[$style.btn, createNewsIsOpen && $style.active]"
          class="bx bx-plus"
          @click="handleCreateNewsIsOpen"
        >
        </button>
      </div>
    </div>
    <div :class="$style['dashboard-wrap']">
      <navbar
        :handleLoginFormIsOpen="handleLoginFormIsOpen"
        :handleLogoutIsOpen="handleLogoutIsOpen"
      >
      </navbar>
      <news :news="news"></news>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

import navbar from '../components/navbar.vue';
import createNews from '../components/dashboard/createNews.vue';
import news from '../components/dashboard/news.vue';
import login from '../components/login.vue';
import register from '../components/register.vue';
import logout from '../components/logout.vue';

export default {
  name: 'dashboard-page',
  components: {
    navbar,
    login,
    register,
    createNews,
    news,
    logout,
  },
  data: () => ({
    loginFormIsOpen: false,
    registerFormIsOpen: false,
    logoutIsOpen: false,
    createNewsIsOpen: false,
    news: [],
  }),
  methods: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    employee() {
      return this.$store.getters.getEmployee;
    },
    handleLoginFormIsOpen() { this.loginFormIsOpen = !this.loginFormIsOpen },
    handleRegisterFormIsOpen() {
      this.loginFormIsOpen = !this.loginFormIsOpen;
      this.registerFormIsOpen = !this.registerFormIsOpen;
    },
    handleCreateNewsIsOpen() { this.createNewsIsOpen = !this.createNewsIsOpen },
    async handleGetAllNews() {
      try {
        const request = await this.$apollo.query({
          query: gql`{
            NewsFindAll {
              id author subject shortDesc createdAt                
            }
          }`,
        });

        this.news = request.data.NewsFindAll;
      }
      catch (error0) {
        console.error(error0.message);
      }
    },
    handleLogoutIsOpen() { this.logoutIsOpen = !this.logoutIsOpen },
  },
  mounted() {
    this.handleGetAllNews();
  },
}
</script>

<style module>
.dashboard {
  position: absolute;
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
}
.dashboard-wrap {
  width: 900px;
  padding: 20px;
}
.plus {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 8;
  transform: translateY(100px);
}
.plus-wrap {
  width: 900px;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}
.plus .btn {
  width: 70px; height: 70px;
  border-radius: 50%;
  transform: translateY(-100px);
  margin: 0 0 40px 0;
  background: #bac4ff;
  box-shadow: 0 2px 10px #22283120, 0 0 80px #22283140;
  font-size: 1.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: cubic-bezier(0.18,0.89,0.32,1.27) 0.3s;
  transition-delay: 0.3s;
}
.plus .btn.active {
  width: 0; height: 0;
  transition: cubic-bezier(0.6,-0.28,0.74,0.05) 0.3s;
  transition-delay: 0s;
}
</style>
