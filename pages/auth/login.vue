<template>
  <div>
    <div>
      <b-container align="center" style="margin-top: 150px;">
        <b-row>
          <b-col>
            <b-card
              no-body
              class="overflow-hidden"
              style="max-width: 640px;"
              header="Badminton Apps v1"
              bg-variant="light"
            >
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img
                    src="~/assets/bg-login.svg"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body title="Please login">
                    <b-form
                      @submit.prevent="pressed"
                      @show="resetModal"
                      @hidden="resetModal"
                    >
                      <b-form-group
                        label="Email"
                        label-for="email"
                        :state="emailState"
                        invalid-feedback="Email  is required"
                      >
                        <b-input
                          id="email"
                          v-model="email"
                          type="email"
                          placeholder="admin@admin.com"
                          :state="emailState"
                          required
                        />
                      </b-form-group>
                      <b-form-group
                        label="Password"
                        label-for="pass"
                        :state="passState"
                        invalid-feedback="Password is required"
                      >
                        <b-input
                          id="pass"
                          v-model="password"
                          type="password"
                          placeholder="password"
                          :state="passState"
                          required
                        />
                      </b-form-group>
                      <b-button type="submit" variant="primary">Login</b-button>
                    </b-form>
                    <b-alert
                      v-model="showDismissibleAlert"
                      v-if="error"
                      variant="danger"
                      dismissible
                      >{{ message.error }}</b-alert
                    >
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as firebase from "firebase/app";
import "firebase/auth";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: "",
      password: "",
      emailState: null,
      passState: null,
      error: ""
    };
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          // eslint-disable-next-line no-console
          console.log(data);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          this.$router.push("/auth/dashboard");
          Toast.fire({
            position: "center",
            icon: "success",
            title: "Login successfully"
          });
        })
        // eslint-disable-next-line no-undef
        .catch(Error =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email or password is wrong!",
            showConfirmButton: false,
            timer: 3000
          })
        );
    },
    resetModal() {
      this.email = "";
      this.password = "";
      this.emailState = null;
      this.passState = null;
    }
  }
};
</script>
