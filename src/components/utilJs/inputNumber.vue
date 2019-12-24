<template>
  <div>
    <a-icon type="caret-left" v-show="!disabled" slot="prefix" @click="sub"/>
    <a-input-number
      :value="number"
      :min="min"
      :max="max"
      :formatter="value => `${value}%`"
      :parser="value => value.replace('%', '')"
      :style="{width}"
      :disabled="disabled"
      @change="change"
    />
    <a-icon type="caret-right" v-show="!disabled" slot="suffix" @click="add"/>
  </div>
</template>

<script>
  export default {
    props: [ 'value','width','disabled'],
    inject:["instance"],
    data () {
      return {
        max:100,
        min:0,
        number: 0
      }
    },
    watch:{
      value:{
        handler(val){
          this.number = parseFloat(val);
        },
        immediate: true
      },
      number(val){
        // if (this.number > this.max) this.number = this.max;
        // if (this.number < this.min) this.number = this.min;
        this.$emit("input",val);
      }
    },
    methods: {
      change(val){
         if(!val)val=0;
         this.number = val;
        this.$emit("input",val);
        this.instance.isUserCustom = true;
      },
      sub(){
        if ((this.number-1) > this.min){
          this.number = parseFloat(this.number-1).toFixed(2);
          this.instance.isUserCustom = true;
        }
      },
      add(){
        if ((this.number+1) <= this.max){
          this.number =  parseFloat(this.number+1).toFixed(2);
          this.instance.isUserCustom = true;
        }
      }
    }
  }
</script>
<style scoped>
  .text{text-align: center;}
</style>
