<template>
  <section>
    <nav class="rounded-b-full">
      <nuxt-link class="icon" to="/">
        <fa-icon class="text-5xl" :icon="['fas', 'list']" />
      </nuxt-link>
      <nuxt-link class="icon" to="/training">
        <fa-icon class="text-5xl" :icon="['fas', 'music']" />
      </nuxt-link>
      <nuxt-link class="icon" to="/ear">
        <fa-icon class="text-5xl" :icon="['fas', 'tachometer-alt']" />
      </nuxt-link>
      <nuxt-link class="icon" to="/parameters">
        <fa-icon class="text-5xl" :icon="['fas', 'cog']" />
      </nuxt-link>
    </nav>
  </section>
</template>

<script>
export default {
  methods: {},
}
</script>

<style scoped>
/* nav,
nav:after,
.icon {
  margin: 0;
  padding: 0;
  border: 0 none;
  position: relative;
} */

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
/* nav:after {
  content: '';
  width: 25%;
  height: 5rem;
  background: #bec4e3;
  position: absolute;
  transition: all 0.5s;
} */
input {
  display: none;
}
.icon {
  width: 25%;
  float: left;
  color: #c0bee3;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  z-index: 2;
  padding-top: 10px;
}
.icon:hover {
  color: #2b1e6780;
}
.icon:before {
  display: block;
  font-size: 3rem;
  line-height: 5rem;
  z-index: 2;
}

.nuxt-link-exact-active {
  color: #1f1e67;
  font-weight: 600;
}

.nuxt-link-exact-active[href='/'] ~ nav:after {
  left: 0;
  border-bottom-left-radius: 75px;
  border-bottom-right-radius: 0;
}
.nuxt-link-exact-active[href='/training'] ~ nav:after {
  left: 25%;
  border-top: 0 none;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.nuxt-link-exact-active[href='/ear'] ~ nav:after {
  left: 50%;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.nuxt-link-exact-active[href='/parameters'] ~ nav:after {
  left: 75%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 75px;
}
</style>
