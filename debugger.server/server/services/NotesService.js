import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotes(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator')
    return notes
  }

  async getOne(id) {
    const note = await dbContext.Notes.findById(id).populate('creator')
    return note
  }

  async create(newNote) {
    return await dbContext.Notes.create(newNote)
  }

  async delete(req) {
    const note = await dbContext.Notes.findOneAndDelete({ _id: req.params.id, creatorId: req.userInfo.id })
    if (!note) {
      throw new BadRequest('that aint right')
    }
    return 'delorted'
  }
}
export const notesService = new NotesService()
