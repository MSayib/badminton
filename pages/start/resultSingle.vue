<template>
  <div>
    <b-container fluid align="center" style="margin-top: 36px">
      <b-row>
        <b-col>
          <div class="title">
            <h2>{{ partai }} Match Result</h2>
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
                <td>{{ namaTimA }}</td>
                <td>{{ A }}</td>
              </tr>
              <tr>
                <td>{{ namaTimB }}</td>
                <td>{{ B }}</td>
              </tr>
            </tbody>
          </table>

          <div class="time">
            <h5>time results</h5>
            <table class="time">
              <thead>
                <tr>
                  <th>00 : 49 : 54</th>
                </tr>
              </thead>
            </table>
          </div>

          <table class="infoResults">
            <thead>
              <tr>
                <th class="results">Teams</th>
                <th class="results">Set {{ ronde1 }}</th>
                <th class="results">Set {{ ronde2 }}</th>
                <th class="results">Set {{ ronde3 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="results">
                  <div>
                    {{ namaTimA }} ({{ A }})
                    <div v-if="this.isMenangPertandinganA === true" class="winShow1">win</div>
                    <div v-else class="loseShow1">lose</div>
                  </div>
                </td>
                <td class="results">{{ scoreA1 }}</td>
                <td class="results">{{ scoreA2 }}</td>
                <td class="results">{{ scoreA3 }}</td>
              </tr>
              <tr>
                <td class="results">Times</td>
                <td class="results">00 : 00 : 00</td>
                <td class="results">00 : 00 : 00</td>
                <td class="results">00 : 00 : 00</td>
              </tr>
              <tr>
                <td class="results">
                  <div>
                    {{ namaTimB }} ({{ B }})
                    <div v-if="this.isMenangPertandinganB === true" class="winShow2">win</div>
                    <div v-else class="loseShow2">lose</div>
                  </div>
                </td>
                <td class="results">{{ scoreB1 }}</td>
                <td class="results">{{ scoreB2 }}</td>
                <td class="results">{{ scoreB3 }}</td>
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
      images: [],
      partai: "",
      namaTimA: "",
      namaTimB: "",
      A: "",
      B: "",
      ronde1: "",
      ronde2: "",
      ronde3: "3",
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
        redirect("/start/resultSingle");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/auth/login");
      }
    }
  },
  mounted() {
    this.partai = JSON.parse(localStorage.getItem("partai"));
    this.namaTimA = JSON.parse(localStorage.getItem("timA"));
    this.namaTimB = JSON.parse(localStorage.getItem("timB"));
    const resA = JSON.parse(localStorage.getItem("playerA"));
    this.A = resA["name"];
    const resB = JSON.parse(localStorage.getItem("playerB"));
    this.B = resB["name"];
    const resSet = JSON.parse(localStorage.getItem("set"));
    this.ronde1 = resSet[0]["ronde"];
    this.ronde2 = resSet[1]["ronde"];
    if (this.ronde3 === true) {
      this.ronde3 = resSet[2]["ronde"];
    }
    const resScore = JSON.parse(localStorage.getItem("set"));
    this.scoreA1 = resSet[0]["tim"][0]["score"];
    this.scoreB1 = resSet[0]["tim"][1]["score"];
    this.scoreA2 = resSet[1]["tim"][0]["score"];
    this.scoreB2 = resSet[1]["tim"][1]["score"];
    if (resSet[2]) {
      this.scoreA3 = resSet[2]["tim"][0]["score"];
      this.scoreB3 = resSet[2]["tim"][1]["score"];
    }
    const resScoreTim = JSON.parse(localStorage.getItem("scoreTim"))
    this.scoreTimA = resScoreTim[0]["scoreTimA"]
    this.scoreTimB = resScoreTim[0]["scoreTimB"]
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
    showFile(){
      document.getElementById("myFile").click()
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
              pemain: this.A,
              tim: this.namaTimA
            },
            {
              pemain: this.B,
              tim: this.namaTimB
            }
          ]
        })
        .catch(error => console.log(err));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data has been saved",
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
  padding: 10px 18px;
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
div.winShow1 {
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
div.loseShow1 {
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
div.winShow2 {
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
div.loseShow2 {
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