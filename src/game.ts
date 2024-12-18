import { Engine } from "@babylonjs/core";
import { CanvasInitializer } from "./Core/CanvasInitializer";
import { EngineInitializer } from "./Core/EngineInitializer";
import { InspectorDebugModel } from "./Core/InspectorDebugModel";
import { SceneInitializer } from "./Core/SceneInitializer";

export class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    //TODO: Config Havok physics use for each games:
    private useHavok: boolean = true;
    //TODO: Config use Inspector Debug Model feature:
    private useInspectorDebugModel: boolean = false;

    constructor() {
        this.canvas = CanvasInitializer.createAndAdjustCanvas();
        this.engine = EngineInitializer.createEngine(this.canvas);

    }
    public async startMainScene() {
        const mainScene = new SceneInitializer(this.canvas, this.engine, this.useHavok);
        if (this.useInspectorDebugModel) {
            // Importação dinâmica do módulo InspectorDebugModel
            const { InspectorDebugModel } = await import("./Core/InspectorDebugModel");
            InspectorDebugModel.enable(mainScene.scene); // Enable inspector mode with: Shift+d, c or j.
        }
    }
}

export function startGame(): void {
    const game = new Game();
    game.startMainScene();
}
