<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="'/auth/dashboard'">Dashboard</b-nav-item>
          <b-nav-item :to="'/absensi'">Absensi</b-nav-item>
          <b-nav-item :to="'/start/history'">History</b-nav-item>

          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item v-if="loggedIn" class="logout-link" @click="logout">Logout</b-dropdown-item>
            <b-dropdown-item :to="'/auth/login'" v-else>Login</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
      }).then(result => {
        if (result.value) {
          firebase
            .auth()
            .signOut()
            .then(() => {
              this.$router.push("/");
            });
          Swal.fire("Logout!", "Your account has been logout.", "success");
        }
      });
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: black;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #3b8070;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.logout-link {
  cursor: pointer;
  text-decoration: underline;
  color: #551a8b;
}
.main {
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.main-links {
  margin: 10px 20px;
  display: flex;
  justify-content: space-around;
  width: 30%;
}
</style>
