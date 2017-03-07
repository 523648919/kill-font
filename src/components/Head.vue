<template>
  <div class="head">
      <div>
          <p>
              <router-link to="/index">产品列表</router-link>
              <router-link to="/order">我的订单</router-link>
          </p>
      </div>
      <div><h2 style="text-align: center;font-weight: bold">欢迎使用秒杀系统公测平台 <span class="label label-primary">Beta</span></h2><br/></div>
  </div>
</template>

<script>

export default {
  name: 'head',
  data () {
    return {
      msg: 'Hi OF.'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
