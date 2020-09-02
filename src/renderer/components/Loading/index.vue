<template>
  <div class="loader-container">
    <div class='loader'>
      <div class='loader_overlay'></div>
      <div class='loader_cogs'>
        <div class='loader_cogs__top'>
          <div class='top_part'></div>
          <div class='top_part'></div>
          <div class='top_part'></div>
          <div class='top_hole'></div>
        </div>
        <div class='loader_cogs__left'>
          <div class='left_part'></div>
          <div class='left_part'></div>
          <div class='left_part'></div>
          <div class='left_hole'></div>
        </div>
        <div class='loader_cogs__bottom'>
          <div class='bottom_part'></div>
          <div class='bottom_part'></div>
          <div class='bottom_part'></div>
          <div class='bottom_hole'></div>
        </div>
        <p>loading</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : ['visible'],
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/scss/base';

.loader-container{
  @include absolute_pos(absolute,0,0,0,0);
  background: rgba($color_fff,0.6);
  z-index: 9999;
}
body .loader {
  @include absolute_pos(absolute, 0, 0, 0, 0);
  height: 500px;
  margin: auto;
  width: 800px;
  z-index:10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
}
body .loader_overlay {
  width: 300px;
  height: 300px;
  background: transparent;
  box-shadow: 0px 0px 0px 1000px rgba(255, 255, 255, 0.67), 0px 0px 19px 0px rgba(0, 0, 0, 0.16) inset;
  border-radius: 100%;
  z-index: -1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
body .loader_cogs {
  z-index: -2;
  width: 200px;
  height: 200px;
  top: -240px !important;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
body .loader_cogs__top {
  position: relative;
  width: 200px;
  height: 200px;
  transform-origin: 100px 100px;
  animation: rotate 10s infinite linear;
}
body .loader_cogs__top div:nth-of-type(1) {
  transform: rotate(30deg);
}
body .loader_cogs__top div:nth-of-type(2) {
  transform: rotate(60deg);
}
body .loader_cogs__top div:nth-of-type(3) {
  transform: rotate(90deg);
}
body .loader_cogs__top div.top_part {
  width: 200px;
  border-radius: 20px;
  position: absolute;
  height: 200px;
  background: $lightGreen;
}
body .loader_cogs__top div.top_hole {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
body .loader_cogs__left {
  position: relative;
  width: 160px;
  -webkit-transform: rotate(16deg);
  transform: rotate(16deg);
  top: 46px;
  -webkit-transform-origin: 80px 80px;
  transform-origin: 80px 80px;
  -webkit-animation: rotate_left 10s .1s infinite reverse linear;
  animation: rotate_left 10s .1s infinite reverse linear;
  left: -48px;
  height: 160px;
}
body .loader_cogs__left div:nth-of-type(1) {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}
body .loader_cogs__left div:nth-of-type(2) {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
}
body .loader_cogs__left div:nth-of-type(3) {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
body .loader_cogs__left div.left_part {
  width: 160px;
  border-radius: 12px;
  position: absolute;
  height: 160px;
  background: $darkGreen;
}
body .loader_cogs__left div.left_hole {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
body .loader_cogs__bottom {
  position: relative;
  width: 120px;
  top: -130px;
  transform-origin: 60px 60px;
  animation: rotate_left 10.2s .4s infinite linear;
  transform: rotate(4deg);
  left: 158px;
  height: 120px;
}
body .loader_cogs__bottom div:nth-of-type(1) {
  transform: rotate(30deg);
}
body .loader_cogs__bottom div:nth-of-type(2) {
  transform: rotate(60deg);
}
body .loader_cogs__bottom div:nth-of-type(3) {
  transform: rotate(90deg);
}
body .loader_cogs__bottom div.bottom_part {
  width: 120px;
  border-radius: 10px;
  position: absolute;
  height: 120px;
  background: $normalGreen;
}
body .loader_cogs__bottom div.bottom_hole {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

/* Animations */
@-webkit-keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotate_left {
  from {
    transform: rotate(16deg);
  }
  to {
    transform: rotate(376deg);
  }
}
@keyframes rotate_right {
  from {
    transform: rotate(4deg);
  }
  to {
    transform: rotate(364deg);
  }
}
</style>
