<template>
  <div class="notecomponent " v-if="noteProp.creator">
    <div class="row">
      <div class="font-weight-bold">
        {{ noteProp.creator.name }}
        <div class="font-weight-normal">
          {{ noteProp.body }}
        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-danger" @click="remove">
    Delete
  </button>
</template>

<script>
import { computed, reactive } from 'vue'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import NotificationService from '../services/NotificationService'
export default {
  name: 'NoteComponent',
  props: {
    noteProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,
      async remove() {
        try {
          if (await NotificationService.confirm()) {
            await notesService.delete(props.noteProp._id, props.noteProp.bugId)
          } else {
            alert('Note not deleted')
          }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
