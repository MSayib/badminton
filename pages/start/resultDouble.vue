<template>
  <div>
    <b-container fluid align="center" style="margin-top: 36px">
      <b-row>
        <b-col>
          <div class="title">
            <h2>{{partai}} Match Result</h2>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <table class="infoPlayers">
            <thead>
              <tr>
                <th class="players">Teams</th>
                <th class="players">Players</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{namaTimA}}</td>
                <td>{{A1}} / {{A2}}</td>
              </tr>
              <tr>
                <td>{{namaTimB}}</td>
                <td>{{B1}} / {{B2}}</td>
              </tr>
            </tbody>
          </table>

          <div class="time">
            <h5>time results</h5>
            <table class="time">
              <thead>
                <tr>
                  <th>{{stopwatch1}}</th>
                </tr>
              </thead>
            </table>
          </div>

          <table class="infoResults">
            <thead>
              <tr>
                <th class="results">Teams</th>
                <th class="results">Set {{ronde1}}</th>
                <th class="results">Set {{ronde2}}</th>
                <th class="results">Set {{ronde3}}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="results">
                  <div>
                    {{namaTimA}} ({{A1}} / {{A2}})
                    <div v-if="this.isMenangPertandinganA === true" class="winShow">win</div>
                    <div v-else class="loseShow">lose</div>
                  </div>
                </td>
                <td class="results">{{scoreA1}}</td>
                <td class="results">{{scoreA2}}</td>
                <td class="results">{{scoreA3}}</td>
              </tr>
              <tr>
                <td class="results">times</td>
                <td class="results">{{stopwatch1}}</td>
                <td class="results">{{stopwatch2}}</td>
                <td class="results">{{stopwatch3}}</td>
              </tr>
              <tr>
                <td class="results">
                  <div>
                    {{namaTimB}} ({{B1}} / {{B2}})
                    <div v-if="this.isMenangPertandinganB === true" class="winShow">win</div>
                    <div v-else class="loseShow">lose</div>
                  </div>
                </td>
                <td class="results">{{scoreB1}}</td>
                <td class="results">{{scoreB2}}</td>
                <td class="results">{{scoreB3}}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="margin-top: 18px">
          <b-button variant="primary" @click="submit">Save Results</b-button>
          <b-button variant="danger" @click="showFile">Upload Image Here...</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="margin-top: 20px">
          <div class="uploadImage">
            <input
              id="myFile"
              ref="myFile"
              type="file"
              style="display: none;"
              @change="uploadImage"
              class="form-control"
            />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="margin-top: 20px" md="12" offset-md="4">
          <div class="form-group d-flex">
            <div class="p-1" v-for="i in images" :key="i.id">
              <img :src="i" width="100px" />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "~/plugins/firebase";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      partai: "",
      images: [],
      namaTimA: "",
      namaTimB: "",
      A1: "",
      A2: "",
      B1: "",
      B2: "",
      ronde1: "",
      ronde2: "",
      ronde3: "3",
      stopwatch1: Number(""),
      stopwatch2: Number(""),
      stopwatch3: "00:00:00",
      scoreA1: "",
      scoreA2: "",
      scoreA3: "0",
      scoreB1: "",
      scoreB2: "",
      scoreB3: "0",
      scoreTimA: "",
      scoreTimB: ""
    };
  },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/start/resultDouble");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/auth/login");
      }
    }
  },
  mounted() {
    // get general data
    this.partai = JSON.parse(localStorage.getItem("partai"));
    this.namaTimA = JSON.parse(localStorage.getItem("timA"));
    this.namaTimB = JSON.parse(localStorage.getItem("timB"));

    //get players in team A
    const resA = JSON.parse(localStorage.getItem("playerA"));
    this.A1 = resA[0]["name"];
    this.A2 = resA[1]["name"];
    //get players in team B
    const resB = JSON.parse(localStorage.getItem("playerB"));
    this.B1 = resB[0]["name"];
    this.B2 = resB[1]["name"];
    //get ronde
    const resSet = JSON.parse(localStorage.getItem("set"));
    this.ronde1 = resSet[0]["ronde"];
    this.ronde2 = resSet[1]["ronde"];
    if (resSet[2]) {
      this.ronde3 = resSet[2]["ronde"];
    }
    //get times in set
    this.stopwatch1 = resSet[0]["stopwatch"];
    this.stopwatch2 = resSet[1]["stopwatch"];
    if (resSet[2]) {
      this.stopwatch3 = resSet[2]["stopwatch"];
    }
    //get scores in set
    //get scores A
    this.scoreA1 = resSet[0]["tim"][0]["score"];
    this.scoreA2 = resSet[1]["tim"][0]["score"];
    if (resSet[2]) {
      this.scoreA3 = resSet[2]["tim"][0]["score"];
    }
    //get scores B
    this.scoreB1 = resSet[0]["tim"][1]["score"];
    this.scoreB2 = resSet[1]["tim"][1]["score"];
    if (resSet[2]) {
      this.scoreB3 = resSet[2]["tim"][1]["score"];
    }
    //get scoreTim
    const resScore = JSON.parse(localStorage.getItem("scoreTim"));
    this.scoreTimA = resScore[0]["scoreTimA"];
    this.scoreTimB = resScore[0]["scoreTimB"];
  },

  computed: {
    isMenangPertandinganA() {
      if (this.scoreTimA >= 0) {
        if (this.scoreTimA >= this.scoreTimB + 2) {
          return true;
        } else if (this.scoreTimA === 2) {
          return true;
        }
      }
    },
    isMenangPertandinganB() {
      if (this.scoreTimB >= 0) {
        if (this.scoreTimB >= this.scoreTimA + 2) {
          return true;
        } else if (this.scoreTimB === 2) {
          return true;
        }
      }
    }
  },
  methods: {
    showFile() {
      this.$refs["myFile"].click();
    },
    uploadImage(e) {
      let file = e.target.files[0];
      var storageRef = firebase.storage().ref("images/" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.images.push(downloadURL);
            // console.log("File available at", downloadURL);
          });
        }
      );
    },
    submit() {
      db.collection("pertandingan")
        .add({
          partai: this.partai,
          images: this.images,
          created_at: Date.now(),
          set: JSON.parse(localStorage.getItem("set")),
          tim: [
            {
              tim: this.namaTimA,
              pemain: [this.A1, this.A2]
            },
            {
              tim: this.namaTimB,
              pemain: [this.B1, this.B2]
            }
          ]
        })
        .catch(error => console.log(err));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your data has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      this.$router.push("/auth/dashboard");
    }
  }
};
</script>

