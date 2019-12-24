<!-- modal模板，内置slot，可随意替换，直接引用，不需要再新建页面 -->
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close" v-show="show">
      <div class="modal" @click.stop role="dialog" aria-labelledby="modalTile" arial-describedby="modalDescription">
        <div class="modal-header" id="modalTitle">
          <slot name="header">
              {{title?title:"modal"}}
              <a-icon type="close-circle" class="modal-header-title" :style="{ fontSize: '16px', color: '#111111'}" @click="close" aria-label="Close modal"/>
          </slot>
        </div>
        <div class="modal-body" id="modalDescription">
          <div>
              <slot name="body"></slot>
          </div>

        </div>
        <div class="modal-footer">
          <slot name="footer">
            <el-button size="mini" type="info" round class="btn-close" @click="close" v-if="showCancle">{{cancleText?cancleText : '取消'}}</el-button>
            <el-button size="mini" type="danger" round class="btn-confirm" @click="confirm" v-if="showConfirm">{{confirmText ? confirmText : '确定'}}</el-button>
            <!-- <button type="button" class="btn-green" @click="close" aria-label="Close modal">关闭</button> -->
          </slot>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
 import '@/style/modal.css'
export default {
   name: 'modal',
    // props: ['show'],
    props:{
      typeValue: {
          type: String,
          default: ""
      },
      title: {
          type: String,
          default: "modal"
      },
      // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    // 是否显示确认按钮
    showConfirm: {
        type: Boolean,
        default: false
    },
    // 是否显示取消按钮
    showCancle: {
        type: Boolean,
        default: false
    },
    // 确认按钮文字
    confirmText: {
        type: String,
        default: '确认'
    },
    // 取消按钮文字
    cancleText: {
        type: String,
        default: '取消'
    }
  },
    data () {
       return {

        }
      },
      methods: {
        // 确定按钮事件
        confirm:function() {
            this.$emit('confirm',this.typeValue);
        },
        close: function () {
          this.$emit('close');

        },

      },
      beforeDestroy () {

      }
    }


</script>
