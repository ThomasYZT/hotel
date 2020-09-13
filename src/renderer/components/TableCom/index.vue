<template>
  <div class="table-wrapper">
    <el-table :data="data"
              :lazy="lazy"
              :load="loadFn"
              :indent="indent"
              :tree-props="treeProps"
              style="width: 100%">
      <slot>
        <template v-for="(item, index) in config" >
          <el-table-column :key="index"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width || ''" />
        </template>
      </slot>
    </el-table>

    <div class="pagination-wrapper">
      <el-pagination @size-change="sizeChange"
                     @current-change="getList"
                     :current-page.sync="curPage"
                     :page-size.sync="pageSize"
                     :page-sizes="[10, 20, 30]"
                     layout="全部, 页码, prev, pager, next, jumper"
                     :total="400" />
    </div>
  </div>
</template>

<script>
export default {
  name : 'TableCom',
  props : {
    hasPage : {
      type : Boolean,
      default : true
    },
    config : {
      type : Array,
      default () {
        return [];
      }
    },
    data : {
      type : Array,
      default () {
        return [];
      }
    },
    pageNum : {
      type : Number,
      default : 1
    },
    pageSize : {
      type : Number,
      default : 10
    },
    getList : {
      type : Function,
      default : () => {}
    },
    treeProps : {
      type : Object,
      default () {
        return { children : 'children', hasChildren : 'hasChildren' };
      }
    },
    lazy : {
      type : Boolean,
      default : false
    },
    loadFn : {
      type : Function,
      default : () => {}
    },
    indent : {
      type : Number,
      default : 16
    }
  },
  data () {
    return {
      curPage : 1
    };
  },
  methods : {
    sizeChange (val) {
      this.$emit('pageSize:update', val);
    }
  }
};
</script>

<style scoped>

</style>
