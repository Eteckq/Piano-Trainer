<template>
  <div>
    <div
      class="absolute top-8 left-8 bg-gray-100 border-1 w-86 p-8 rounded"
      style="width: 350px"
    >
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text'],
}
</script>
