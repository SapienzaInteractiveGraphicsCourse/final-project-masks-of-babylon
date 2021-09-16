/**
 * Instantiates a full block composed of 3x3 instances of the specified floor
 * and up to four walls, each made of 3x2 instances of the specified wall.
 * Offset is the "block coordinates" (1 block = 6 units) where to place that block,
 * walls is an array of cardinal directions that indicate which walls to create.
 */
function addBlock(floor, wall, offset, walls, check_collisions=false, scene=undefined) {
    
    floor.addInstance(offset[0],offset[1],offset[2], check_collisions, scene);

    let n=false,e=false,s=false,w=false;
    for (let i in walls) {
        if (walls[i] == "N") n=true;
        else if (walls[i] == "E") e=true;
        else if (walls[i] == "S") s=true;
        else if (walls[i] == "W") w=true;
    }
    wall.addInstance(offset[0],offset[1],offset[2], n,e,s,w, check_collisions, scene);
}

export { addBlock }