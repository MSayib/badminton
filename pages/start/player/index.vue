<template>
  <div>
    <Navbar />
    <b-container fluid>
      <h1>List Player</h1>
      <b-col md="auto">
        <b-col md="12" offset-md="10">
          <b-button :href="'/start/player/'" variant="primary">
            <b-icon icon="arrow-repeat" variant="white"></b-icon>Refresh
          </b-button>
          <b-button v-b-modal.modal-prevent-closing variant="primary">
            <b-icon icon="plus" variant="white"></b-icon>Add
          </b-button>
        </b-col>
        <p class="mt-3">Current Page: {{ currentPage }}</p>
        <b-table
          id="my-table"
          :fields="fields"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          small
        >
          <template v-slot:cell(ID)="data">{{ data.index + 1 }}</template>
          <template v-slot:cell(NAME)="data">
            <p>{{ data.item.name }}</p>
          </template>
          <template v-slot:cell(GENDER)="data">
            <p>{{ data.item.gender }}</p>
          </template>
          <template v-slot:cell(DATE)="data">
            <p>{{ data.item.date }}</p>
          </template>
          <template v-slot:cell(ACTIONS)="data">
            <nuxt-link :to="'/start/player/' + data.item.id">
              <b-icon icon="eye" variant="primary"></b-icon>
            </nuxt-link>
            <nuxt-link :to="'/start/player/' + data.item.id + '/edit'">
              <b-icon icon="pencil" variant="primary"></b-icon>
            </nuxt-link>
            <b-icon small @click="deleteData(data.item.id)" variant="primary" icon="trash"></b-icon>
          </template>
        </b-table>
        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Submit Your Name"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="saveData">
            <b-form-group
              :state="nameState"
              label="Name"
              label-for="name-input"
              invalid-feedback="Name is required"
            >
              <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
            </b-form-group>
            <b-form-group
              :state="genderState"
              label="gender"
              label-for="gender-input"
              invalid-feedback="Gender is required"
            >
              <b-form-select
                id="gender-input"
                v-model="gender"
                :options="options"
                class="mb-3"
                value-field="value"
                text-field="item"
                disabled-field="notEnabled"
                :state="genderState"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              :state="dateState"
              label="date"
              label-for="datepicker-dateformat2"
              invalid-feedback="Date is required"
            >
              <b-form-datepicker
                id="datepicker-dateformat2"
                v-model="date"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
                locale="en"
                required
              ></b-form-datepicker>
            </b-form-group>
          </form>
        </b-modal>

        <b-pagination
          right
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import Navbar from "~/components/navbar";
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "~/plugins/firebase";
import Swal from "sweetalert2";
export default {
  components: { Navbar },
  data() {
    return {
      showDismissibleAlert: true,
      sortBy: "date",
      sortDesc: true,
      perPage: 5,
      currentPage: 1,
      items: [],
      fields: ["ID", "NAME", "GENDER", "DATE", "ACTIONS"],
      id: null,
      name: null,
      gender: null,
      date: null,
      nameState: null,
      genderState: null,
      dateState: null,
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
      return this.items.length;
    }
  },
  methods: {
    readData() {
      db.collection("peoples")
        .orderBy("date")
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              gender: doc.data().gender,
              date: doc.data().date
            };
            console.log(doc.data());
            this.items.push(data);
          });
        });
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.genderState = valid;
      this.dateState = valid;
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.saveData();
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
      this.gender = "";
      this.genderState = null;
      this.date = "";
      this.dateState = null;
    },
    saveData() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      db.collection("peoples")
        .add({
          name: this.name,
          gender: this.gender,
          date: this.date
        })
        .then(docRef => this.$router.push("/start/player"))

        .catch(error => console.log(err));
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },

    deleteData(id) {
      if (confirm("Are you sure?")) {
        alert(id);
        db.collection("peoples")
          .doc(id)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
    }
  },
  mounted() {
    this.readData();
  },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/start/player");
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
