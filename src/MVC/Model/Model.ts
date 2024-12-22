import { Scene, HavokPlugin, MeshBuilder, Vector3, Mesh, PhysicsAggregate, TransformNode, PhysicsShapeSphere, PhysicsShapeBox, Quaternion, StandardMaterial, Color3 } from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundModel } from "./SoundModel";
import { CarnotCylinder } from "./CarnotCylinder";
import { GasParticles } from "./gasParticles";
export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic?: SoundModel;
    private allSounds: SoundModel[] = [];
    private physicsPlugin: HavokPlugin | null;
    private endGameCallback: ((isVisible: boolean) => void) | null = null;
    public endGAme: boolean = false;

    private carnotCylinder: CarnotCylinder;
    private gasParticles: GasParticles;

    constructor(scene: Scene, physicsPlugin?: HavokPlugin | null) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin || null;
  
        this.startMusic();

        this.carnotCylinder = new CarnotCylinder(this.scene);
        this.gasParticles = new GasParticles(this.scene, 100);    
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
            //piston move:
            if(this.carnotCylinder.piston.transformNode.position.y < -1.8){
                this.carnotCylinder.piston.body.setLinearVelocity(new Vector3(0, 4, 0));
            }
            else if (this.carnotCylinder.piston.body.transformNode.position.y > 0.5){
                this.carnotCylinder.piston.body.setLinearVelocity(new Vector3(0, -4, 0));
            }
            const pistonY = this.carnotCylinder.piston.body.transformNode.position.y;
            this.gasParticles.updateGasParticleState(pistonY);
                        
            
        });
    }


    public toggleMusicPlayback(): void {
        if(this.backgroundMusic){
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

}
