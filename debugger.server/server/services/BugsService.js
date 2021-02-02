import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getBugs(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator')
    return bugs
  }

  async getOne(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    return bug
  }

  async create(newBug) {
    return await dbContext.Bugs.create(newBug)
  }

  async close(req) {
    const updated = await dbContext.Bugs.findOneAndUpdate({ _id: req.id, creatorId: req.creatorId }, { closed: true }, { new: true })
    if (!updated) {
      throw new BadRequest('You are not the owner, or the bug is already squashed!')
    }
    return updated
  }

  async edit(req) {
    const updated = await dbContext.Bugs.findOneAndUpdate({ _id: req.id, creatorId: req.creatorId, closed: false }, req, { new: true })
    if (!updated) {
      throw new BadRequest('You are not the owner, or the bug is already squashed!')
    }
    return updated
  }
}
export const bugsService = new BugsService()
