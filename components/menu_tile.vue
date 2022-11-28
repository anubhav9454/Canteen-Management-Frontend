<template>
  <nuxt-link :to="link">
    <div class="w-48 border">
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
