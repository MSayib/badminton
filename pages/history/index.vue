<template>
  <div>
    <Navbar />
    <h3>history</h3>
  </div>
</template>

<script>
import Navbar from "~/components/navbar";
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "~/plugins/firebase";
import moment from "moment";
export default {
  components: { Navbar },
  data() {
    return {
    
     
    };
  },

  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/history/");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/auth/login");
      }
    }
  },
  methods: {
    
  },
 
};
</script>


<style>
</style>