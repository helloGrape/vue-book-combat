Vue.component('vTable', {
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
  render: function( h ) {
    var ths = [];
    var trs = [];
    var cols = [];
    var _this = this;
    
    this.currentColumns.forEach(function( col, index ) {
      if (col.width) {
        cols.push(h('col', {
          domProps: {
            width: col.width
          }
        }))
      }else {
        cols.push(h('col'))
      }
    })
    
    this.currentData.forEach(function( row ) {
      var tds = [];
      _this.currentColumns.forEach(function( cell ) {
        tds.push(h('td', row[cell.key]))
      });
      trs.push(h('tr', tds));
    });
    
    this.currentColumns.forEach(function( col, index ) {
      if (col.sortable) {
        ths.push(h('th', [
          h('span', col.title),
          // 升序
          h('a', {
            class: {
              on: col._sortType === 'asc'
            },
            on: {
              click: function(  ) {
                _this.handleSortByAsc(index)
              }
            }
          }, '↑'),
          // 降低
          h('a', {
            class: {
              on: col._sortType === 'desc'
            },
            on: {
              click: function(  ) {
                _this.handleSortByDesc(index)
              }
            }
          }, '↓')
        ]))
      }else {
        ths.push(h('th', col.title))
      }
    })
    
    return h('table', [
      h('colgroup', cols),
      h('thead', [
        h('tr', ths)
      ]),
      h('tbody', trs)
    ])
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