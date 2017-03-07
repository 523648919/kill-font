<template>
    <div class="detail">
        <div class="panel panel-danger" id="order" style="text-align: left">
            <!-- Default panel contents -->
            <div class="panel-heading"><b style="font-size: 16px">产品列表详情 </b></div>
            <div class="panel-body">
                <p>产品:<span v-text="data.name"></span></p>

                <p>产品数量:<span v-text="data.number"></span>(台)</p>

                <p>开始时间:<span v-text="data.start_date"></span></p>

                <p>倒计时：<span id="timer" class="text-primary" v-text="send_date"></span></p>
                <p>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">手机号:</div>
                        <input class="form-control" type="number" maxlength="11" @input="change($event)"  placeholder="请输入手机号" size="30" style="width:130px"><code style="line-height: 27px;margin-left: 5px;display: inline-block;" :class="cllass_css">*{{msg}}</code></div>
                </div>
                </p>
                <p>
                    <button id="butt" style="display: none" type="button" class="btn btn-warning">未开始</button>
                </p>
                <p>
                    <button id="end" style="display: none" type="button" class="btn btn-primary ">已结束</button>
                </p>
                <p>
                    <button type="button" id="submit" style="display: none" class="btn btn-danger" v-on:click="kill">立即抢购</button>
                    </a></p>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    var interval = 1000;
    var timer;
    export default
    {
        name: 'detail',
        data(){
            return {  data: {},msg:'',cllass_css:'text-danger',mobile:'',
                title: '我的订单列表', message: "Hi.OF!",send_date:""}
        },
        mounted(){
            var id = this.$route.query.id;
            var _self = this;
             var lay ;
            $.ajax({
                type: 'POST',
                url: Vue.config.sys.ip + 'detail.json',
                data: {'id': id},
                timeout: Vue.config.sys.timeout,
                beforeSend: function (XHR) {
                    lay = layer.msg('加载中', {
                        icon: 16,offset: '200px'
                    });
                }, success: function (data) {
                    layer.close(lay);
                    if (data.retCode == '0000') {
                        layer.msg('加载完成', {icon: 1,offset: '200px',time: 1000});
                        _self.data = data.data;

                        var t = _self.data.start_time.split(",");
                          timer =window.setInterval(function(){
                           _self.showData(t[0],t[1],t[2],t[3],t[4],t[5],'timer');
                        }, interval);
                    } else {
                        layer.msg('加载错误:'+data, {icon: 2,offset: '200px',time: 2000});
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.info(XMLHttpRequest.status);
                    console.info(XMLHttpRequest.readyState);
                    console.info(textStatus);
                }
            });
        },methods:{
        endData:function(year,month,day,h,m,s,ayear,amonth,aday,ah,am,as){
            var now = new Date(ayear, amonth-1, aday,ah,am,as);
            var endDate = new Date(year, month-1, day,h,m,s);
            var leftTime=endDate.getTime()-now.getTime();
            if(leftTime <=0){
                this.send_date ="已结束" ;
                $("#submit").css("display"," block");
                return false;
            }else{
                return true;
            }
        },
        showData:function(year,month,day,h,m,s,divname){
            var now = new Date();
            var endDate = new Date(year, month-1, day,h,m,s);
            var leftTime=endDate.getTime()-now.getTime();
            var leftsecond = parseInt(leftTime/1000);
            var day1=Math.floor(leftsecond/(60*60*24));
            var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
            var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
            var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
            this.send_date = day1+'天'+hour+'小时'+minute+'分'+second+'秒';
            if(leftTime <=0){
                clearInterval(timer);
                this.send_date ="已结束" ;
                $("#submit").css("display"," block");
            }else {
               this.class="text-primary";
                $("#butt").css("display","block");
            }
            if(leftTime <=0 && this.data.number <= 0){
                $("#submit").css("display"," none");
                $("#end").css("display","block");
                $("#end").attr("disabled","disabled");
            }
        },kill:function(){
            if(!(/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.mobile))){
                this.msg="不是正确的手机号";
                return false;
            }

            var lay ;
            $.ajax({
                type: 'POST',
                url: Vue.config.sys.ip + 'kill.json',
                data: {'id': this.data.seckill_id,"mobile":this.mobile},
                timeout: Vue.config.sys.timeout,
                beforeSend: function (XHR) {
                    lay = layer.msg('加载中', {
                        icon: 16,offset: '200px'
                    });
                }, success: function (data) {
                    layer.close(lay);
                    if (data.retCode == '0000') {
                        layer.msg('抢购成功，查看我的订单!', {icon: 1,offset: '200px',time: 1000});
                        console.info("0000:"+data.retMsg);
                    } else {
                        layer.msg(data.retMsg+':'+data.retCode, {icon: 2,offset: '200px',time: 2000});
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    layer.msg('处理超时,请稍后再试!', {icon: 2,offset: '200px',time: 2000});
                }
            });
        },change:function(e){
           this.mobile= e.target.value
            if(!(/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.mobile))){
                this.msg="不是正确的手机号";
            }else{
                this.cllass_css="text-primary";
                this.msg="正确";
            }
        }
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
