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
        const xRange = [-5, 5];
        const yRange = [0, 13];
        const zRange = [-5, 5];
        const numPerAxis = Math.ceil(Math.cbrt(n));
        const xStep = (xRange[1] - xRange[0]) / numPerAxis;
        const yStep = (yRange[1] - yRange[0]) / numPerAxis;
        const zStep = (zRange[1] - zRange[0]) / numPerAxis;    
        let particleCount = 0;


        for (let i = 0; i < numPerAxis; i++) {
            for (let j = 0; j < numPerAxis; j++) {
                for (let k = 0; k < numPerAxis; k++) {
                    if (particleCount >= n) break;
    
                    // Calcula a posição baseada na grade
                    const x = xRange[0] + i * xStep + xStep / 2;
                    const y = yRange[0] + j * yStep + yStep / 2;
                    const z = zRange[0] + k * zStep + zStep / 2;
    
                    const particle = MeshBuilder.CreateSphere(
                        `particle_${particleCount}`,
                        { diameter: 0.7, segments: 8 },
                        this.scene
                    );
    
                    particle.parent = this.particlesNode;
                    particle.material = particleMaterial;
                    particle.position = new Vector3(x, y, z);
    
                    const particlePhysics = new PhysicsAggregate(
                        particle,
                        shapeBox,
                        { mass: 1, radius: 0.8 },
                        this.scene
                    );
                    this.particles.push(particle);
    
                    const randomForce = new Vector3(
                        (Math.random() - 0.5),
                        (Math.random() - 0.5),
                        (Math.random() - 0.5) 
                    );
                    particle.physicsBody?.applyImpulse(randomForce, particle.getAbsolutePosition());
    
                    particleCount++;
                }
            }
        }
    }

    public updateGasParticleState(pistonY: number){
        const desiredSpeed = 15 * (3-(1.9+pistonY));

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
    }
}
