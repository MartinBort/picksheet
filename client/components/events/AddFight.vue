<template>
  <div>
    <div class="card">
      <div class="card-content">
        <label class="label">Add fights to event</label>
        <div class="fight__names">
          <b-field label="Fighter 1">
            <b-input v-model="newFight.fighter1"></b-input>
          </b-field>
          <b-field label="Fighter 2">
            <b-input v-model="newFight.fighter2"></b-input>
          </b-field>
        </div>
        <div class="more-options">
          <b-checkbox v-model="newFight.fiveRounds">5 rounds</b-checkbox>
          <b-checkbox v-model="newFight.titleFight">Title</b-checkbox>
          <b-button @click="emitAndClear">Add fight</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep';
const fightObj = {
  fighter1: '',
  fighter2: '',
  titleFight: false,
  fiveRounds: false,
  winner: null,
  method: null,
  round: null,
};

export default {
  name: 'AddFight',
  data() {
    return {
      newFight: _cloneDeep(fightObj),
    };
  },
  watch: {
    isTitleFight: function (val) {
      if (val) {
        this.newFight.fiveRounds = true;
      }
    },
    isFiveRounds: function (val) {
      if (!val && this.newFight.titleFight) {
        this.newFight.titleFight = false;
      }
    },
  },
  computed: {
    isTitleFight() {
      return this.newFight.titleFight;
    },
    isFiveRounds() {
      return this.newFight.fiveRounds;
    },
  },
  methods: {
    emitAndClear() {
      this.$emit('assignFight', this.newFight);
      this.newFight = _cloneDeep(fightObj);
    },
  },
};
</script>

<style lang="scss" scoped>
.more-options {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>
