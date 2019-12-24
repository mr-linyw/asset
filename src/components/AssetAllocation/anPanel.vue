<template>
    <div class="anPanel">
      <div class="panelTitle"><span>{{panelTitle}}</span></div>
      <div class="panelContent">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: "anPanel",
        props:{
          panelTitle:{
            type: String,
            default: "标题",
            required: true
          }
        }
    }
</script>

<style scoped>
.anPanel{
  width: 100%;
  height: 100%;
}
.panelTitle{
  height: 28px;
  width: 100%;
  background-color: #e1e1e1;
  display: flex;
  align-items: center;
  border-left: solid 3px #CD3833;
  box-sizing: border-box;
}
  .panelContent{
    width: 100%;
    height: calc(100% - 28px);
  }
  .panelTitle span{
    margin-left: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #444;
  }
</style>
