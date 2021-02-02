<template>
  <div class="bug row justify-content-around">
    <div class="col-2">
      <router-link :to="{name: 'BugDetails', params: {id: bugProp.id}}">
        <p>{{ bugProp.title }}</p>
      </router-link>
    </div>
    <div v-if="bugProp.creator" class="col-2">
      <p>{{ bugProp.creator.name }}</p>
    </div>
    <div class="col-2">
      <p>{{ bugProp.updatedAt }}</p>
    </div>
    <div class="col-2-offset-2">
      <p v-if="bugProp.closed" class="text-danger">
        Closed
      </p>
      <p v-else class="text-success">
        Open
      </p>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
export default {
  name: 'BugComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      close() {
        try {
          bugsService.delete(props.bugProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
