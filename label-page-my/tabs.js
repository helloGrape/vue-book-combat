Vue.component('tabs', {
  template: '<div class="tabs">' +
  '<div class="tabs-bar">' +
  '<div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">' +
  '<div class="tabsx" v-show="item.closeable" @click.stop="handleClose(index)">x</div>' +
  '{{item.label}}</div>' +
  '</div>' +
  '<div class="tabs-content">' +
  '<slot></slot></div></div>',
  data: function() {
    return {
      navList: [],
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: [String, Number]
    }
  },
  methods: {
    tabCls(item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    handleChange(index) {
      var nav = this.navList[index];
      var name = nav.name;
      
      this.currentValue = name;
      this.$emit('input', name);
      
      this.$emit('on-click', name);
    },
    handleClose(index) {
      var nav = this.navList[index];
      var name = nav.name;
      var _this = this;
      var currPane = this.$children.findIndex(function( item ) {
        var flag = item.$options.name === 'pane' && item.name === name;
        if (flag) {
          if (_this.currentValue === name) {
            _this.currentValue = _this.navList[index + 1] ? _this.navList[index + 1].name : (_this.navList[0] ? _this.navList.name : '');
          }
        }
        return item.$options.name === 'pane' && item.name === name;
      });
      this.$children[currPane].showPane = false;
      // 设置为false后，该组件并未在$children中消失，下轮事件循环结束后依然存在
      this.$children.splice(currPane, 1);
      this.updateNav();
      this.$emit('on-delete-pane', name);
    },
    getTabs() {
      return this.$children.filter(function( item ) {
        return item.$options.name === 'pane';
      })
    },
    updateNav() {
      this.navList = [];
      var _this = this;
      
      this.getTabs().forEach(function( pane, index ) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index,
          closeable: pane.closeable
        });
        if (!pane.name) pane.name = index;
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index;
          }
        }
      });
      
      this.updateStatus();
    },
    updateStatus() {
      var tabs = this.getTabs();
      var _this = this;
      
      tabs.forEach(function( tab ) {
        return tab.show = tab.name === _this.currentValue;
      })
    }
  },
  watch: {
    value: function( newValue ) {
      this.currentValue = newValue;
    },
    currentValue: function( newValue ) {
      this.updateStatus();
    }
  }
});