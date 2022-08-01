<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value" />
      <button type="submit">입력</button>
    </form>

    <div>시도 : {{ tries.length }}</div>
    <ul>
      <li :key="t" v-for="t in tries">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    // const chosen = candidates.splice(Math.floor(Math.random() * (9 - i), 1)[0]);
    const chosen = candidates[Math.floor(Math.random() * (9 - i))];
    // array.push(`chosen -> ${chosen}`);
    array.push(chosen);
  }
  console.log(`array -> ${array}`);
  return array;
};
export default {
  data() {
    return {
      answer: getNumbers(), // ex) [ 1,5,3,4]
      tries: [],
      value: '',
      result: '',
    };
  },
  methods: {
    onSubmitForm() {
      if (this.value === this.answer.join('')) {
        console.log(`thish.answer -> ${this.answer}`);
        this.tries.push({
          try: this.value,
          result: '홈런',
        });
        this.result = '홈런';
        alert('정답입니다!. 게임을 다시 실행합니다. ');
        this.value = '';
        this.answer = getNumbers();
        this.tries = [];
        // this.$refs.anwer.focus();
      } else {
        //
        if (this.tries.length >= 9) {
          this.result = `10번 틀림 답은 ${this.answer.join(',')}`;
          alert('restart');
          this.value = '';
          this.answer = getNumbers();
          this.tries = [];
          // this.$refs.answer.focus();
        }
        let strike = 0;
        let ball = 0;
        const answerArray = this.value.split('').map((v) => parseInt(v, 10));
        console.log(`시도 : ${answerArray}`);
        console.log(`정답 : ${this.answer}`);

        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.answer[i]) {
            // 숫자 자리수 모두 정답
            // strike += 1;
            strike += 1;
          } else if (this.answer.includes(answerArray[i])) {
            // 숫자만 정답
            ball += 1;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike} stike, ${ball} ball`,
        });
      }
      this.value = '';
      // this.$refs.anwer.focus();
    },
  },
};
</script>
