<template>
  <div>
    <b-container class="container">
      <b-row class="text-center">
        <b-col>
          <b-card border-variant="dark" header="Tim A" align="center">
            <b-card-text>{{ left }}</b-card-text>
          </b-card>
          <br />
          <b-button variant="outline-success" @click="incrementValue"
            >+</b-button
          >
          <b-button variant="outline-warning" @click="decrementValue"
            >-</b-button
          >
        </b-col>
        <b-col cols="4">
          <img :src="img" alt="vs" width="200px" height="150px" />
        </b-col>
        <b-col>
          <b-card border-variant="dark" header="Tim B" align="center">
            <b-card-text>{{ right }}</b-card-text>
          </b-card>
          <br />
          <b-button variant="outline-success">+</b-button>
          <b-button variant="outline-warning">-</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: 0,
      right: 0,
      firstName: "",
      img: "https://i.ya-webdesign.com/images/vs-png-5.png"
    };
  },
  methods: {
    incrementValue() {
      this.left++;
    },
    decrementValue() {
      this.left--;
    },
    resetValue() {
      this.left = 0;
    }
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
img {
  width: 60%;
  height: auto;
}
</style>
