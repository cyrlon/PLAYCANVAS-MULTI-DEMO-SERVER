import { Room } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState.js";
import { Player } from "./schema/MyRoomState.js";
export class MyRoom extends Room {
  maxClients = 5;

  onCreate (options) {

    this.setState(new MyRoomState());

    // Handle the "updatePosition" message
    this.onMessage("updatePosition", (client, data) => {
        const player = this.state.players.get(client.sessionId);
        if (player) {
            player.x = data.x;
            player.y = data.y;
            player.z = data.z;
        }
    });

  }

  onJoin (client, options) {
    console.log(client.sessionId, "joined!");
    // Create Player instance
    const player = new Player();

    // Place Player at a random position
    const FLOOR_SIZE = 4;
    player.x = -(FLOOR_SIZE / 2) + Math.random() * FLOOR_SIZE;
    player.y = 1.031;
    player.z = -(FLOOR_SIZE / 2) + Math.random() * FLOOR_SIZE;

    // Place player in the map of players by its sessionId
    // (client.sessionId is unique per connection!)
    this.state.players.set(client.sessionId, player);
    
  }

  onLeave(client, consented) {
    console.log(client.sessionId, "left!");

    // Remove the player from the state
    this.state.players.delete(client.sessionId);
}

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
