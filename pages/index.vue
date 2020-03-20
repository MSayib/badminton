<template>
  <div id="hitung">
    <button @click="tambah">tambah</button>
    <button @click="kurang">kurang</button>
    <button @click="reset">reset</button>

    <div>{{ hitung }}</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      hitung: 0,
    }
  },

  methods: {
    tambah(){
      this.hitung++;
    },

    kurang(){
      this.hitung--;
    },

    reset(){
      this.hitung = 0;
    }
  }
}
</script>

<style>

</style>