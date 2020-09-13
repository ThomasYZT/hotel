<template>
  <div class="page-container">
    <div class="page-header">

    </div>
    <div class="page-content">
<!--      <table-com :config="">-->

<!--      </table-com>-->
    </div>
  </div>
</template>

<script>
import ajax from '../../../assets/api';
export default {
  methods : {
    getList () {
      ajax.get('menuAllList').then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getList()
  }
};
</script>

<style scoped>

</style>
