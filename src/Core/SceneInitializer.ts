//TODO: Implement a conditionally import for HavokPlugin.
import "@babylonjs/loaders/glTF";
import { Engine, Scene, Vector3, HemisphericLight, ScenePerformancePriority, Color4, HavokPlugin } from "@babylonjs/core";
import { CameraInitializer } from "./CameraInitializer";
import { optimizeMaterials } from "./MaterialOptimizer";
import { GUILoader } from "./GUILoader";
import { HavokPhysicsEngine } from "./physics/HavokPhysicsEngine";
import { MVC } from "../MVC/MVC";
//TODO: Create a env variable for enable ModelsLoader;
import { ModelsLoader } from "./ModelsLoader";

export class SceneInitializer {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private useHavok: boolean;

    public get scene(): Scene {
        return this._scene;
    }

    constructor(canvas: HTMLCanvasElement, engine: Engine, useHavok = false) {
        this._canvas = canvas;
        this._engine = engine;
        this._scene = new Scene(this._engine);
        this.useHavok = useHavok; 
        this.initialize();
    }

    private async initialize(): Promise<void> {
        const advancedTexture = await GUILoader.loadGUI(this._scene, "./assets/gui/guiTexture.json");
        await ModelsLoader.loadModels(this._scene, "./assets/models/", "carnot.gltf", true, true);
        this.sceneOptimizer();
        this._scene.clearColor = Color4.FromHexString("#87CEEB");
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(-0.2, 0.11, 0), this._scene);
        light1.intensity = 1.1;

        const universalCamera = CameraInitializer.createUniversalCamera(this._scene, this._canvas);
        const followCamera = CameraInitializer.createFollowCamera(this._scene);
        this._scene.activeCamera = universalCamera; // Or followCamera

        let physicsPlugin: HavokPlugin | null = null;
        if (this.useHavok) {
            const physicsEngine = new HavokPhysicsEngine();
            physicsPlugin = await physicsEngine.initialize(this._scene);
        }

        const mvc = new MVC(this._scene, advancedTexture, physicsPlugin);

        await this._scene.whenReadyAsync(); //optional
        this._engine.hideLoadingUI(); //optional
        this.sceneLoop();
    }

    private sceneLoop() {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

    private sceneOptimizer() {
        this._scene.skipPointerMovePicking = true;
        //this._scene.freezeActiveMeshes();
        this._scene.performancePriority = ScenePerformancePriority.BackwardCompatible;
    }
}