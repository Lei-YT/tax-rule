<template>
  <div v-cloak>
    <Poptip @on-popper-show="onPopperShow" @on-popper-hide="onPopperHide" padding="0" :transfer="transfer" :trigger="trigger" :placement="position">
        <p><slot name="button"><a href="javascript:;" style="margin-right:5px">添加类型</a></slot></p>
        <div slot="content" style="max-height:400px;overflow-y:auto">
          <typeList v-if="type=='all'" :items="allList" />
          <typeList v-if="type=='var'" :items="varList" />
        </div>
      </Poptip>
  </div>
</template>

<script>
import Bus from "@/libs/bus.js";
import typeList from "@/components/type-list.vue";
export default {
  components: { typeList },
  props:{
    type:{
      type: String,
      default:'all'
    },
    position:{
      type: String,
      default:'right-start'
    },
    transfer:{
      type: Boolean,
      default:false
    },
    trigger:{
      type: String,
      default:'hover'
    }
  },
  data() {
    return {
      allList:this.$store.state.funcData,
      varList:this.$store.state.varData
    };
  },
  computed: {},

  mounted() {
    var _this = this;
    setTimeout(function(){
      _this.allList = _this.$store.state.funcData
      _this.varList = _this.$store.state.varData
    },1000)
  },
  methods: {
    onPopperShow() {
      var _this = this;
      Bus.$on("getTypeValue", data => {
        _this.$emit('on-change',data)
      });
    },
    onPopperHide() {
      Bus.$off("getTypeValue");
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>