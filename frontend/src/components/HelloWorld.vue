<template>
  <div class="container">
    <div class="header-title">
      <h1 class="header-content">{{ msg }}</h1>
    </div>
    <div class="middle-wrapper">
      <div class="middle-content">
        <h3>NPS Groups</h3>
        <p v-if="!npsGroups">No data yet</p>
        <div v-if="!npsGroups" class="middle-visible-content"></div>
        <div v-if="npsGroups" class="middle-visible-content">
          <p>{{ "Prometers: " + npsGroups.Prometers }}</p>
          <p>{{ "Detractors: " + npsGroups.Detractors }}</p>
          <p>{{ "Passives: " + npsGroups.Passives }}</p>
          <p>{{ "Total: " + npsGroups.Total }}</p>
        </div>
        <div class="buttons-wrapper">
          <button
            class="button"
            :disabled="
              loaderGroups === true || npsGroups !== null ? true : none
            "
            @click="getNpsGroups"
          >
            {{
              loaderGroups === true
                ? "Loading..."
                : npsGroups === null
                ? "Get NPS Groups"
                : "Data Loaded"
            }}
          </button>
        </div>
      </div>

      <div class="middle-content">
        <h3>NPS Score</h3>
        <p v-if="!npsScore">No data yet</p>
        <div v-if="!npsScore" class="middle-visible-content"></div>
        <div v-if="npsScore" class="middle-visible-content">
          <p v-if="npsScore">{{ Number(npsScore.Score.toFixed(2)) }}</p>
        </div>
        <div class="buttons-wrapper">
          <button
            class="button"
            :disabled="loaderScore === true || npsScore !== null ? true : none"
            @click="getNpsScore"
          >
            {{
              loaderScore === true
                ? "Loading..."
                : npsScore === null
                ? "Get NPS Groups"
                : "Data Loaded"
            }}
          </button>
        </div>
      </div>

      <div class="middle-content">
        <h3>Emocition Avarage</h3>
        <p v-if="!emoticon">No data yet</p>
        <div v-if="!emoticon" class="middle-visible-content"></div>
        <div v-if="emoticon" class="middle-visible-content">
          <p v-if="emoticon">{{ Number(emoticon.average.toFixed(2)) }}</p>
        </div>
        <div class="buttons-wrapper">
          <button
            class="button"
            :disabled="
              loaderEmotican === true || emoticon !== null ? true : none
            "
            @click="getEmoticonAverage"
          >
            {{
              loaderEmotican === true
                ? "Loading..."
                : emoticon === null
                ? "Get NPS Groups"
                : "Data Loaded"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      npsGroups: null,
      npsScore: null,
      emoticon: null,
      loaderEmotican: false,
      loaderScore: false,
      loaderGroups: false,
    };
  },
  methods: {
    getEmoticonAverage() {
      this.loaderEmotican = true;
      axios
        .get("http://localhost:3000/emoticon-average")
        .then((response) => response.data)
        .then((data) => {
          this.loaderEmotican = false;
          this.emoticon = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNpsScore() {
      this.loaderScore = true;
      axios
        .get("http://localhost:3000/nps-score")
        .then((response) => response.data)
        .then((data) => {
          this.npsScore = data;
          this.loaderScore = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNpsGroups() {
      this.loaderGroups = true;
      axios
        .get("http://localhost:3000/nps-groups")
        .then((response) => response.data)
        .then((data) => {
          this.npsGroups = data;
          this.loaderGroups = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container .middle-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px;
}
.container .middle-wrapper .middle-content h3 {
  display: flex;
  justify-content: flex-start;
}
.container .middle-wrapper .middle-content p {
  display: flex;
  justify-content: flex-start;
}
.container .middle-wrapper .middle-content .middle-visible-content {
  height: 200px;
}
.container .middle-wrapper .middle-content .buttons-wrapper .button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  min-width: 150px !important;
  height: 15px;
  font-size: 0.9em;
  background-color: purple;
  color: white;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
}
.container .middle-wrapper .middle-content .buttons-wrapper .button:disabled {
  background-color: gray;
  cursor: not-allowed;
  opacity: 0.6;
}
.container
  .middle-wrapper
  .middle-content
  .buttons-wrapper
  .button:disabled:hover {
  background-color: gray;
}
.container .middle-wrapper .middle-content .buttons-wrapper .button:hover {
  background-color: rgb(177, 81, 177);
}
.container .middle-wrapper .middle-content .buttons-wrapper .button:disabled {
  background-color: gray;
  cursor: not-allowed;
  opacity: 0.6;
}

</style>