<style>
* {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
}

.title {
  text-transform: capitalize;
}

table.infoPlayers {
  border-collapse: collapse;
  width: 100%;
  border-bottom: 2px solid #ddd;
  border-right: 2px solid #ddd;
  border-left: 2px solid #ddd;
  text-transform: capitalize;
}

div.time {
  margin: 12px 0;
  text-transform: capitalize;
}
table.time {
  border: 2px solid;
  margin: 12px 0;
}

th,
td {
  padding: 8px 12px;
  font-size: 18px;
  text-align: center;
}

th.players {
  background-color: #007bff;
  color: white;
  border: none;
}

.results {
  text-align: left;
  border: none;
}

th.results {
  background-color: #dc3545;
  color: white;
  border: none;
}

td.results {
  border-bottom: 2px solid #ddd;
}

table.infoResults {
  width: 100%;
  margin-top: 20px;
  border-right: 2px solid #ddd;
  border-left: 2px solid #ddd;
  text-transform: capitalize;
}

div.winShow {
  border: 1px solid #28a745;
  background-color: #28a745;
  color: white;
  padding: 2px 2px;
  text-align: center;
  width: 42px;
  font-size: 16px;
  border-radius: 2px;
  display: inline-block;
}

div.loseShow {
  border: 1px solid #dc3545;
  background-color: #dc3545;
  color: white;
  padding: 2px 2px;
  text-align: center;
  width: 42px;
  font-size: 16px;
  border-radius: 2px;
  display: inline-block;
}
</style>
