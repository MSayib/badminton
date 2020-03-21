<template>
  <b-container>
    <div>
      <b-row align="center">
        <b-col>
          <label for="tim-a">Tim A</label>
          <br />
          <b-form-spinbutton
            id="tim-a"
            v-model="valueA"
            min="1"
            max="100"
            size="lg"
            vertical
          ></b-form-spinbutton>
        </b-col>
        <b-col>
          <label for="tim-a">Tim B</label>
          <br />
          <b-form-spinbutton
            id="tim-b"
            v-model="valueB"
            min="1"
            max="100"
            size="lg"
            vertical
          ></b-form-spinbutton>
        </b-col>
      </b-row>
      <br />
      <b-col align="center">
        <nuxt-link to="/" class="btn btn-outline-primary">Kembali</nuxt-link>
      </b-col>
    </div>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      valueA: 0,
      valueB: 0
    };
  },
  head() {
    return {
      title: "Badminton Score Counter"
    };
  }
};
</script>
