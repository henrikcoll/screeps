const roles = require('../roles')

/**
 * @typedef {import('../classes/role')} Role
 */

class Room {
  constructor (name) {
    this.name = name
    this.room = Game.rooms[name]

    /**
     * @type {StructureSpawn} spawner
     */

    this.spawner = this.room.find(FIND_MY_SPAWNS)[0]

    /**
     * @type {Map<string, Role>}
     */

    this.roles = Object.values(roles).map(Role => new Role(this))
  }

  loop () {
    for (const role of this.roles) {
      role.loop()
    }
  }
}

module.exports = Room
