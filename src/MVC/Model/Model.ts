import { Scene, HavokPlugin, MeshBuilder, Vector3, Mesh, PhysicsAggregate, TransformNode, PhysicsShapeSphere, PhysicsShapeBox, Quaternion, StandardMaterial, Color3 } from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundModel } from "./SoundModel";
import { CarnotCylinder } from "./CarnotCylinder";
import { GasParticles } from "./gasParticles";
import { SourceBlocks } from "./SourceBlocks";
export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic?: SoundModel;
    private allSounds: SoundModel[] = [];
    private physicsPlugin: HavokPlugin | null;
    private endGameCallback: ((isVisible: boolean) => void) | null = null;
    public endGAme: boolean = false;

    private carnotCylinder: CarnotCylinder;
    private gasParticles: GasParticles;
    private sourceBlocks: SourceBlocks;

    constructor(scene: Scene, physicsPlugin?: HavokPlugin | null) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin || null;

        this.startMusic();

        this.carnotCylinder = new CarnotCylinder(this.scene);
        const pistonY = this.carnotCylinder.getPistonY();
        this.gasParticles = new GasParticles(this.scene, 100, pistonY);
        this.sourceBlocks = new SourceBlocks(this.scene);

        this.updateSceneModels();

    }

    private startMusic() {
        //TODO: [X]: Setup the music soundtrack:
        //https://pixabay.com/pt/music/techno-e-trance-timelapse-164084/
        //Music by Dimitrios Gkorilas from Pixabay
        this.backgroundMusic = new SoundModel(
            this.scene,
            "backgroundSound",
            "./assets/sounds/timelapse-164084-compress.mp3",
            true
        );
        this.backgroundMusic.setVolume(1.0);
        this.allSounds.push(this.backgroundMusic);
    }

    private updateSceneModels() {
        this.scene.onBeforeRenderObservable.add(() => {
            this.carnotCylinder.updatePistonMove();
            const pistonY = this.carnotCylinder.getPistonY();
            this.gasParticles.updateGasParticleState(pistonY);
        });
    }


    public toggleMusicPlayback(): void {
        if (this.backgroundMusic) {
            this.backgroundMusic.togglePlayback();
        }
    }

    public setEndGameCallback(callback: (isVisible: boolean) => void): void {
        this.endGameCallback = callback;
    }

    private onUpdateScoreCallback: (newScore: number) => void = () => {
        console.warn("No callback registered for score updates.");
    };
    public setScoreUpdateCallback(callback: (newScore: number) => void): void {
        this.onUpdateScoreCallback = callback;
    }

    public changeSourceTypes() {
        this.sourceBlocks.changeSourceTypes();
        const temperature = (2 - this.sourceBlocks.getSourceType()) * 90;
        this.gasParticles.setParticleEmissiveColor(temperature);
        return this.sourceBlocks.getSourceType();
    }

}
