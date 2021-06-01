
/**
 * @typedef {import('../room')} Room
 */

class Role {
  /**
   *
   * @param {Room} room
   * @param {string} name
   */

  constructor (room, name) {
    this.room = room
    this.name = name

    /* Might be usless */
    this.tickOffset = Math.floor(Math.random() * 5)

    /**
     * @type {String[]}
     */
    this.creeps = _.filter(Game.creeps, (creep) => creep.memory.role === this.name && creep.room.name === this.room.name).map(creep => creep.name)
  }

  loop () {
    if (this.creeps.length < this.maxCreeps) {
      console.log('should spawn', this.name)
      this.spawn()
    }

    if ((Game.time + this.tickOffset) % 5 === 0) {
      this.creeps = _.filter(Game.creeps, (creep) => creep.memory.role === this.name && creep.room.name === this.room.name).map(creep => creep.name)
    }

    for (const creep of this.creeps) {
      if (!Game.creeps[creep]) { continue }

      try {
        this.handle(Game.creeps[creep])
      } catch (error) {
        /* Catch any errors so the other screeps can continue working */
        console.error(error)
      }
    }
  }

  spawn () {
    this.room.spawner.spawnCreep(this.creepParts, this.name + Game.time, { memory: { role: this.name } })
  }
}

module.exports = Role
