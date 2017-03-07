<template>
    <div id="porduct_list">
        <div class="panel panel-success" style="text-align: left">
            <!-- Default panel contents -->
            <div class="panel-heading"><b style="font-size: 16px">{{title}} <span class="badge">{{message}}</span></b>
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>产品</th>
                        <th>产品数量</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>状态</th>
                        <th>详情</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr v-for="data in list">
                        <td>{{data.name}}</td>
                        <td>{{data.number}}(台)</td>
                        <td>{{data.start_date}}</td>
                        <td>{{data.end_time}}</td>
                        <td v-if="data.number <= 0">已结束</td>
                        <td  v-else>进行中 </td>
                        <td>
                            <router-link :to="{ path: 'detail', query:{ id:data.seckill_id }}"  class="label label-info">查看</router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
  //import layer from 'layer'
  import Vue from 'vue'
    export default
    {
        name: 'PorductList',
                data()
        {
            return {  list: [],
                title: '秒杀产品列表', message: "Hi.OF!"}
        }  ,
        mounted()
        {
            var _self = this;
            var lay ;
            $.ajax({
                type: 'POST',
                url: Vue.config.sys.ip + 'querySecKillList.json',
                data: '',
                timeout: Vue.config.sys.timeout,
                beforeSend: function (XHR) {
                    lay = layer.msg('加载中', {
                        icon: 16,
                       offset: '200px'
                    });
                }, success: function (data) {
                     layer.close(lay);
                    if (data.retCode == '0000') {
                        layer.msg('加载完成', {icon: 1,offset: '200px',time: 1000});
                        _self.list = data.list;
                    } else {
                        layer.msg('加载错误:'+data, {icon: 2,offset: '200px',time: 3000});
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.info(XMLHttpRequest.status);
                    console.info(XMLHttpRequest.readyState);
                    console.info(textStatus);
                },
                complete: function (XHR, TS) {
                    console.info("处理成功。");
                }
            });
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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


</style>
