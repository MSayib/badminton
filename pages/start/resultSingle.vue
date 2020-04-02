<template>
  <div>
    <input type="text" :value="partai" disabled /> <br />
    <input type="text" :value="namaTimA" />
    <input type="text" :value="A" /><br />
    <input type="text" :value="namaTimB" />
    <input type="text" :value="B" /><br />

    <table border="1">
      <thead>
        <tr>
          <th>Set {{ ronde1 }}</th>
          <th>Set {{ ronde2 }}</th>
          <th>Set {{ ronde3 }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ namaTimA }}</td>
          <td>{{ namaTimB }}</td>
          <td>{{ namaTimA }}</td>
        </tr>
        <tr>
          <td>{{ scoreA1 }}</td>
          <td>{{ scoreB2 }}</td>
          <td>{{ scoreA3 }}</td>
        </tr>
        <tr>
          <td>{{ namaTimB }}</td>
          <td>{{ namaTimA }}</td>
          <td>{{ namaTimB }}</td>
        </tr>
        <tr>
          <td>{{ scoreB1 }}</td>
          <td>{{ scoreA2 }}</td>
          <td>{{ scoreB3 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    if(resSet[2]){
        this.scoreA3 = resSet[2]["tim"][0]["score"]
        this.scoreB3 = resSet[2]["tim"][1]["score"]
    }
  }
};
</script>

<style></style>
