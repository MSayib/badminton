<template>
  <div>
    <div class="container">
      <div>
        <logo />
        <br />
        <h4 class="title">
          Aplikasi Perhitungan Score Badminton By Tetamba
        </h4>
        <div>
          <b-button variant="outline-primary" href="/start" size="lg"
            >Let's Count!</b-button
          >
          <b-button
            v-b-modal.modal-prevent-closing
            variant="outline-success"
            size="lg"
            >Absensi</b-button
          >
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
                <b-form-input
                  id="name-input"
                  v-model="name"
                  :state="nameState"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                :state="genderState"
                label="gender"
                label-for="gender-input"
                invalid-feedback="Gender is required"
              >
                <b-form-select
                  id="gender-input"
                  v-model="gender"
                  :options="options"
                  class="mb-3"
                  value-field="value"
                  text-field="item"
                  disabled-field="notEnabled"
                  :state="genderState"
                  required
                ></b-form-select>
              </b-form-group>
              <b-form-group
                :state="dateState"
                label="date"
                label-for="datepicker-dateformat2"
                invalid-feedback="Date is required"
              >
                <b-form-datepicker
                  id="datepicker-dateformat2"
                  v-model="date"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }"
                  locale="en"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </form>
          </b-modal>
          <b-button variant="outline-danger" size="lg">Help</b-button>
        </div>
      </div>

      <h5 class="footer">
        &copy;Tetamba Studio
      </h5>
    </div>
  </div>
</template>

<script>
import db from "~/plugins/firebase";
import Logo from "~/components/Logo.vue";

export default {
  components: { Logo },
  data() {
    return {
      name: null,
      gender: null,
      date: null,
      nameState: null,
      genderState: null,
      dateState: null,

      peoples: [],
      options: [
        { item: "Please select a gender", value: null },
        { item: "Female", value: "F" },
        { item: "Male", value: "M" }
      ]
    };
  },
  mounted() {
    this.getDataGuest();
  },
  methods: {
    getDataGuest() {
      db.collection("peoples")
        .orderBy("name")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              gender: doc.data().gender,
              date: doc.data().date
            };
            this.peoples.push(data);
          });
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.genderState = valid;
      this.dateState = valid;
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
      this.gender = "";
      this.genderState = null;
      this.date = "";
      this.dateState = null;
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      //this.submittedNames.push(this.name);
      db.collection("peoples")
        .add({
          name: this.name,
          gender: this.gender,
          date: this.date
        })
        .then(docRef => this.$router.push("/"))
        .catch(error => console.log(err));
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
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  font-weight: 150;
  font-size: 20px;
  color: #526488;
}
</style>
