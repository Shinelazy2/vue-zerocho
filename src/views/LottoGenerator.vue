<template>
  <div>
    <div>당첨 숫자</div>

    <div id="결과창">
      <lotto-ball :key="ball" v-for="ball in winBalls" :number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한 번 더 !!!</button>
  </div>
</template>

<script>
import LottoBallVue from '@/components/LottoBall.vue';

function getWinNumbers() {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const timeouts = [];
export default {
  components: {
    'lotto-ball': LottoBallVue,
  },
  data() {
    return {
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    };
  },
  setup() {},
  created() {},
  mounted() {
    this.showBalls();
  },
  unmounted() {},
  methods: {
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
      this.showBalls();
    },
    showBalls() {
      const bonusIndex = 6;

      for (let i = 0; i < this.winNumbers.length - 1; i += 1) {
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      timeouts[bonusIndex] = setTimeout(() => {
        this.bonus = this.winNumbers[bonusIndex];
        this.redo = true;
      }, (bonusIndex + 1) * 1000);
    },
  },
  beforeDestroy() {
    timeouts.forEach((t) => {
      clearInterval(t);
    });
  },
  watch: {
    winBalls(value, oldValue) {
      if (value.length === 0) {
        this.showBalls();
      }
      console.log(oldValue);
    },
  },
};
</script>
