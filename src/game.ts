import { Engine } from "@babylonjs/core";
import { CanvasInitializer } from "./Core/CanvasInitializer";
import { EngineInitializer } from "./Core/EngineInitializer";
import { SceneInitializer } from "./Core/SceneInitializer";

export class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    //TODO: Config Havok physics use for each games:
    private static useHavok: boolean = true;s
    //TODO: Config use Inspector Debug Model feature:
    private static useInspectorDebugModel: boolean;

    static { // Bloco estático
        const inspectorEnabledString = import.meta.env.VITE_INSPECTOR_ENABLED;

        if (inspectorEnabledString === 'true') {
            Game.useInspectorDebugModel = true;
            console.log("Inspector habilitado pela variável de ambiente.");
        } else if (inspectorEnabledString === 'false'){
            Game.useInspectorDebugModel = false;
        } else {
            Game.useInspectorDebugModel = false;
        }
    }

    constructor() {
        this.canvas = CanvasInitializer.createAndAdjustCanvas();
        this.engine = EngineInitializer.createEngine(this.canvas);

    }
    public async startMainScene() {
        const mainScene = new SceneInitializer(this.canvas, this.engine, Game.useHavok);
        if (Game.useInspectorDebugModel) {
            const { InspectorDebugModel } = await import("./Core/InspectorDebugModel");
            // Enable inspector mode with: Shift+d, c or j.
            InspectorDebugModel.enable(mainScene.scene); 
        }
    }
}

export function startGame(): void {
    const game = new Game();
    game.startMainScene();
}
