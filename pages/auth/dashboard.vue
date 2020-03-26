<template>
  <div>
    <b-row>
      <b-container fluid>
        <h1>Dashboard</h1>
        <b-col md="auto">
          <b-alert
            v-model="showDismissibleAlert"
            variant="success"
            dismissible
          >Selamat datang, Admin!</b-alert>
        </b-col>
        <b-col md="auto">
          <p class="mt-3">Current Page: {{ currentPage }}</p>
          <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            small
          ></b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
      </b-container>
    </b-row>
  </div>
</template>

<script>
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      showDismissibleAlert: true,
      perPage: 4,
      currentPage: 1,
      items: [
        { id: 1, first_name: "M Sayib", team_name: "A" },
        { id: 2, first_name: "Muchlas", team_name: "A" },
        { id: 3, first_name: "Fikri", team_name: "A" },
        { id: 4, first_name: "Farhan", team_name: "A" },
        { id: 5, first_name: "Aisyah", team_name: "B" },
        { id: 6, first_name: "Firda", team_name: "B" },
        { id: 7, first_name: "Ayu", team_name: "B" },
        { id: 8, first_name: "Juni", team_name: "B" },
        { id: 9, first_name: "Alfin", team_name: "A" }
      ]
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/auth/login");
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

<style lang="scss" scoped></style>
