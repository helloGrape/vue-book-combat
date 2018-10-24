Vue.component('pane', {
  name: 'pane',
  template: '<div class="pane" :style="transformStyle" v-show="show" v-if="showPane">' +
  '<slot></slot>' +
  '</div>',
  data: function() {
    return {
      show: true,
      /*showPane: true*/
      transformStyle: {}
    }
  },
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    closeable: {
      type: Boolean,
      default: true
    },
    showPane: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    },
  },
  watch: {
    label() {
      this.updateNav();
    },
    show(val) {
      var _this = this;
      if (val) {
        setTimeout(function(  ) {
          _this.transformStyle = {
            transform: 'translateX(10px)'
          }
        }, 0)
      }else {
        this.transformStyle = {}
      }
    }
  },
  mounted() {
    this.updateNav();
  },
  //不知道为什么无法触发(showPane放在prop和data中结果相同)
  beforeDestroy() {
    console.log('deletePane');
  },
  destroyed() {
    debugger;
    
  }
});