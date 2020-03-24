<template>
  <div class="container">
    <div>
      <h1 class="title">badminton-apps</h1>
      <div>
        <b-button v-b-modal.modal-prevent-closing pill variant="primary" size="lg">Guest</b-button>
        <v-spacer></v-spacer> 
        <div class="mt-3">
          <h4>Submitted Name : </h4>
            <div
              v-for="guest in guests"
              v-bind:key="guest.id"
              class="collection-item"
            > 
            <b-button pill variant="outline-primary" size="sm"> {{guest.guest_id}} </b-button> 
            {{guest.name}}</div>
          
        </div>
        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Submit Your Name"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="nameState"
              label="Name"
              label-for="name-input"
              invalid-feedback="Name is required"
            >
              <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import db from "~/plugins/firebase";

export default {
  components: {},
  data() {
    return {
      name: "",
      nameState: null,
      submittedNames: [],
      guests: []
    };
  },
  created() {
    db.collection('guests')
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            guest_id: doc.data().guest_id,
            name: doc.data().name
          };
          this.guests.push(data);
        });
      });
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
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

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
