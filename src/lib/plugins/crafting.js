var blocks = require("minecraft-data")(require("flying-squid").version).blocks;
var Vec3 = require("vec3").Vec3;

module.exports.player = function(player, serv) {

  player._client.on("block_place", async ({ direction, heldItem, location } = {}) => {
    console.log(location, heldItem, direction)
    if(direction==-1 || heldItem.blockId==-1) return;

    var referencePosition = new Vec3(location.x, location.y, location.z);
    var directionVector = directionToVector[direction];
    var position = referencePosition.plus(directionVector);
    var block = await player.world.getBlock(position);
    
    //if(player.crouching) return;

    if(heldItem.blockId == 0 && block.name == "crafting_table") {
      player.chat('You right clicked a crafting table!');
    }
  });
}

var directionToVector=[new Vec3(0,-1,0),new Vec3(0,1,0),new Vec3(0,0,-1),new Vec3(0,0,1),new Vec3(-1,0,0),new Vec3(1,0,0)];