<template>
  <div>
    <Navbar />
    <b-container fluid="xl">
      <b-row>
        <b-col>
          <h1>Dashboard</h1>
          <b-col md="auto">
            <b-alert
              v-model="showDismissibleAlert"
              variant="success"
              dismissible
              >Selamat datang, Admin!</b-alert
            >

            <b-table
              id="my-table"
              :items="peoples"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              small> 
            <template v-slot:cell(index)="data">{{ data.index + 1 }}</template>
            <template v-slot:cell(name)="data">
              <p>{{ data.item.name }}</p>
            </template>
            <template v-slot:cell(gender)="data">
              <p>{{ data.item.gender }}</p>
            </template>
            </b-table>
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
        </b-col>
      </b-row>
      <b-row align="center">
        <b-col>
          <div>
            <b-button v-b-modal.modal-center size="lg" variant="primary">Let's Play</b-button>

            <b-modal id="modal-center" centered hide-footer title="Pilih Mode">
              <div class="d-block text-center">
                <b-button variant="primary" to="/start/formSingle" size="lg"
                  >Single Match</b-button
                >
                <b-button to="/start/formDouble" variant="danger" size="lg"
                  >Double Match</b-button
                >
              </div>
            </b-modal>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
      perPage: 3,
      currentPage: 1,
      peoples: [],
      fields: [
        { key: "index", label: "No" },
        { key: "name", label: "Name", sortable: true },
        { key: "gender", label: "Gender", sortable: false },
        { key: "date", label: "Create at", sortable: true },
      ],
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
        .orderBy("date")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              gender: doc.data().gender,
              date: moment(doc.data().date).format("LLLL")
            };
            this.peoples.push(data);
          });
        });
    }
  }
};
</script>
