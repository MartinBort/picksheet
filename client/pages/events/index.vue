<template>
  <div>
    <h1>Events</h1>
    <create-event />
  </div>
</template>

<script>
import CreateEvent from '@/components/events/CreateEvent.vue';
export default {
  name: 'Events',
  components: {
    CreateEvent,
  },
};
</script>
