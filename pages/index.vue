<template>
  <div class="container" style="justify-content: center; align-items: center; text-align: center;">
    <div>
      <logo style="width: 480px; height: 240px;" />
      <h1 class="title">
        Tetamba
      </h1>
      <h2 class="subtitle">
        Badminton score counter
      </h2>
      <div class="links">
        <nuxt-link :to="'/start'">
          <button class="btn btn-lg btn-primary">Start</button>
        </nuxt-link>
        <nuxt-link :to="'/start'">
          <button class="btn btn-lg text-primary">Help</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  }
}
</script>

<style>

</style>