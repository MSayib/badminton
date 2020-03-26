<template>
  <div>
    <b-container fluid>
      <h1>Dashboard</h1>
      <b-col md="auto">
        <b-alert v-model="showDismissibleAlert" variant="success" dismissible>Selamat datang, Admin!</b-alert>
        <p class="mt-3">Ini halaman absensi</p>
        <p>Per halaman menampilkan 4 orang, dengan maksimal halaman sesuai data yang ada di database</p>
        <b-table
          id="my-table"
          :items="peoples"
          :per-page="perPage"
          :current-page="currentPage"
          small
        >
          <b-button size="sm" @click.stop="details(key)">Details</b-button>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
      <b-button @click="resetServer">RESET</b-button>
    </b-container>
  </div>
</template>

<script>
import db from "~/plugins/firebase";
export default {
  data() {
    return {
      showDismissibleAlert: true,
      name: null,
      gender: null,
      date: null,
      nameState: null,
      genderState: null,
      dateState: null,
      perPage: 4,
      currentPage: 1,

      peoples: [],
      options: [
        { item: "Please select a gender", value: null },
        { item: "Female", value: "F" },
        { item: "Male", value: "M" }
      ]
    };
  },
  computed: {
    rows() {
      return this.peoples.length;
    }
  },
  mounted() {
    this.getDataGuest();
  },
  methods: {
    details(poeple) {
      router.push({ name: "details", params: { id: people.key } });
    },
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
      //ini add
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
    },
    resetServer() {
      db.collection("peoples").onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
          //   ref
          //     .doc(doc.id)
          //     .delete()
          //     .catch(error => {
          //       console.log(error);
          //     });
          // });
          console.log(doc);
        });
      });
    }
  }
};
</script>