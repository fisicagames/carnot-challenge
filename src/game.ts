import { Engine } from "@babylonjs/core";
import { CanvasInitializer } from "./Core/CanvasInitializer";
import { EngineInitializer } from "./Core/EngineInitializer";
import { InspectorDebugModel } from "./Core/InspectorDebugModel";
import { SceneInitializer } from "./Core/SceneInitializer";

export class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private useHavok: boolean = true;

    constructor() {
        this.canvas = CanvasInitializer.createAndAdjustCanvas();
        this.engine = EngineInitializer.createEngine(this.canvas);

    }
    public startMainScene() {
        //TODO: Config Havok physics use for each games:
        const mainScene = new SceneInitializer(this.canvas, this.engine, this.useHavok);
        //TODO: Remove InspectorDebugModel before build!
        //InspectorDebugModel.enable(mainScene.scene); //Shift+d
    }
}

// Export a function to instantiate the Game class
export function startGame(): void {
    const game = new Game();
    game.startMainScene();
}
