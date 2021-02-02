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
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: req.params.id, creatorId: req.userInfo.id }, { closed: true })
    if (!bug) {
      throw new BadRequest('You are not the owner, or the bug is already squashed!')
    }
    return bug
  }
}
export const bugsService = new BugsService()
