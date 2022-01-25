<template>
  <div :class="[$style.logout, logoutIsOpen && $style.active]">
    <div :class="[$style['logout-wrap'], logoutIsOpen && $style.active]">
      <h3 :class="$style.text">Are you sure you want to log out of this account?</h3>
      <span :class="$style.action">
        <button type="button" :class="$style.btn" @click="handleLogout">Yes, I'm sure</button>
        <button type="button" :class="$style.btn" @click="handleLogoutIsOpen">Cancel</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logout-confirm',
  props: {
    handleLogoutIsOpen: Function,
    logoutIsOpen: Boolean,
  },
  methods: {
    handleLogout() {
      this.handleLogoutIsOpen();

      setTimeout(() => {
        this.$store.dispatch('counter/isLoggedIn', false);
        this.$store.dispatch('counter/setEmployeeData', null);

        localStorage.removeItem('token');
      }, 500);
    },
  },
}
</script>

<style module>
.logout {
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
.logout.active {
  z-index: 9;
  opacity: 1;
  transition-delay: 0s;
}
.logout-wrap {
  width: 0px; height: 0;
  background: #ffffff;
  box-shadow: 0 0 50px #22283140;
  overflow: hidden;
  margin: 20px;
  transition: cubic-bezier(0.6,-0.28,0.74,0.05) 0.3s;
  transition-delay: 0s;
  display: grid;
  grid-template-rows: auto 1fr;
}
.logout-wrap.active {
  padding: 20px;
  width: 400px; height: 150px;
  transition: cubic-bezier(0.18,0.89,0.32,1.27) 0.3s;
  transition-delay: 0.3s;
}
.action {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;
  gap: 10px;
  margin: 20px 0 0 0;
}
.action .btn {
  background: #baffd9;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid #608370;
  font-size: 0.95rem;
  cursor: pointer;
}
.action .btn:nth-child(2) {
  border: 1px solid #926a74;
  background: #ffbacb;
}
</style>
