<template>
  <div class="container">
    <div>
      <logo/>
      <br />
      <h4 class="title">
        Aplikasi Perhitungan Score Badminton By Tetamba
      </h4>
      <div>
        <b-button variant="outline-primary" href="/hitung" size="lg">Let's Count!</b-button>
        <b-button variant="outline-success" size="lg">Absensi</b-button>
      </div>
    </div>
    <h5 class="footer">
      &copy;Tetamba Studio
    </h5>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
export default {
  components: {
    Logo
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  font-weight: 150;
  font-size: 20px;
  color: #526488;
}
</style>
