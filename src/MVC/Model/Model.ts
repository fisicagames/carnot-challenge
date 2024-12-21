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
        this.backgroundMusic.setVolume(0.7);
        this.allSounds.push(this.backgroundMusic);

        //cylinder
        const createCylinderPhysics = (meshName: string, material: object): PhysicsAggregate => {
            const mesh = this.scene.getMeshByName(meshName) as Mesh;
            const shape = new PhysicsShapeMesh(mesh, this.scene);
            shape.material = material;
            return new PhysicsAggregate(mesh, shape, { mass: 0 }, this.scene);
        };
        const cylinderMaterial = { friction: 2.0, restitution: 0.5 }; // Ajuste os valores conforme necessário
        const cylinder_aggregate0 = createCylinderPhysics("Cylinder_primitive0", cylinderMaterial);
        const cylinder_aggregate1 = createCylinderPhysics("Cylinder_primitive1", cylinderMaterial);
        const cylinder_aggregate2 = createCylinderPhysics("Cylinder_primitive2", cylinderMaterial);
        const cylinder_001_agregate = createCylinderPhysics("Cylinder.001", cylinderMaterial);



        //gas particle
        const shapeParticle = new PhysicsShapeSphere(new Vector3(0, 0, 0), 0.5, scene);
        const shapeBox = new PhysicsShapeBox(
            new Vector3(0, 0, 0),        // center of the box
            new Quaternion(0, 0, 0, 1),  // rotation of the box
            new Vector3(1, 1, 1),        // dimensions of the box
            scene                                // scene of the shape
        );
        const particlePhysicsMaterial = { friction: 1.0,
                                          restitution: 1.0,                                          
                                        };
        shapeParticle.material = particlePhysicsMaterial;

        const particleMaterial = new StandardMaterial("Particle",this.scene);
        particleMaterial.diffuseColor = new Color3(1.0, 1.0, 0.0);

        for (let i = 0; i < 150; i++) {
            const particle = MeshBuilder.CreateSphere(`particle_${i}`, { diameter: 0.4, segments: 16 }, this.scene);
            particle.material = particleMaterial;
            particle.position = new Vector3(Math.random() * 10-5, Math.random() * 13, Math.random() * 10 -5);
            const particlePhysics = new PhysicsAggregate(
                particle,
                shapeParticle, // Forma física de esfera
                { mass: 1, radius: 0.4 }, // Ajuste o raio de acordo
                this.scene
            );
            particle.physicsBody?.setAngularDamping(1.0);

            this.particles.push(particle);
        }

        this.updateSceneModels();


    }

    private updateSceneModels() {
        this.scene.onBeforeRenderObservable.add(() => {
            const desiredSpeed = 20;

            this.particles.forEach((particle) => {

                const angularVelocity = particle.physicsBody?.getAngularVelocity();
                if (angularVelocity) {
                    // Zerando a velocidade angular para impedir a rotação
                    particle.physicsBody?.setAngularVelocity(Vector3.Zero());
                }
                
                const velocity = particle.physicsBody?.getLinearVelocity();
                //particle.physicsBody?.applyForce(new Vector3(0, 20.8, 0), particle.position);
                if (velocity) {
                    const speed = velocity.length();
                    if (Math.abs(speed - desiredSpeed) > 0.1) {
                        const correctionFactor = desiredSpeed / speed;
                        const correctedVelocity = velocity.scale(correctionFactor);
                        particle.physicsBody?.setLinearVelocity(correctedVelocity);
                    }
                }
            });
            this.particles.forEach((particle) => {
                const randomForce = new Vector3(
                    (Math.random() - 0.5) * 1,
                    (Math.random() - 0.5) * 1,
                    (Math.random() - 0.5) * 1
                );
                particle.physicsBody?.applyImpulse(randomForce, particle.getAbsolutePosition());
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
