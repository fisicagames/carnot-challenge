import { Scene, HavokPlugin, MeshBuilder, Vector3, Mesh, PhysicsAggregate, PhysicsShapeType, TransformNode, PhysicsShapeMesh, PhysicsShapeSphere, PhysicsShapeBox, Quaternion, StandardMaterial, Color3 } from "@babylonjs/core";
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
    private particles: Mesh[] = [];;


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
        this.backgroundMusic.setVolume(1.0);
        this.allSounds.push(this.backgroundMusic);

        //cylinder
        const createCylinderPhysics = (meshName: string, material: object): PhysicsAggregate => {
            const mesh = this.scene.getMeshByName(meshName) as Mesh;
            const shape = new PhysicsShapeMesh(mesh, this.scene);
            shape.material = material;
            return new PhysicsAggregate(mesh, shape, { mass: 0 }, this.scene);
        };
        const cylinderMaterial = { friction: 0.0, restitution: 1.2 }; // Ajuste os valores conforme necessário
        const cylinder_aggregate0 = createCylinderPhysics("Cylinder_primitive0", cylinderMaterial);
        const cylinder_aggregate1 = createCylinderPhysics("Cylinder_primitive1", cylinderMaterial);
        const cylinder_aggregate2 = createCylinderPhysics("Cylinder_primitive2", cylinderMaterial);
        //const cylinder_001_agregate = createCylinderPhysics("Cylinder.001", cylinderMaterial);



        //gas particle
        //const shapeParticle = new PhysicsShapeSphere(new Vector3(0, 0, 0), 0.5, scene);
        const shapeBox = new PhysicsShapeBox(
            new Vector3(0, 0, 0),        // center of the box
            new Quaternion(0, 0, 0, 1),  // rotation of the box
            new Vector3(1, 1, 1),        // dimensions of the box
            scene                                // scene of the shape
        );
        //const particlePhysicsMaterial = { friction: 0.0,
        //                                  restitution: 1.0,                                          
        //                                };
        //shapeParticle.material = particlePhysicsMaterial;
        //shapeBox.material = particlePhysicsMaterial;

        const particleMaterial = new StandardMaterial("Particle",this.scene);
        particleMaterial.diffuseColor = new Color3(1.0, 1.0, 0.0);

        for (let i = 0; i < 100; i++) {
            const particle = MeshBuilder.CreateSphere(`particle_${i}`, { diameter: 0.8, segments: 16 }, this.scene);
            particle.material = particleMaterial;
            particle.position = new Vector3(Math.random() * 10-5, Math.random() * 13, Math.random() * 10 -5);
            const particlePhysics = new PhysicsAggregate(
                particle,
                shapeBox, // Forma física de esfera shapeBox ou shapeParticle
                { mass: 1, radius: 0.4 }, // Ajuste o raio de acordo
                this.scene
            );
            this.particles.push(particle);
        }

        this.updateSceneModels();


    }

    private updateSceneModels() {
        this.scene.onBeforeRenderObservable.add(() => {
            const desiredSpeed = 5;

            this.particles.forEach((particle) => {
                const velocity = particle.physicsBody?.getLinearVelocity();
            
               if(velocity) {
                    const speed = velocity.length();
                    if (Math.abs(speed - desiredSpeed) > 0.1) {
                        const correctionFactor = desiredSpeed / speed;
                        const correctedVelocity = velocity.scale(correctionFactor);
                        particle.physicsBody?.setLinearVelocity(correctedVelocity);
                    }
                }
            });
            
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
