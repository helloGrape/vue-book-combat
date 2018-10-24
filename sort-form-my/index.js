var app = new Vue({
  el: '#app',
  data: {
    columns: [
      {
        title: '姓名',
        key: 'name',
        width: '100px'
      },
      {
        title: '年龄',
        key: 'age',
        sortable: true
      },
      {
        title: '出生日期',
        key: 'birthday',
        sortable: true
      },
      {
        title: '地址',
        key: 'address'
      }
    ],
    data: [
      {
        name: '王小明',
        age: 18,
        birthday: '1999-02-21',
        address: '北京市朝阳区芍药居'
      },
      {
        name: '张小刚',
        age: 25,
        birthday: '1992-01-23',
        address: '北京市海定区'
      },
      {
        name: '李晓红',
        age: 30,
        birthday: '1987-08-01',
        address: '上海市浦东区'
      },
      {
        name: '周晓伟',
        age: 26,
        birthday: '1991-10-11',
        address: '深圳市南山区'
      },
    ]
  },
  methods: {
    handleAddData: function(  ) {
      this.data.push({
        name: '刘晓伟',
        age: 19,
        birthday: '1998-05-30',
        address: '北京市东城区'
      })
    }
  }
})