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
    <td> <p>{{ convertTime() }}</p></td>
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
      account: computed(() => AppState.account),
      convertedTime: ''
    })
    return {
      state,
      close() {
        try {
          bugsService.delete(props.bugProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      convertTime() {
        const date = new Date(props.bugProp.updatedAt)
        const month = date.getMonth()
        const day = date.getDate()
        const hours = date.getUTCHours()
        const min = date.getUTCMinutes()
        const year = date.getFullYear()
        let dt = 'AM'
        let h = 0
        if (hours >= 12) {
          h = hours - 12
          dt = 'PM'
        }
        if (hours === 0) {
          h = 12
        }
        state.convertedTime = month + '/' + day + '/' + year + ' ' + h + ':' + min < 10 ? '0' + min : min + ' ' + dt
        console.log(month, day, year, h)
        return state.convertedTime
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
