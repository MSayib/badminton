<template>
  <div>
      <Navbar />
      <h1>History</h1>
  </div>
</template>

<script>
import Navbar from '~/components/navbar'
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    components:{Navbar},
  data() {
    return {};
  },
  
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/start/history");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/auth/login");
      }
    }
  }
};
</script>


<style>

</style>