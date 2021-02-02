<template>
  <tr>
    <td scope="row">
      <router-link :to="{name: 'BugDetails', params: {id: bugProp.id}}">
        <p>{{ bugProp.title }}</p>
      </router-link>
    </td>
    <td>
      <p v-if="bugProp.creator">
        {{ bugProp.creator.name }}
      </p>
    </td>
    <td> <p>{{ bugProp.updatedAt }}</p></td>
    <td>
      <p v-if="bugProp.closed" class="text-danger">
        Closed
      </p>
      <p v-else class="text-success">
        Open
      </p>
    </td>
  </tr>
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
