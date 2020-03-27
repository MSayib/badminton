<template>
  <div>
    <b-navbar type="light" variant="light">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item :to="'/auth/dashboard'">Dashboard</b-nav-item>
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item v-if="loggedIn" class="logout-link" @click="logout">Logout</b-dropdown-item>
          <b-dropdown-item :to="'/auth/login'" v-else>Login</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <nuxt />
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // eslint-disable-next-line no-console
          console.log("logged in");
          this.loggedIn = true;
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
              Cookies.set("access-token", token);
            });
        } else {
          this.loggedIn = false;
          Cookies.remove("access-token");
        }
      });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/auth/logout");
        });
    }
  }
};
</script>

<style>

</style>
