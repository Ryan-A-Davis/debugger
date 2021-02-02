import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    logger.log(res.data)
    AppState.bugs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    logger.log(res.data)
    AppState.activeBug = res.data
  }

  async create(newBug) {
    logger.log(AppState.account.id)
    newBug.creatorId = AppState.account.id
    const res = await api.post('api/bugs', newBug)
    logger.log(res.data)
    AppState.bugs = [...AppState.bugs, res.data]
    AppState.activeBug = res.data
  }

  async close(id) {
    const data = await api.put('api/bugs/' + id)
    const index = AppState.bugs.findIndex(b => b.id === id)
    AppState.bugs[index] = data
  }
}

export const bugsService = new BugsService()
