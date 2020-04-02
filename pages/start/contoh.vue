<template>
  <b-card
    bg-variant="danger"
    text-variant="white"
    header="Meninggal"
    class="text-center"
  >
    <b-card-text>{{ deaths.value }} Jiwa</b-card-text>
  </b-card>
</template>
<script>
export default {
  data() {
    return {
      deaths: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$axios.get("https://covid19.mathdro.id/api");
      this.deaths = res.data.deaths;
    }
  }
};
</script>
