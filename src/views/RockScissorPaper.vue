<template>
  <div>
    <!-- <div id="computer" :style="computedStyle"> -->
    <div id="computer" :style="computedStyle"></div>
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }} 점</div>
  </div>
</template>

<script>
const rspCord = {
  바위: '0px',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = function (imgCoord) {
  return Object.entries(rspCord).find((v) => v[1] === imgCoord)[0];
};

// imgCord
// const computerChoice = (imgCord) => {
//   return Object.entries(rspCord).find( (v) => {
//     return v[1] === imgCord;
//   });
//   // imgCord
// };

let interval = null;
export default {
  components: {},
  data() {
    return {
      imgCord: rspCord.바위,
      result: '',
      score: 0,
    };
  },
  computed: {
    computedStyle() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCord} 0`,
      };
    },
  },
  mounted() {
    this.changeHand();
  },
  methods: {
    onClickButton(choice) {
      clearInterval(interval);
      const myScore = scores[choice];
      // console.log(cpuSore);

      const cpuSore = scores[computerChoice(this.imgCord)];
      console.log(cpuSore);
      const diff = myScore - cpuSore;
      console.log(diff);
      if (diff === 0) {
        this.result = '비겼습니다.';
      } else if ([-1, 2].includes(diff)) {
        this.result = '이겼습니다.';
        this.score += 0;
      } else {
        this.result = '졌습니다.';
        this.score += -1;
      }
      setTimeout(() => {
        this.changeHand();
      }, 2000);
    },
    changeHand() {
      interval = setInterval(() => {
        if (this.imgCord === rspCord.바위) {
          this.imgCord = rspCord.가위;
        } else if (this.imgCord === rspCord.가위) {
          this.imgCord = rspCord.보;
        } else if (this.imgCord === rspCord.보) {
          this.imgCord = rspCord.바위;
        }
      }, 100);
    },
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
