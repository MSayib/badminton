<template>
  <!-- Top Navbar -->
  <nav
    class="top-navbar flex flex-row align-center p-2 fixed w-full"
    style="z-index: 9001;"
  >
    <!-- Logo Brand -->
    <div class="flex-grow">
      <router-link :to="'/auth/dashboard'">
        <b-icon icon="person-plus-fill"></b-icon>
      </router-link>
    </div>
    <!-- /Logo Brand -->

    <!-- Menu Button -->
    <button class="p-4" @click="toggle">
      <b-icon icon="person-plus-fill"></b-icon>
    </button>
  </nav>
  <!-- /Top Navbar -->
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({ toggle: "drawer/toggle" })
  },
  computed: {
    ...mapGetters({ drawer: "drawer/getDrawerState" })
  }
};
</script>
