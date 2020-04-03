<template>
  <div>
    <b-container fluid align="center" style="margin-top: 48px">
      <b-row>
        <b-col>
          <div class="title">
            <h2>Double Match Result</h2>
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
                <td>bogor</td>
                <td>aisyah / farhan</td>
              </tr>
              <tr>
                <td>jakarta</td>
                <td>firda / juni</td>
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
                <th class="results">Set 1</th>
                <th class="results">Set 2</th>
                <th class="results">Set 3</th>
                <th class="results"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="results">bogor (aisyah / farhan )</td>
                <td class="results">24</td>
                <td class="results">18</td>
                <td class="results">21</td>
                <td class="results">
                  <div v-if="this.isMenangPertandinganA === true" class="winShow1">win</div>
                  <div v-else class="loseShow1">lose</div>
                </td>
              </tr>
              <tr>
                <td class="results">times</td>
                <td class="results">00 : 19 : 33</td>
                <td class="results">00 : 13 : 58</td>
                <td class="results">00 : 16 : 23</td>
                <td class="results"></td>
              </tr>
              <tr>
                <td class="results">jakarta (firda / juni )</td>
                <td class="results">22</td>
                <td class="results">21</td>
                <td class="results">23</td>
                <td class="results">
                  <div v-if="this.isMenangPertandinganB === true" class="winShow2">win</div>
                  <div v-else class="loseShow2">lose</div>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="margin-top: 20px">
          <nuxt-link to="/auth/dashboard">
            <b-button variant="primary" @click="submit">Save Results</b-button>
          </nuxt-link>
          <b-button variant="danger" disabled>Upload Documentation</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p style="color: #6c757d">
            *
            <b>Upload Documentation</b> feature is currently not
            <i>available</i>
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
      ScoreTimA: 1,
      ScoreTimB: 2
    };
  },

  computed: {
    isMenangPertandinganA() {
      if (this.ScoreTimA >= 0) {
        if (this.ScoreTimA >= this.ScoreTimB + 2) {
          return true;
        } else if (this.ScoreTimA === 2) {
          return true;
        }
      }
    },
    isMenangPertandinganB() {
      if (this.ScoreTimB >= 0) {
        if (this.ScoreTimB >= this.ScoreTimA + 2) {
          return true;
        } else if (this.ScoreTimB === 2) {
          return true;
        }
      }
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
