<script>
import { defineComponent } from 'vue';
import VueAccessibleDateField from '@/vue-accessible-date-field.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueAccessibleDateField
  }
});
</script>

<template>
  <div id="app">
    <vue-accessible-date-field />
  </div>
</template>
