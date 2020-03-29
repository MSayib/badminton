<template>
  <div>
    <b-container fluid>
      <Navbar />
      <h1>Dashboard</h1>
      <b-col md="auto">
        <b-alert v-model="showDismissibleAlert" variant="success" dismissible>Selamat datang, Admin!</b-alert>

        <b-table
          id="my-table"
          :items="peoples"
          :per-page="perPage"
          :current-page="currentPage"
          small
        ></b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-container>

    <div>
      <b-button variant="primary" to="/start/counter" size="lg">Single Match</b-button>
      <b-button to="/start/counterDouble" variant="danger" size="lg">Double Match</b-button>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/navbar";
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "~/plugins/firebase";
export default {
  components: { Navbar },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/auth/dashboard");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/auth/login");
      }
    }
  },
  data() {
    return {
      showDismissibleAlert: true,
      name: null,
      gender: null,
      date: null,
      nameState: null,
      genderState: null,
      dateState: null,
      perPage: 4,
      currentPage: 1,
      peoples: [],
      options: [
        { item: "Please select a gender", value: null },
        { item: "Female", value: "F" },
        { item: "Male", value: "M" }
      ]
    };
  },
  computed: {
    rows() {
      return this.peoples.length;
    }
  },
  mounted() {
    this.getDataGuest();
  },
  methods: {
    getDataGuest() {
      db.collection("peoples")
        .orderBy("name")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              gender: doc.data().gender,
              date: doc.data().date
            };
            this.peoples.push(data);
          });
        });
    }
  }
};
</script>