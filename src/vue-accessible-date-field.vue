<script lang="ts">
import { defineComponent } from 'vue';

interface DateData {
  showCalendar: boolean;
}

export default /*#__PURE__*/defineComponent({
  name: 'VueAccessibleDateField', // vue component name
  data(): DateData {
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
    <!-- date field -->
    <div class="date-field-section">
      <input id="dateField" class="date-field" type="text" placeholder="dd.mm.yyyy">
      <button class="icon open-calendar-btn" @click="showCalendar = true">
        <img class="open-calendar-icon" alt="calendar icon" :src="require('@/assets/calendar_icon.svg')">
      </button>
    </div>
    <!-- visual calendar -->
    <div class="calendar-section">
      <div class="calendar-modal" v-if="showCalendar">      
        <p>Placeholder for visual calendar</p>
        <button class="choose-selected-date" @click="showCalendar = false">Close</button>
        <button class="close-calendar-modal" @click="showCalendar = false">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
   .date-field-section {
     height: 40px;
  }

  /*
  .vue-accessible-date-field p {
  } */
  .calendar-modal {
    border: 1px solid #000000;
    width: 40%;
    max-width: 450px;
  }

  .date-field {
    height: 100%;
    vertical-align: bottom;
  }

  .open-calendar-btn {
    height: 100%;
    background-color: #FFF6B0;
  }

  .open-calendar-icon {
    height: 100%;
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
