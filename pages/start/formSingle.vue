<template>
  <div>
    <Navbar />
    <b-container class="body" fluid="xl">
      <b-row>
        <b-col>
          <h5 align="center">Set Pemain Tunggal</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-card class="mt-3" header="Tim A">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                :state="timAState"
                label="Nama Tim"
                label-for="timA-input"
                invalid-feedback="Name tim is required"
              >
                <b-form-input id="timA-input" v-model="timA" :state="timAState" required></b-form-input>
              </b-form-group>
              <div>
                <label class="typo__label">Nama Pemain</label>
                <multiselect
                  v-model="playerA"
                  tag-placeholder="Add this as new tag"
                  placeholder="Search or add a name"
                  label="name"
                  track-by="name"
                  :options="items"
                  class="mb-3"
                ></multiselect>
              </div>
            </b-form>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card class="mt-3" header="Tim B">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                :state="timBState"
                label="Nama Tim"
                label-for="timB-input"
                invalid-feedback="Name tim is required"
              >
                <b-form-input id="timB-input" v-model="timB" :state="timBState" required></b-form-input>
              </b-form-group>
              <div>
                <label class="typo__label">Nama Pemain</label>
                <multiselect
                  v-model="playerB"
                  tag-placeholder="Add this as new tag"
                  placeholder="Search or add a name"
                  label="name"
                  track-by="name"
                  :options="items"
                ></multiselect>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="12" offset-md="5">
          <b-button @click="onSubmit" type="submit" variant="primary">Submit</b-button>
          <b-button @click="onReset" type="reset" variant="danger">Reset</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "~/plugins/firebase";
import moment from "moment";
import Multiselect from "vue-multiselect";
import Navbar from "~/components/navbar";

export default {
  components: { Multiselect, Navbar },
  data() {
    return {
      timA: "",
      timB: "",
      timAState: null,
      timBState: null,
      playerA: "",
      playerB: "",
      items: [],
      show: true
    };
  },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/start/formSingle");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/auth/login");
      }
    }
  },
  methods: {
    onSelect(option, id) {
      console.log(option, id);
    },

    onSubmit(evt) {
      evt.preventDefault();
      localStorage.setItem("timA", JSON.stringify(this.timA));
      localStorage.setItem("playerA", JSON.stringify(this.playerA));
      localStorage.setItem("timB", JSON.stringify(this.timB));
      localStorage.setItem("playerB", JSON.stringify(this.playerB));

      this.$router.push("/start/counterSingle");
    },
    onReset(evt) {
      evt.preventDefault();
      this.timA = null;
      this.timB = null;
      this.playerA = null;
      this.playerB = null;
      this.timAState = null;
      this.timBState = null;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    fectData() {
      db.collection("peoples")
        .orderBy("date")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(doc.data());
            this.items.push({
              name: doc.data().name
            });
          });
        });
    }
  },
  created() {
    this.fectData();
  }
};
</script>

<style>
.body {
  margin-top: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
