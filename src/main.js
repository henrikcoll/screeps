const Room = require('./room')

const rooms = Object.keys(Game.rooms).map(key => new Room(key))

module.exports.loop = function () {
  for (const room of rooms) {
    room.loop()
  }
}
