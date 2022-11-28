<template>
  <nuxt-link :to="link">
    <div class="w-64 border h-40 flex justify-center items-center ">
      <p class="">{{ value }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Title',
  props: ['value', 'link'],
}
</script>
