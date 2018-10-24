Vue.component('listTemplate', {
  template: '<div>' +
  '<div v-if="list.length">' +
  '<template v-for="(item, index) in list">' +
  '<div class="list-item">' +
  '<span>{{item.name + \':\'}}</span>' +
  '<div class="list-msg">' +
  '<p>{{item.message}}</p>' +
  '<a class="list-delete" @click.prevent="handlerDelete(index)">删除</a>' +
  '<a class="list-reply" @click.prevent="handlerReply(index)">回复</a>' +
  '</div>' +
  '</div>' +
  '</template>' +
  '</div>' +
  '<div class="list-nothing" v-else>留言列表为空</div>' +
  '</div>',
  props: {
    list: {
      type: Array,
      default: function(  ) {
        return [];
      }
    }
  },
  methods: {
    handleReply: function( index ) {
      this.$emit('reply', index);
    },
    handlerDelete: function( index ) {
      this.$emit('delete', index);
    }
  }
})