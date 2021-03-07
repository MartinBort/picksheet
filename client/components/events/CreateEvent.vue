<template>
  <div>
    <div>
      <h2>Create a new event</h2>
      <b-field label="Event name">
        <b-input v-model="name"></b-input>
      </b-field>
      <b-field label="Select datetime">
        <b-datetimepicker
          placeholder="Type or select a date..."
          v-model="datetime"
          icon="calendar-today"
          :locale="locale"
          editable
        >
        </b-datetimepicker>
      </b-field>
      <b-button @click="createEvent">Create event</b-button>
    </div>
    <div>
      <h2>Add fights to event</h2>
      <div>
        <div class="card" v-for="(fight, i) in fights" :key="i">
          <div class="card-content">
            <p class="title">Fight {{ i + 1 }}</p>
            <div class="fight__names">
              <b-field label="Fighter 1">
                <b-input v-model="fights[i].f1"></b-input>
              </b-field>
              <span>v</span>
              <b-field label="Fighter 2">
                <b-input v-model="fights[i].f2"></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <b-button @click="addFight">Add fight</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateEvent',
  data() {
    return {
      name: '',
      datetime: null,
      locale: 'en-CA',
      fights: [
        {
          f1: '',
          f2: '',
        },
      ],
    };
  },
  methods: {
    addFight() {
      this.fights.push({
        f1: '',
        f2: '',
      });
    },
    async createEvent() {
      try {
        const res = await this.$axios.$post('http://localhost:8000/events', {
          name: this.name,
          datetime: this.datetime,
        });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.fight__names {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.fight__names > .field {
  width: 100%;
}
</style>
