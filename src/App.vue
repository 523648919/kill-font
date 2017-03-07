<template>
    <div id="app">
        <et_head></et_head>
        <router-view></router-view>
        <et_footer></et_footer>
    </div>
</template>

<script>
    import Vue from 'vue'
    import PorductList from './components/PorductList';
    import Head from './components/Head';
    import Footer from './components/Footer'
    export default
    {
        name: 'app',components: {'et_head':Head,'et_main': PorductList,'et_footer':Footer }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 10px;
    }
</style>
