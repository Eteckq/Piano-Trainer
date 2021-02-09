<template>
  <section>
    <input type="radio" id="menu0" value="1" name="tractor" checked="checked" />
    <input type="radio" id="menu1" value="2" name="tractor" />
    <input type="radio" id="menu2" value="3" name="tractor" />
    <input type="radio" id="menu3" value="4" name="tractor" />

    <nav class="rounded-b-full">
      <label @click="changeTab(0)" for="menu0" class=""
        ><fa-icon class="text-5xl" :icon="['fas', 'list']"
      /></label>
      <label @click="changeTab(1)" for="menu1" class=""
        ><fa-icon class="text-5xl" :icon="['fas', 'music']"
      /></label>
      <label @click="changeTab(2)" for="menu2" class=""
        ><fa-icon class="text-5xl" :icon="['fas', 'list']"
      /></label>
      <label @click="changeTab(2)" for="menu3" class=""
        ><fa-icon class="text-5xl" :icon="['fas', 'cog']"
      /></label>
    </nav>
  </section>
</template>

<script>
export default {
  methods: {
    changeTab(tab) {
      this.$emit('changeTab', tab)
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0 none;
  position: relative;
}

section {
  width: 80vw;
  max-width: 40rem;
  min-width: 390px;
  margin: auto;
}

nav {
  background: #fff;
  width: 100%;
  height: 5rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
}
nav:after {
  content: '';
  width: 25%;
  height: 5rem;
  background: #bee3d1;
  position: absolute;
  transition: all 0.5s;
}
input {
  display: none;
}
label {
  width: 25%;
  float: left;
  color: #bee3d1;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  z-index: 2;
  padding-top: 10px;
}
label:hover {
  color: #1e6743;
}
label:before {
  display: block;
  font-size: 3rem;
  line-height: 5rem;
  z-index: 2;
}
#menu0:checked ~ nav [for='menu0'],
#menu1:checked ~ nav [for='menu1'],
#menu2:checked ~ nav [for='menu2'],
#menu3:checked ~ nav [for='menu3'] {
  color: #1e6743;
  font-weight: 600;
}
#menu1:checked ~ nav [for='menu0'] {
}
#menu0:checked ~ nav [for='menu3'] {
}

#menu0:checked ~ nav:after {
  left: 0;
  border-bottom-left-radius: 75px;
  border-bottom-right-radius: 0;
}
#menu1:checked ~ nav:after {
  left: 25%;
  border-top: 0 none;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#menu2:checked ~ nav:after {
  left: 50%;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#menu3:checked ~ nav:after {
  left: 75%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 75px;
}
</style>
