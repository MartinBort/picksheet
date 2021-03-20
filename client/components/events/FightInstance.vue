<template>
  <div class="fight-instance">
    <div class="fight-row">
      <div class="order-info-group">
        <div class="order">
          {{ order + 1 }}
        </div>
        <div>{{ fight.fighter1 }} v {{ fight.fighter2 }}</div>
      </div>
      <div class="options-container">
        <b-checkbox v-model="fight.fiveRounds">5 rounds</b-checkbox>
        <b-checkbox v-model="fight.titleFight">Title</b-checkbox>
        <b-button @click="toggleEdit">
          <span v-if="!fighterEditState">Edit fighters/ results</span>
          <span v-else>Close edit</span>
        </b-button>
        <b-button
          @click="$emit('deleteFighter', order)"
          type="is-danger is-light delete-btn"
          >Delete</b-button
        >
      </div>
    </div>
    <div v-show="fighterEditState" class="fight-result-edit">
      <div>
        <b-field label="Fighter 1">
          <b-input v-model="fight.fighter1" :ref="`input${order}`"></b-input>
        </b-field>
        <b-field label="Fighter 2">
          <b-input v-model="fight.fighter2"></b-input>
        </b-field>
      </div>
      <div class="result-container">
        <div>
          <label class="label">Winner</label>
          <b-radio v-model="fight.winner" name="name" native-value="fighter1">
            {{ fight.fighter1 }}
          </b-radio>
          <b-radio v-model="fight.winner" name="name" native-value="fighter2">
            {{ fight.fighter2 }}
          </b-radio>
          <b-radio v-model="fight.winner" name="name" native-value="noContest">
            No contest
          </b-radio>
        </div>
        <div>
          <b-field label="Method">
            <b-select
              placeholder="Select a method"
              v-model="fight.method"
              :disabled="methodDisabled"
            >
              <option v-for="method in methods" :value="method" :key="method">
                {{ method }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Round">
            <b-select
              placeholder="Select a round"
              v-model="fight.round"
              :disabled="roundDisabled"
            >
              <option v-for="round in rounds" :value="round" :key="round">
                {{ round }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FightInstance',
  props: {
    fight: Object,
    order: Number,
  },
  data() {
    return {
      fighterEditState: false,
      methods: ['KO/TKO', 'Submission', 'Decision'],
      rounds: this.fight.fiveRounds ? [1, 2, 3, 4, 5] : [1, 2, 3],
    };
  },
  watch: {
    isTitleFight: function (val) {
      if (val) {
        this.fight.fiveRounds = true;
      }
    },
    isFiveRounds: function (val) {
      if (!val && this.fight.titleFight) {
        this.fight.titleFight = false;
        this.rounds = [1, 2, 3];
      } else {
        this.rounds = [1, 2, 3, 4, 5];
      }
    },
  },
  computed: {
    isTitleFight() {
      return this.fight.titleFight;
    },
    isFiveRounds() {
      return this.fight.fiveRounds;
    },
    methodDisabled() {
      if (this.fight.winner === 'noContest') {
        this.fight.method = null;
        return true;
      }
      return false;
    },
    roundDisabled() {
      if (this.fight.method === 'Decision') {
        if (this.fight.fiveRounds) {
          this.fight.round = 5;
        } else {
          this.fight.round = 3;
        }
        return true;
      }
      return false;
    },
  },
  methods: {
    toggleEdit() {
      if (!this.fighterEditState) {
        this.fighterEditState = true;
        this.$nextTick(() => {
          this.$refs[`input${this.order}`].$el.childNodes[0].focus();
        });
      } else {
        this.fighterEditState = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fight-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.order-info-group {
  display: flex;

  .order {
    margin-right: 20px;
  }
}

.fight-result-edit {
  margin-bottom: 20px;
}

.options-container {
  display: flex;
  align-items: center;
}

.delete-btn {
  margin-left: 20px;
}
</style>
