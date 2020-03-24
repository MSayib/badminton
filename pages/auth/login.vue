<template>
  <div class="login">
    <h3>Login</h3>
    <form @submit.prevent="pressed">
      <div class="login">
        <input v-model="email" type="text" placeholder="ex: admin@admin.com" />
      </div>
      <div class="password">
        <input v-model="password" type="password" placeholder="ex: password" />
      </div>
      <button>Login</button>
    </form>
    <div v-if="error" class="error">{{ message.error }}</div>
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
          this.$router.push("/auth/secret");
        })
        // eslint-disable-next-line no-undef
        .catch(Error => (this.error = error));
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}

button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}

.error {
  color: red;
}
</style>
