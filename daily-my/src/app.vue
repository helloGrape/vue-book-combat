<template>
  <div class="daily">
    <div class="daily-menu">
      <div class="daily-menu-item"
           :class="{on: type === 'recommend'}"
           @click="handleToRecommend">每日推荐</div>
      <div class="daily-menu-item"
           :class="{on: type === 'daily'}"
           @click="showThemes = !showThemes">主题日报</div>
      <ul v-show="showThemes">
        <li v-for="item in themes">
          <a :class="{on: item.id === themeId && type === 'daily'}"
             @click="handleToTheme(item.id)">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="daily-list" ref="list" @scroll="handleScroll">
      <template v-if="type === 'recommend'">
        <div v-for="list in recommendList">
          <div class="daily-date">{{formatDay(list.date)}}</div>
          <Item v-for="item in list.stories"
                :data="item"
                :key="item.id"
                @click.native="handleClick(item.id)"></Item>
        </div>
      </template>
      <template v-if="type === 'daily'">
        <Item v-for="item in list"
              :data="item"
              :key="item.id"
              @click.native="handleClick(item.id)"></Item>
      </template>
    </div>
    <daily-article :id="articleId"></daily-article>
  </div>
</template>

<script>
  import $ from './libs/util';
  import Item from './components/item.vue';
  import dailyArticle from './components/daily-article.vue';
  export default {
    name:"app",
    components: {Item, dailyArticle},
    methods: {
      getThemes () {
        $.ajax.get('themes').then(res => {
          this.themes = res.others;
        })
      },
      handleToTheme(id) {
        this.type = 'daily';
        this.themeId = id;
        // 清空中间栏的数据
        this.list = [];
        $.ajax.get('theme/' + id).then(res => {
          // 过滤掉类型为1的文章，该类型下的文章为空
          this.list = res.stories.filter(item => item.type !== 1);
        })
      },
      handleToRecommend() {
        this.type = 'recommend';
        this.recommendList = [];
        this.dailyTime = $.getTodayTime();
        this.getRecommendList();
      },
      getRecommendList() {
        this.isLoading = true;
        const prevDay = $.prevDay(this.dailyTime + 24 * 60 * 60 * 1000);
        $.ajax.get('news/before/' + prevDay).then(res => {
          this.recommendList.push(res);
          this.isLoading = false;
        })
      },
      // 转换为带汉子的月日
      formatDay (date) {
        let month = date.substr(4, 2);
        let day = date.substr(6, 2);
        if (month.substr(0, 1) === '0') month = month.substr(1, 1);
        if (day.substr(0, 1) === '0') day = day.substr(1, 1);
        return `${month} 月 ${day} 日`;
      },
      handleScroll() {
        const $list = this.$refs.list;
        //监听中栏的滚动事件
        if (this.type === 'daily' || this.isLoading) return;
        // 已经滚动到距离加页面的高度等于整个内容区域高度时，视为接触底部
        if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
          // 时间相对减少一天
          this.dailyTime -= 24 * 60 * 60 * 1000;
          this.getRecommendList();
        }
      },
      handleClick(id) {
        this.articleId = id;
      }
    },
    data() {
      return {
        themes: [],
        showThemes: false,
        type: 'recommend',
        list: [],
        themeId: 0,
        recommendList: [],
        isLoading: false,
        dailyTime: $.getTodayTime(), //今天0点的时间戳
        articleId: 0
      }
    },
    mounted() {
      this.getThemes();
      this.getRecommendList();
      // 获取DOM
      //const $list = this.$refs.list;
      //监听中栏的滚动事件
      /*$list.addEventListener('scroll', () => {
        if (this.type === 'daily' || this.isLoading) return;
        // 已经滚动到距离加页面的高度等于整个内容区域高度时，视为接触底部
        if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
          // 时间相对减少一天
          this.dailyTime -= 24 * 60 * 60 * 1000;
          this.getRecommendList();
        }
      })*/
    }
  }
</script>

<style scoped>

</style>