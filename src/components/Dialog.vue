<template>
    <div class="modal" v-show="show" transition="fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <!--头部-->
                <div class="modal-header">
                    <slot name="header">
                        <p class="title">{{modal.title}}</p>
                    </slot>
                    <a v-touch:tap="close(0)" class="close" href="javascript:void(0)"></a>
                </div>
                <!--内容区域-->
                <div class="modal-body">
                    <slot name="body">
                        <p class="notice">{{modal.text}}</p>
                    </slot>
                </div>
                <!--尾部,操作按钮-->
                <div class="modal-footer">
                    <slot name="button">
                        <a v-if="modal.showCancelButton" href="javascript:void(0)" class="button {{modal.cancelButtonClass}}" v-touch:tap="close(1)">{{modal.cancelButtonText}}</a>
                        <a v-if="modal.showConfirmButton" href="javascript:void(0)" class="button {{modal.confirmButtonClass}}" v-touch:tap="submit">{{modal.confirmButtonText}}</a>
                    </slot>
                </div>
            </div>
        </div>
    </div>
    <div v-show="show" class="modal-backup" transition="fade"></div>
</template>

<script>
    var config= {};
    config.sys = {
        ip: 'http://127.0.0.1:8085/kill/',
        timeout: 60 * 1000
    };
export default {
  name: 'PorductList',
          data ()  {
            return {  list:[],
                title: '我的订单列表',message:"Hi.OF!"}
        },mounted(){
                var _self = this;
                $.ajax({
                    type: 'POST',
                    url: config.sys.ip + 'queryOrderList.json',
                    data: '',
                    timeout: config.sys.timeout,
                    beforeSend: function (XHR) {
                        console.info("处理中。。。");
                    }, success: function (data) {
                        if (data.retCode == '0000') {
                            _self.list = data.list;
                        } else {
                            alert(data)
                        }
                    }, complete: function (XHR, TS) {
                        console.info("处理成功。");
                    }
                });
            }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1001;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        overflow: scroll;
        margin: 30/@rate auto;
    }
    .modal-dialog {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%,0);
        width: 690/@rate;
        padding: 50/@rate 40/@rate;
        background: #fff;
    }
    .modal-backup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.5);
    }

</style>
