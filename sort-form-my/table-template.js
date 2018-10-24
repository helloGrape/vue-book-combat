Vue.component('vTableTemplate', {
  template: '<table>' +
  '<colgroup><col v-for="(item, index) in currentColumns" :width="item.width ? item.width : \'auto\'">' +
  '</colgroup>' +
  '<thead>' +
  '<template v-for="(item, index) in currentColumns"><th>' +
  '<span>{{item.title}}</span>' +
  '<a v-if="item.sortable" :class="{\'on\': item._sortType === \'asc\'}" @click.stop="handleSortByAsc(index)">↑</a>' +
  '<a v-if="item.sortable" :class="{\'on\': item._sortType === \'desc\'}" @click.stop="handleSortByDesc(index)">↓</a>' +
  '</th></template>' +
  '</thead><tbody><tr v-for="(item, index) in currentData">' +
  '<template v-for="(column, key) in currentColumns">' +
  '<td>{{item[column[\'key\']]}}</td></template>' +
  '</tr></tbody></table>',
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentColumns: [],
      currentData: []
    }
  },
  methods: {
    makeColumns: function(  ) {
      this.currentColumns = this.columns.map(function( col, index ) {
        // 标识当前列的排序状态
        col._sortType = 'narmal';
        // 标识当前列在数组中的索引
        col._index = index;
        return col;
      });
    },
    makeData: function(  ) {
      this.currentData = this.data.map(function( row, index ) {
        row._index = index;
        return row;
      })
    },
    handleSortByAsc: function( index ) {
      var key = this.currentColumns[index].key;
      this.currentColumns.forEach(function( col ) {
        col._sortType = 'normal';
      });
      
      this.currentColumns[index]._sortType = 'asc';
      this.currentData.sort(function( a, b ) {
        return a[key] > b[key] ? 1 : -1;
      })
    },
    handleSortByDesc: function( index ) {
      var key = this.currentColumns[index].key;
      this.currentColumns.forEach(function( col ) {
        col._sortType = 'normal';
      });
      
      this.currentColumns[index]._sortType = 'desc';
      this.currentData.sort(function( a, b ) {
        return a[key] > b[key] ? -1 : 1;
      })
    }
  },
  mounted: function(  ) {
    this.makeColumns();
    this.makeData();
  },
  watch: {
    data: function(  ) {
      this.makeData();
      var sortedColumn = this.currentColumns.filter(function( col ) {
        return col._sortType !== 'normal';
      });
      
      if (sortedColumn.length > 0) {
        if (sortedColumn[0]._sortType === 'asc') {
          this.handleSortByAsc(sortedColumn[0]._index);
        }else {
          this.handleSortByDesc(sortedColumn[0]._index)
        }
      }
    }
  }
});