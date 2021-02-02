<template>
  <div class="notecomponent">
    <div class="row">
      <i class="fa btn fa-trash text-danger" aria-hidden="true" @click="remove" v-if="state.account.id == noteProp.creatorId"></i>
      <div class="font-weight-bold">
        {{ noteProp.creator.name }}
        <div class="font-weight-normal">
          {{ noteProp.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
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
      remove() {
        try {
          notesService.delete(props.noteProp._id, props.noteProp.bugId)
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
