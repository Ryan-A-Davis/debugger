<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-4 text-center my-2 py-2">
        <h1>BugLog</h1>
      </div>
      <div class="col-8">
        <form @submit.prevent="create">
          <input type="text"
                 name="title"
                 id="title"
                 placeholder="Name of issue"
                 v-model="state.newBug.title"
          >
          <textarea name="description"
                    class="form-control"
                    rows="3"
                    maxlength="200"
                    id="description"
                    placeholder="Briefly describe the problem"
                    v-model="state.newBug.description"
          ></textarea>
          <router-link :to="{name: 'BugDetails', params: {id: bugProp.id}}">
            <button class="btn btn-success" type="submit">
              Create
            </button>
            >
          </router-link>
        </form>
      </div>
    </div>
    <div class="row border-dark mx-2 py-5">
      <div class="col">
        <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugsService } from '../services/BugsService'
// import { router } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      newBug: {}
    })
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async create() {
        try {
          await bugsService.create(state.newBug)
          logger.log(state.account.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
