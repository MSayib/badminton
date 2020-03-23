<template>
  <div>
      <b-container style="margin-top: 240px;">
          <b-row>
              <b-col>
                  <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                    <b-form-input
                    required
                    placeholder="Enter name"
                    ></b-form-input>
                    <b-button variant="primary">Submit</b-button>
                    <nuxt-link :to="'/'">
                        <b-button variant="danger">Kembali</b-button>
                    </nuxt-link>
                </b-form-group>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>