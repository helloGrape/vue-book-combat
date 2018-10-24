<template>
  <div>
    <h1>首页</h1>
    {{ count }}
    <button @click="handleIncrementMore">+5</button>
    <button @click="handleDecrease">-1</button>
    <button @click="handleActionDecrease">action -1</button>
    <button @click="handleAsyncIncrement">async +1</button>
    <button @click="addList">list push</button>
    <div>{{list}}</div>
    <div>{{listCount}}</div>
    <div>
      随机增加：
      <Counter :number="number"></Counter>
    </div>
    <router-link to="/about" tag="li" replace>跳转到about</router-link>
  </div>
</template>

<script>
  import Counter from './counter.vue';

  export default {
    name:"index",
    components: { Counter },
    data() {
      return {
        number: 0
      }
    },
    created() {
      this.$bus.on('add', this.handleAddRandom);
    },
    computed: {
      count() {
        return this.$store.state.count.count;
      },
      list() {
        return this.$store.getters.filteredList;
      },
      listCount() {
        return this.$store.getters.listCount;
      }
    },
    methods: {
      handleIncrementMore() {
        this.$store.commit('increment', 5);
        //也可以用包含type属性的对象
        /*this.$store.commit({
          type: 'increment',
          count: 5
        });*/
      },
      handleDecrease() {
        this.$store.commit('decrease');
      },
      handleActionDecrease() {
        this.$store.dispatch('decrease');
      },
      handleAsyncIncrement() {
        this.$store.dispatch('asyncIncrement').then(() => {
          console.log(this.$store.state.count);
        })
      },
      addList() {
        this.$store.commit('addList');
      },
      handleAddRandom(num) {
        this.number += num;
      }
    },
    beforeDestroy() {
      console.log('beforeDestory');
      this.$bus.off('add', this.handleAddRandom);
    }
  }
</script>

<style scoped>

</style>