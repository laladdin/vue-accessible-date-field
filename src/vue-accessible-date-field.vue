<script>
import { defineComponent } from 'vue';

export default /*#__PURE__*/defineComponent({
  name: 'VueAccessibleDateField', // vue component name
  data() {
    return {
      showCalendar: false,
    };
  },
  computed: {
  },
  methods: {
  },
});
</script>

<template>
  <div class="vue-accessible-date-field">
    <label for="dateField">Date </label>
    <input id="dateField" type="text" placeholder="dd.mm.yyyy">
    <button class="icon" @click="showCalendar = true">Open calendar</button>
    <!-- visual calendar -->
    <div class="calendar-modal" v-if="showCalendar">      
      <p>Placeholder for visual calendar</p>
      <button class="choose-selected-date" @click="showCalendar = false">Close</button>
      <button class="close-calendar-modal" @click="showCalendar = false">OK</button>
    </div>
  </div>
</template>

<style scoped>
  /* .vue-accessible-date-field {
  }
  .vue-accessible-date-field p {
  } */
  .calendar-modal {
    border: 1px solid #000000;
    width: 40%;
    max-width: 450px;
  }

  /* XXL */
  /* @media (min-width: 1281px) {
  } */
  
  /* XL */
  @media (min-width: 1025px) and (max-width: 1280px){
      
  }
  
  /* L */
  @media (min-width: 768px) and (max-width: 1024px){
    .calendar-modal {
      width: 50%;
    }
  }

  /* M */
  @media (min-width: 481px) and (max-width: 767px) {
    .calendar-modal {
      width: 70%;
    }
  }

  /* S */
  @media (max-width: 480px) {
    .calendar-modal {
      width: 95%;
    }
  }
</style>
