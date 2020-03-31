<template>
  <div>
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
              <b-form-select
                v-model="item"
                :options="items"
                class="mb-3"
                value-field="name"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-select>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card class="mt-3" header="Tim B">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-select
                v-model="item"
                :options="items"
                class="mb-3"
                value-field="name"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-select>
              <div>{{item}}</div>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card>
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

export default {
  data() {
    return {
      item: "",
      items: [],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.item = null;
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
