<template>
  <div>
    <!-- <button @click="onClickScreen">M</button> -->
    <button id="screen" :class="state" @click="onClickScreen">
      {{ message }}
    </button>
    <!-- v-show 와 if 의 차이 소스상에서 태그는 살아있다.
         div 대신 template 사용할 수 있는데 v-show 사용 불가...
    -->
    <template v-if="result.length">
      <div>평균 시간: {{ average }}ms</div>
      <button @click="onReset">리셋</button>
      <!-- </div> -->
    </template>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
  components: {},
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요',
    };
  },
  // data 와 차이점과 사용하는 이유?
  // 데이터를 가공해서 사용할때..
  // 캐싱되서 새로운 화면을 보여주려고 성능상의 이유로...
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    },
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === 'waiting') {
        console.log('waiting');
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요';
        timeout = setTimeout(() => {
          this.state = 'now';
          this.message = '클릭대기해라';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); // 2 - 3
      } else if (this.state === 'ready') {
        clearTimeout(timeout);
        this.state = 'waiting';
        this.message = '기다리라고 했잖아';
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.message = '지금 클릭해라';
        this.result.push(endTime - startTime);
      }
    },
  },
};
</script>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: white;
}
#screen.now {
  background-color: greenyellow;
}
</style>
