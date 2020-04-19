<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <!-- 如果只是在vue.config.js做了配置，每次用到svg文件还需如下操作,比较繁琐 -->
        <svg>
          <use xlink:href="#icon-denglong"></use>
        </svg>

        Home
      </router-link> |
      <router-link to="/about">
        <svg-icon icon-class="yuanxiao"></svg-icon>
      About
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// 若没有做自动导入，则还需引入denglong.svg
import "@/icons/svg/denglong.svg";
export default {
  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
