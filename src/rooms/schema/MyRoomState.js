// MyRoomState.mjs
import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

type("number")(Player.prototype, "x");
type("number")(Player.prototype, "y");
type("number")(Player.prototype, "z");

export class MyRoomState extends Schema {
    constructor() {
        super();
        this.players = new MapSchema();
    }
}

type({ map: Player })(MyRoomState.prototype, "players");