<template>
  <section>
    <input id="menu0" type="radio" value="1" name="tractor" checked="checked" />
    <input id="menu1" type="radio" value="2" name="tractor" />
    <input id="menu2" type="radio" value="3" name="tractor" />
    <input id="menu3" type="radio" value="4" name="tractor" />

    <nav class="rounded-b-full">
      <nuxt-link to="/">
        <label for="menu0" class=""
          ><fa-icon class="text-5xl" :icon="['fas', 'list']"
        /></label>
      </nuxt-link>
      <nuxt-link to="/training">
        <label for="menu1" class=""
          ><fa-icon class="text-5xl" :icon="['fas', 'music']"
        /></label>
      </nuxt-link>
      <nuxt-link to="/ear">
        <label for="menu2" class=""
          ><fa-icon class="text-5xl" :icon="['fas', 'list']"
        /></label>
      </nuxt-link>
      <nuxt-link to="/midi">
        <label for="menu3" class=""
          ><fa-icon class="text-5xl" :icon="['fas', 'cog']"
        /></label>
      </nuxt-link>
    </nav>
    <nuxt-link to="/parameters">
      <fa-icon class="text-5xl" :icon="['fas', 'cog']" />
    </nuxt-link>
  </section>
</template>

<script>
export default {
  methods: {},
}
</script>

<style scoped>
nav,
nav:after,
label {
  margin: 0;
  padding: 0;
  border: 0 none;
  position: relative;
}

section {
  max-width: 30rem;
  min-width: 20rem;
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
  background: #bec4e3;
  position: absolute;
  transition: all 0.5s;
}
input {
  display: none;
}
label {
  width: 25%;
  float: left;
  color: #c0bee3;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  z-index: 2;
  padding-top: 10px;
}
label:hover {
  color: #2b1e6780;
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
  color: #1f1e67;
  font-weight: 600;
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
