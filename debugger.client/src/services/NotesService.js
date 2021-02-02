import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getAllNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    logger.log(res.data)
    AppState.notes[id] = res.data
  }

  async create(newNote, id) {
    newNote.creatorId = AppState.account.id
    newNote.bugId = id
    const res = await api.post('api/notes', newNote)
    logger.log(res.data)
    AppState.notes[id] = [...AppState.notes[id], res.data]
  }

  async delete(id, bugId) {
    await api.delete('api/notes/' + id)

    this.getAllNotes()
    // const index = AppState.notes.[bugId].findIndex(n => n.id === id)
    // AppState.notes[bugId].splice(index, 1)
  }
}

export const notesService = new NotesService()
