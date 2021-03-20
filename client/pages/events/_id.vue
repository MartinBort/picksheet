<template>
  <div v-if="event" class="card">
    <div class="card-content">
      <div class="title-btn-group">
        <h1 class="title">{{ event.name }}</h1>
        <div>
          <b-button
            @click="saveEvent"
            :disabled="!changesMade"
            :type="`${changesMade ? 'is-success' : ''}`"
            >Save changes</b-button
          >
        </div>
      </div>
      <div class="event-meta">
        <p>{{ eventDate }}</p>
      </div>
      <div v-if="event.fights.length !== 0" class="fights-container panel">
        <draggable
          v-model="event.fights"
          @start="drag = true"
          @end="drag = false"
        >
          <div
            v-for="(fight, i) in event.fights"
            :key="i"
            class="panel-block fight-instance"
          >
            <fight-instance
              :fight="fight"
              :order="i"
              @deleteFighter="deleteFighter"
            />
          </div>
        </draggable>
      </div>
      <div v-else>
        <i>No fights assigned to event.</i>
      </div>
      <add-fight @assignFight="assignFight" />
      <div>
        <pre>{{ event }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';
import draggable from 'vuedraggable';

import AddFight from '@/components/events/AddFight.vue';
import FightInstance from '@/components/events/FightInstance.vue';

export default {
  name: 'Event',
  components: {
    AddFight,
    FightInstance,
    draggable,
  },
  data() {
    return {
      event: null,
      eventOriginalState: null,
    };
  },
  computed: {
    eventDate() {
      const datetime = this.event.datetime;
      return new Date(datetime).toDateString();
    },
    changesMade() {
      return !_isEqual(this.event, this.eventOriginalState);
    },
  },
  methods: {
    assignFight(fight) {
      this.event.fights.push(fight);
    },
    deleteFighter(i) {
      this.event.fights.splice(i, 1);
    },
    async saveEvent() {
      const id = this.$route.params.id;
      const res = await this.$axios.$post(
        `http://localhost:8000/events/${id}`,
        this.event
      );
      this.event = res;
      this.eventOriginalState = _cloneDeep(this.event);
    },
  },
  async fetch() {
    const id = this.$route.params.id;
    try {
      const res = await this.$axios.$get(`http://localhost:8000/events/${id}`);
      this.event = res[0];
      this.eventOriginalState = _cloneDeep(this.event);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>
.title-btn-group {
  display: flex;
  justify-content: space-between;
}

.fights-container {
  margin: 20px 0;
}

.fight-instance {
  width: 100%;
}
</style>
