<template>
  <b-container fluid>
    <b-row>
      <b-col cols="8">
        <h1>Bantuan</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          praesentium obcaecati laudantium ea! Repellendus, non! Nobis alias
          pariatur consequuntur? Quidem culpa, corporis accusantium natus iusto
          minus eveniet nesciunt optio ipsam?
        </p>
        <nuxt-link to="/" class="btn btn-outline-primary">Kembali</nuxt-link>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  head() {
    return {
      title: "Bantuan"
    };
  }
};
</script>
