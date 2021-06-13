<template>
  <div>
    <div id="git">
      <a href="https://github.com/Eteckq/Piano-Trainer"
        ><img src="~/static/github.png" height="50" width="50"
      /></a>
    </div>
    <MenuTab />
    <Nuxt />
    <Piano class="fixed bottom-0 inset-x-0" />
  </div>
</template>

<script>
export default {
  created() {},
}
</script>

<style>
#git {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(243, 243, 243);
  color: black;
  border-bottom-left-radius: 40px;
  padding: 2px 8px;
}
</style>
