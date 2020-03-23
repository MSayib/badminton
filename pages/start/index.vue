<template>
  <div class="container" style="justify-content: center; text-align: center; align-items: center;">
    <h3>Form</h3>
    <br>
    <div>
        <h5>Team A</h5>
        <input type="text" placeholder="Nama 1" v-model="namaA1">
        <input type="text" placeholder="Nama 2" v-model="namaA2">
    </div>
    <br>
    <div>
        <h5>Team B</h5>
        <input type="text" placeholder="Nama 1" v-model="namaB1">
        <input type="text" placeholder="Nama 2" v-model="namaB2">
    </div>
    <br>
    <nuxt-link :to="'/start/counter'">
        <button class="btn btn-md btn-primary">Submit</button>
    </nuxt-link>
    <nuxt-link :to="'/'">
        <button class="btn btn-md text-danger">Kembali</button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
    data(){
        return{
            namaA1: '',
            namaA2: '',
            namaB1: '',
            namaB2: ''
        }
    },
    

}
</script>

<style>
    input{
        width: 50%;
        padding: 12px 20px;
        margin: 8px 0;
        transition: width 0.4s ease-in-out;
    }

    input:focus{
        width: 100%;
    }
</style>