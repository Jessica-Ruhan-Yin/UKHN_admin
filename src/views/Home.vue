<template>
  <div class="home">
    <the-header/>
    <the-body/>

  </div>


</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '@/components/the-header.vue';
import TheBody from '@/components/the-body.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TheHeader,
    TheBody,
  },
});
</script>

