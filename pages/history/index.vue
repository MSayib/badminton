<template>
  <div>
    <Navbar />
    <b-container fluid="xl">
      <b-row>
        <b-col>
          <div class="title">
            <h2>Documentation</h2>
          </div>
        </b-col>
      </b-row>
      <b-row class="p-5">
        <b-col class="p-3" cols="6" md="4" v-for="item in items" :key="item.id">
          <b-card :title="item.partai">
            <carousel :perPage="1">
              <slide v-for="image in item.images" :key="image.index">
                <img :src="image" width="250px" />
              </slide>
            </carousel>
            <b-card-text> Pemain badminton</b-card-text>
            <template v-slot:footer>
              <small class="text-muted">{{ item.created_at }}</small>
            </template>
          </b-card>
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
import { Carousel, Slide } from "vue-carousel";

export default {
  components: { Navbar, Carousel, Slide },
  data() {
    return {
      items: []
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
    readData() {
      db.collection("pertandingan")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            this.items.push({
              id: doc.id,
              partai: doc.data().partai,
              images: doc.data().images,
              created_at: moment(doc.data().created_at).format("LLLL")
            });
            console.log(doc.id, " => ", doc.data());
          });
        });
    }
  },
  created() {
    this.readData();
  }
};
</script>

<style>
* {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
}

.title {
  text-transform: capitalize;
}
</style>
