<template>
  <div>
    <Navbar />
    <b-container fluid>
      <h1>List Player</h1>
      <b-col md="auto">
        <b-col md="12" offset-md="10">
          <b-button v-b-modal.modal-prevent-closing variant="primary">
            <b-icon icon="plus" variant="white"></b-icon>Add
          </b-button>
        </b-col>
        <p class="mt-3">Current Page: {{ currentPage }}</p>
        <b-table-simple
          id="my-table"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          small
        >
          <b-thead>
            <b-tr>
              <b-th>Name</b-th>
              <b-th>Gender</b-th>
              <b-th>Date</b-th>
              <b-th>Actions</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="item in items" :key="item.id">
              <td>{{ item.data().name }}</td>
              <td>{{ item.data().gender }}</td>
              <td>{{ item.data().date }}</td>
              <td>
                <b-button v-b-modal.modal-prevent-edit @click="editData(item)" variant="primary">
                  <b-icon small icon="pencil"></b-icon>
                </b-button>
                <b-button @click="deleteData(item.id)" variant="primary">
                  <b-icon small icon="trash"></b-icon>
                </b-button>
              </td>
            </b-tr>
          </b-tbody>
          <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Submit Your Name"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <form ref="form" @submit.stop.prevent="saveData">
              <b-form-group
                :state="nameState"
                label="Name"
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input id="name-input" v-model="item.name" :state="nameState" required></b-form-input>
              </b-form-group>
              <b-form-group
                :state="genderState"
                label="gender"
                label-for="gender-input"
                invalid-feedback="Gender is required"
              >
                <b-form-select
                  id="gender-input"
                  v-model="item.gender"
                  :options="options"
                  class="mb-3"
                  value-field="value"
                  text-field="item"
                  disabled-field="notEnabled"
                  :state="genderState"
                  required
                  placeholder="Please select a gender"
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
                  v-model="item.date"
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
          <b-modal
            id="modal-prevent-edit"
            ref="modal"
            title="Submit Your Name"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleUpdateOk"
          >
            <form ref="form" @submit.stop.prevent="updateData">
              <b-form-group
                :state="nameState"
                label="Name"
                label-for="name-edit"
                invalid-feedback="Name is required"
                
              >
                <b-form-input id="name-edit" v-model="item.name" :state="nameState" required></b-form-input>
              </b-form-group>
              <b-form-group
                :state="genderState"
                label="gender"
                label-for="gender-edit"
                invalid-feedback="Gender is required"
              >
                <b-form-select
                  id="gender-edit"
                  v-model="item.gender"
                  :options="options"
                  class="mb-3"
                  value-field="value"
                  text-field="item"
                  disabled-field="notEnabled"
                  :state="genderState"
                  required
                  placeholder="Please select a gender"
                ></b-form-select>
              </b-form-group>
              <b-form-group
                :state="dateState"
                label="date"
                label-for="date-edit"
                invalid-feedback="Date is required"
              >
                <b-form-datepicker
                  id="date-edit"
                  v-model="item.date"
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
        </b-table-simple>

        <b-pagination
          right
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import Navbar from "~/components/navbar";
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "~/plugins/firebase";
import Swal from "sweetalert2";
export default {
  components: { Navbar },
  data() {
    return {
      showDismissibleAlert: true,
      sortBy: "date",
      sortDesc: true,
      perPage: 3,
      currentPage: 1,
     
      items: [],
      item: {
        id: null,
        name: null,
        gender: null,
        date: null
      },
      nameState: null,
      genderState: null,
      dateState: null,
      options: [
        { item: "Female", value: "F" },
        { item: "Male", value: "M" }
      ],
      activeItem: null
    };
  },

  computed: {
    rows() {
      return this.items.length;
    }
  },
 
  methods: {
    watcher() {
    db.collection("peoples")
    .orderBy('date')
    .onSnapshot((querySnapshot) => {
        this.items = [];
        querySnapshot.forEach((doc) => {
            this.items.push(doc);
        });
      
    });
  },
    readData() {
      db.collection("peoples")
        .orderBy("date")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.data());
            this.items.push(doc);
          });
        });
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
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
      this.saveData();
    },
    handleUpdateOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.updateData();
    },
    resetModal() {
      this.name = "";
      this.gender = "";
      this.date = "";
      this.nameState = null;

      this.genderState = null;

      this.dateState = null;
    },
    saveData() {
      // Exit when the form isn't valid
      if (this.checkFormValidity()) {
        db.collection("peoples")
          .add(this.item)
          .then(docRef => this.watcher())
          .catch(error => console.log(err));
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
         
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide("modal-prevent-closing");
        });
      }
      return;
     
    },
    updateData() {
      db.collection("peoples")
        .doc(this.activeItem)
        .update(this.item)
        .then(() => {
          this.watcher()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your data has been updated',
            showConfirmButton: false,
            timer: 1500
          })
          
        })
        .catch((error) => {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Your data has been error updated',
            showConfirmButton: false,
            timer: 1500
          })
        });
        this.$nextTick(() => {
          this.$bvModal.hide("modal-prevent-edit");
        });
    },
    editData(item) {
      this.item = item.data();
      this.activeItem = item.id;
    },
    deleteData(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          db.collection("peoples").doc(id).delete()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.watcher();
        }
      })
    }
  },
  created() {
    this.readData();
  },

  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/absensi/");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/auth/login");
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>