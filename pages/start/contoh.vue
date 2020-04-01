<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="items"
      class="mb-3"
      value-field="name"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>
    <div>{{selected}}</div>
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
      selected: "",
      items: []
    };
  },
  methods: {
    readData() {
      db.collection("peoples")
        .orderBy("date")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(doc.data());
            this.items.push({
              id: doc.id,
              name: doc.data().name,
              gender: doc.data().gender,
              date: moment(doc.data().date).format("LLLL")
            });
          });
        });
    }
  },
  created() {
    this.readData();
  }
};
</script>

<style lang="scss" scoped></style>