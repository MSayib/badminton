<template>
  <div class="container">
    <div>
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="Silakan login">
              <b-form @submit.prevent="pressed">
                <b-form-group>
                  <b-input v-model="email" type="email" placeholder="admin@admin.com" />
                  <b-input v-model="password" type="password" placeholder="password" />
                </b-form-group>
                <b-button type="submit" variant="primary">Login</b-button>
              </b-form>
              <b-alert
                v-model="showDismissibleAlert"
                v-if="error"
                variant="danger"
                dismissible
              >{{ message.error }}</b-alert>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
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
          this.$router.push("/auth/dashboard");
        })
        // eslint-disable-next-line no-undef
        .catch(Error => (this.error = error));
    }
  }
};
</script>
