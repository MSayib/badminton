<template>
  <div>
    <b-container fluid align="center" style="margin-top: 48px">
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
                <td class="results">{{ namaTimA }} ({{ A }})</td>
                <td class="results">{{ scoreA1 }}</td>
                <td class="results">{{ scoreA2 }}</td>
                <td class="results">{{ scoreA3 }}</td>
              </tr>
              <tr>
                <td class="results">{{ namaTimB }} ({{ B }})</td>
                <td class="results">{{ scoreB1 }}</td>
                <td class="results">{{ scoreB2 }}</td>
                <td class="results">{{ scoreB3 }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="margin-top: 20px">
          <b-button variant="primary" @click="submit">Save Results</b-button>
          <b-button variant="danger" disabled>Upload Documentation</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p style="color: #6c757d">
            *Upload Documentation feature is currently not available
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from "~/plugins/firebase";
import Swal from "sweetalert2";

export default {
  data() {
    return {
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
      scoreB3: "0"
    };
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
  },
  methods: {
    submit() {
      db.collection("pertandingan")
        .add({
          partai: this.partai,
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
        title: "Data Berhasil Disave",
        showConfirmButton: false,
        timer: 1500
      });
      this.$router.push('/auth/dashboard')
    }
  }
};
</script>

<style>
.title {
  text-transform: capitalize;
}
table.infoPlayers {
  border-collapse: collapse;
  width: 100%;
  border-bottom: 2px solid #ddd;
  border-right: 2px solid #ddd;
  border-left: 2px solid #ddd;
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
}
</style>
