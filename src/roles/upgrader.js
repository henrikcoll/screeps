const Role = require('../classes/role')

class Upgrader extends Role {
  constructor (room) {
    super(room, 'Upgrader')

    this.pathStyle = {
      fill: 'transparent',
      stroke: '#0ff',
      lineStyle: 'dashed',
      strokeWidth: 0.15,
      opacity: 0.1
    }

    this.maxCreeps = 4
    this.creepParts = [WORK, CARRY, MOVE]
  }

  handle (creep) {
    if (!creep.memory.stage || !creep.memory.target) {
      creep.memory.stage = 'harvest'
      creep.memory.target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id
    }

    const target = Game.getObjectById(creep.memory.target)

    switch (creep.memory.stage) {
      case 'harvest':
        this.doHarvest(creep, target)
        break
      case 'deliver':
        this.doDeliver(creep, target)
        break
    }
  }

  doHarvest (creep, target) {
    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: this.pathStyle })
    }

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.stage = 'deliver'
      creep.memory.target = this.room.room.controller.id
    }
  }

  doDeliver (creep, target) {
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: this.pathStyle })
    }
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.stage = null
      creep.memory.target = null
    }
  }
}

module.exports = Upgrader
