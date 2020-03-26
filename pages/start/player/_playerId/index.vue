<template>
  <div>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
        <p>{{ id }}</p>
      </li>
    </ul>
    <router-link to="/start/player" class="btn grey">Back</router-link>
  </div>
</template>

<script>
import Navbar from "~/components/navbar";
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "~/plugins/firebase";

export default {
  data() {
    return {
      id: null,
      name: null,
      gender: null,
      date: null
    };
  },

  
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData(id) {
      db.collection("peoples")
        .where("id", "==", id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id = doc.data().id;
            console.log(doc);
            this.name = doc.data().name;
            this.gender = doc.data().gender;
            this.date = doc.data().date;
          });
        });
    }
  }
};
</script>