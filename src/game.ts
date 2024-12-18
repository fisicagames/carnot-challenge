import { Engine } from "@babylonjs/core";
import { CanvasInitializer } from "./Core/CanvasInitializer";
import { EngineInitializer } from "./Core/EngineInitializer";
import { SceneInitializer } from "./Core/SceneInitializer";

export class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    //TODO: Config Havok physics use for each games:
    private static useHavok: boolean = true;
    private static useInspectorDebugModel: boolean;

    static { // Bloco estático
        const inspectorEnabledString = import.meta.env.VITE_INSPECTOR_ENABLED;

        if (inspectorEnabledString === 'true') {
            Game.useInspectorDebugModel = true;
            console.log("Inspector habilitado pela variável de ambiente.");
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

        // Carregar e habilitar o modelo do inspector de forma condicional
        if (Game.useInspectorDebugModel) {
            import('./Core/InspectorDebugModel').then((module) => {
                const InspectorDebugModel = module.InspectorDebugModel;
                // Habilita o modo de inspector com: Shift+d, c ou j
                InspectorDebugModel.enable(mainScene.scene); 
            }).catch((error) => {
                console.error("Erro ao carregar o InspectorDebugModel:", error);
            });
        }
    }
}

export function startGame(): void {
    const game = new Game();
    game.startMainScene();
}
