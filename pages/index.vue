<template>
  <b-container>
    <b-row align="center">
      <b-col>
        <logo />
        <h2 class="title">Badminton Score Counter</h2>
        <h3 class="subtitle">
          Selamat datang di aplikasi penghitung skor Badminton
        </h3>
      </b-col>
    </b-row>
    <b-row align="center">
      <b-col>
        <div class="mx-auto">
          <nuxt-link
            to="/start"
            class="btn btn-lg btn-block btn-outline-success"
            >Start</nuxt-link
          >
          <nuxt-link to="/help" class="btn btn-lg btn-block btn-outline-success"
            >Help</nuxt-link
          >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  head() {
    return {
      title: "Home | Sayib"
    };
  }
};
</script>
