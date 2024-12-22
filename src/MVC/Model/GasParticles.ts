import { Color3, Mesh, MeshBuilder, PhysicsAggregate, PhysicsShapeBox, PhysicsShapeSphere, Quaternion, Scene, StandardMaterial, TransformNode, Vector3 } from "@babylonjs/core";

export class GasParticles {
    private scene: Scene;
    private particlesNode: TransformNode;
    private particles: Mesh[] = [];
    private n: number;

    constructor(scene: Scene, n: number) {
        this.scene = scene;
        this.n = n;
        this.particlesNode = new TransformNode("ParticleNode", this.scene);
        this.createGasParticles(this.n);
        //gas particle

    }
    createGasParticles(n: number) {
        //const shapeParticle = new PhysicsShapeSphere(new Vector3(0, 0, 0), 0.2, this.scene);
        const shapeBox = new PhysicsShapeBox(
            new Vector3(0, 0, 0),        // center of the box
            new Quaternion(0, 0, 0, 1),  // rotation of the box
            new Vector3(0.3, 0.3, 0.3),        // dimensions of the box
            this.scene                                // scene of the shape
        );
        const particlePhysicsMaterial = {
            friction: 0.0,
            restitution: 1.0,
        };
        //shapeParticle.material = particlePhysicsMaterial;
        shapeBox.material = particlePhysicsMaterial;

        const particleMaterial = new StandardMaterial("Particle", this.scene);
        particleMaterial.diffuseColor = new Color3(1.0, 1.0, 0.0);

        //Box limits: x: -5.5 5.5, y: -0.5 16.5, z: -5.5 5.5.
        for (let i = 0; i < n; i++) {
            const particle = MeshBuilder.CreateSphere(`particle_${i}`, { diameter: 0.7, segments: 8 }, this.scene);

            particle.parent = this.particlesNode;
            particle.material = particleMaterial;
            particle.position = new Vector3(Math.random() * 10 - 5, Math.random() * 13, Math.random() * 10 - 5);
            const particlePhysics = new PhysicsAggregate(
                particle,
                shapeBox, // Forma física de esfera shapeBox ou shapeParticle
                { mass: 1, radius: 0.8 }, // Ajuste o raio de acordo
                this.scene
            );
            this.particles.push(particle);
        }
    }

    public updateGasParticleState(pistonY: number){
        const desiredSpeed = 5 * (3-(1.9+pistonY));

            this.particles.forEach((particle) => {
                const velocity = particle.physicsBody?.getLinearVelocity();
            
               if(velocity) {
                    const speed = velocity.length();
                    if (Math.abs(speed - desiredSpeed) > 0.1) {
                        const correctionFactor = desiredSpeed / speed;
                        const correctedVelocity = velocity.scale(correctionFactor);
                        particle.physicsBody?.setLinearVelocity(correctedVelocity);
                    }
                    /*const randomForce = new Vector3(
                        (Math.random() - 0.5) * 0,
                        (Math.random() - 0.5) * 3,
                        (Math.random() - 0.5) * 0
                    );
                    particle.physicsBody?.applyImpulse(randomForce, particle.getAbsolutePosition());
                    */
                }
            });
    }
}
