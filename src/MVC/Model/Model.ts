import { Scene, HavokPlugin } from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundModel } from "./SoundModel";
import { CarnotCylinder } from "./CarnotCylinder";

import { SourceBlocks } from "./SourceBlocks";
import { GasParticles } from "./GasParticles";
export class Model implements IModel {
    private scene: Scene;
    private backgroundMusic?: SoundModel;
    private explosionSound?: SoundModel;
    private allSounds: SoundModel[] = [];
    private physicsPlugin: HavokPlugin | null;
    private endGameCallback: ((isVisible: boolean) => void) | null = null;
    public endGAme: boolean = false;

    private carnotCylinder: CarnotCylinder;
    private gasParticles: GasParticles;
    private sourceBlocks: SourceBlocks;
    public updateModels: boolean = false;

    constructor(scene: Scene, physicsPlugin?: HavokPlugin | null) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin || null;

        this.startMusic();

        this.carnotCylinder = new CarnotCylinder(this.scene);
        const pistonY = this.carnotCylinder.getPistonY();
        this.gasParticles = new GasParticles(this.scene, 100, pistonY);
        this.sourceBlocks = new SourceBlocks(this.scene);

        this.updateSceneModels();

        this.carnotCylinder.setCylinderFrozenCallback(() => this.gasParticles.frozenGas())
        this.carnotCylinder.setPistonExplosionCallback(() => {
            this.explosionSound?.play();
        })

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


        //https://pixabay.com/sound-effects/nuclear-explosion-63470/
        //Artistunfa (Freesound)
        this.explosionSound = new SoundModel(
            this.scene,
            "explosionSound",
            "./assets/sounds/nuclear-explosion-63470-compress-cut.mp3",
            false
        );
        this.explosionSound.setVolume(1.2);
        this.explosionSound?.setLoop(false);
        this.allSounds.push(this.explosionSound);
    }

    private updateSceneModels() {
        this.scene.onBeforeRenderObservable.add(() => {
            const sourceType = this.sourceBlocks.getSourceType();
            const sourceTypeIndex = this.sourceBlocks.getSourceTypeIndex();
            const gasTemperature1to180 = this.gasParticles.getGasCurrentTemperature();
            if (this.carnotCylinder.piston) {
                const pistonY = this.carnotCylinder.getPistonY();
                this.gasParticles.updateGasParticleState(pistonY);
                if (this.updateModels) {
                    this.carnotCylinder.updatePistonMove(sourceType, sourceTypeIndex, gasTemperature1to180);
                }
            }
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

    public setScoreUpdateCallback(callback: (newScore: number, state: string, work: number) => void): void {
        this.carnotCylinder.setUpdateScoreCallback(callback);
    }

    public changeSourceTypes() {
        if (this.carnotCylinder.pistonIsWorking) {
            this.sourceBlocks.changeSourceTypes();
            let sourceTemperature: number = 0;
            if (this.sourceBlocks.getSourceType() == 0 || this.sourceBlocks.getSourceTypeIndex() == 2) {
                sourceTemperature = 180;
                this.gasParticles.setGasSourceTemperature(sourceTemperature);
            }
            else if (this.sourceBlocks.getSourceType() == 2 || this.sourceBlocks.getSourceTypeIndex() == 0) {
                sourceTemperature = 1;
                this.gasParticles.setGasSourceTemperature(sourceTemperature);
            }
        }
        return this.sourceBlocks.getSourceType();
    }
    public resetGame() {
        this.updateModels = false;
        this.carnotCylinder.pistonIsWorking = true;
        this.sourceBlocks.resetSource();
        this.carnotCylinder.resetCylinder();
        this.carnotCylinder.resetPiston();
        this.gasParticles.resetGasParticles(this.carnotCylinder.getPistonY());
    }
}
