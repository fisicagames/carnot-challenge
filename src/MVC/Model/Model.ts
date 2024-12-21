import { Scene, HavokPlugin, MeshBuilder, Vector3, Mesh, PhysicsAggregate, PhysicsShapeType, TransformNode, PhysicsShapeMesh} from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundModel } from "./SoundModel";

export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic: SoundModel;
    private allSounds: SoundModel[] = [];
    private physicsPlugin: HavokPlugin | null;
    private endGameCallback: ((isVisible: boolean) => void) | null = null;
    public endGAme: boolean = false;
    public modeEffectIntense: boolean = true;
    private gasParticle: Mesh;
    gasParticlePhysics: any;


    constructor(scene: Scene, physicsPlugin?: HavokPlugin | null) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin || null;

        //TODO: [X]: Setup the music soundtrack:
        //https://pixabay.com/pt/music/techno-e-trance-timelapse-164084/
        //Music by Dimitrios Gkorilas from Pixabay
        this.backgroundMusic = new SoundModel(
            this.scene,
            "backgroundSound",
            "./assets/sounds/timelapse-164084-compress.mp3",
            true
        );
        this.backgroundMusic.setVolume(0.7);
        this.allSounds.push(this.backgroundMusic);

        this.updateSceneModels();

        //gas particle
        this.gasParticle = MeshBuilder.CreateSphere("sphere", { diameter: 0.8, segments: 16 }, scene);
        this.gasParticle.position = new Vector3(0, 5, 0);
        this.gasParticlePhysics = new PhysicsAggregate(this.gasParticle,
             PhysicsShapeType.SPHERE, { mass: 1, radius: 0.5 }, scene) as PhysicsAggregate;
        this.gasParticle.physicsBody?.setLinearVelocity(new Vector3(40,-4,4));


        const cylinder_primitive0 = this.scene.getMeshByName(`Cylinder_primitive0`) as Mesh;
        const cylinder_primitive1 = this.scene.getMeshByName(`Cylinder_primitive1`) as Mesh;
        const cylinder_primitive2 = this.scene.getMeshByName(`Cylinder_primitive2`) as Mesh;

        const cylinder_shape0 = new PhysicsShapeMesh(
            cylinder_primitive0,
            this.scene  
        );
        const cylinder_shape1 = new PhysicsShapeMesh(
            cylinder_primitive1,
            this.scene  
        );
        const cylinder_shape2 = new PhysicsShapeMesh(
            cylinder_primitive2,
            this.scene  
        );

        const cylinder_aggregate0 = new PhysicsAggregate(cylinder_primitive0,
            cylinder_shape0, { mass: 0 }, this.scene);
        const cylinder_aggregate1 = new PhysicsAggregate(cylinder_primitive1,
            cylinder_shape1, { mass: 0 }, this.scene);
        const cylinder_aggregate2 = new PhysicsAggregate(cylinder_primitive2,
            cylinder_shape2, { mass: 0 }, this.scene);
            
        
        

        
        
    }

    private updateSceneModels() {
        this.scene.onBeforeRenderObservable.add(() => {

        });
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
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
