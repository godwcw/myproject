<template>
<div class="header">
    <h2>个人财务信息管理系统</h2>
    <span @click="unlogin">退出系统</span>
</div>
</template>

<script>
export default {
    methods: {
        unlogin() {
            this.$router.push("/home");
        },
    },
}
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    position: relative;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      color: #fff;
    }
    span {
      position: absolute;
      right: 12px;
      text-decoration: underline;
      color: #fff;
      cursor: pointer;
    }
  }
</style>