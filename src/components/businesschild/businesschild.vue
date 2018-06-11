<template>
  <div class="page">
    {{this.id}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:''
    }
  },
  watch:{
    "$route"(n){
      this.id = n.params.id;
    }
  }
}
</script>

<style scoped>
</style>
