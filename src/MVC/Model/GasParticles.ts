import { Color3, Mesh, MeshBuilder, PhysicsAggregate, PhysicsShapeBox, Quaternion, Scene, StandardMaterial, TransformNode, Vector3 } from "@babylonjs/core";

export class GasParticles {
    private scene: Scene;
    private particlesNode: TransformNode;
    private particles: Mesh[] = [];
    private n: number;
    private particleMaterial: StandardMaterial;
    private shapeBox: PhysicsShapeBox;
    private sourceTemperature: number = 180;
    private desiredGasSpeed: number = 20 * this.sourceTemperature / 180;
    private accelerationTemperature: number = 40;
    private currentGasTemperatura1to180: number = 180; //initial
    private static readonly VELOCITY_MIN: number = 1;
    private static readonly VELOCITY_MAX: number = 20;

    constructor(scene: Scene, n: number, pistonY: number) {
        this.scene = scene;
        this.n = n;
        this.particlesNode = new TransformNode("ParticleNode", this.scene);

        // Configurações reutilizáveis
        this.particleMaterial = new StandardMaterial("Particle", this.scene);
        this.particleMaterial.diffuseColor = new Color3(1.0, 1.0, 0.0);
        //const shapeParticle = new PhysicsShapeSphere(new Vector3(0, 0, 0), 0.2, this.scene);

        this.shapeBox = new PhysicsShapeBox(
            new Vector3(0, 0, 0),
            new Quaternion(0, 0, 0, 1),
            new Vector3(0.3, 0.3, 0.3),
            this.scene
        );
        this.shapeBox.material = { friction: 0.0, restitution: 1.0 };

        this.createGasParticles(this.n, pistonY);
    }

    private createSingleParticle(position: Vector3): Mesh {
        const particle = MeshBuilder.CreateSphere(
            `particle_${this.particles.length}`,
            { diameter: 0.8, segments: 4 },
            this.scene
        );

        particle.parent = this.particlesNode;
        particle.material = this.particleMaterial;
        particle.position = position;

        const particlePhysics = new PhysicsAggregate(
            particle,
            this.shapeBox,
            { mass: 1, radius: 0.4 },
            this.scene
        );

        particlePhysics.body?.setLinearDamping(0.0);
        particlePhysics.body?.setAngularDamping(0.0);

        const randomDirection = new Vector3(
            (Math.random() - 0.5),
            (-Math.random()),
            (Math.random() - 0.5)
        ).normalize();
        const initialVelocity = randomDirection.scale(this.desiredGasSpeed);

        particle.physicsBody?.setLinearVelocity(initialVelocity);
        return particle;
    }

    private generateRandomPosition(pistonY: number): Vector3 {
        const xRange = [-5, 5];
        const yRange = [0, pistonY];
        const zRange = [-5, 5];

        return new Vector3(
            xRange[0] + Math.random() * (xRange[1] - xRange[0]),
            yRange[0] + Math.random() * (yRange[1] - yRange[0]),
            zRange[0] + Math.random() * (zRange[1] - zRange[0])
        );
    }

    private createGasParticles(n: number, pistonY: number) {
        const numPerAxis = Math.ceil(Math.cbrt(n));
        const xRange = [-5, 5];
        const yRange = [0, pistonY];
        const zRange = [-5, 5];
        const xStep = (xRange[1] - xRange[0]) / numPerAxis;
        const yStep = (yRange[1] - yRange[0]) / numPerAxis;
        const zStep = (zRange[1] - zRange[0]) / numPerAxis;

        let particleCount = 0;

        for (let i = 0; i < numPerAxis; i++) {
            for (let j = 0; j < numPerAxis; j++) {
                for (let k = 0; k < numPerAxis; k++) {
                    if (particleCount >= n) break;

                    const position = new Vector3(
                        xRange[0] + i * xStep + xStep / 2,
                        yRange[0] + j * yStep + yStep / 2,
                        zRange[0] + k * zStep + zStep / 2
                    );

                    const particle = this.createSingleParticle(position);
                    this.particles.push(particle);
                    particleCount++;
                }
            }
        }
    }

    public updateGasParticleState(pistonY: number) {
        this.updateCurrentGasTemperature();

        const minX = -5.5, maxX = 5.5;
        const minY = -0.5, maxY = pistonY;
        const minZ = -5.5, maxZ = 5.5;

        this.particles.forEach((particle, index) => {
            const position = particle.physicsBody?.transformNode?.position;

            if (!position) {
                return;
            }

            const outOfBounds =
                position.x < minX || position.x > maxX ||
                position.y < minY || position.y > maxY ||
                position.z < minZ || position.z > maxZ;

            if (outOfBounds) {
                particle.physicsBody?.dispose();
                particle.dispose();
                this.particles.splice(index, 1);

                const newParticle = this.createSingleParticle(this.generateRandomPosition(pistonY));
                this.particles.push(newParticle);
            }
            else {
                const velocity = particle.physicsBody?.getLinearVelocity();
                if (velocity) {
                    const speed = velocity.length();
                    if (Math.abs(speed - this.desiredGasSpeed) > this.desiredGasSpeed / 10) {
                        const correctionFactor = this.desiredGasSpeed / speed;
                        const correctedVelocity = velocity.scale(correctionFactor);
                        particle.physicsBody?.setLinearVelocity(correctedVelocity);
                    }
                }
            }
        });
    }
    private updateCurrentGasTemperature() {
        if (Math.abs(this.currentGasTemperatura1to180 - this.sourceTemperature) > 1) {
            this.currentGasTemperatura1to180 += this.accelerationTemperature * Math.sign(this.sourceTemperature - this.currentGasTemperatura1to180) * this.scene.deltaTime/1000;
        }
        this.desiredGasSpeed = GasParticles.VELOCITY_MAX * Math.sqrt(this.currentGasTemperatura1to180/180);
        this.desiredGasSpeed = Math.max(GasParticles.VELOCITY_MIN,this.desiredGasSpeed);
        let hue = 180 - this.currentGasTemperatura1to180; //0 to 180;
        if (hue > 180) {
            hue = 180;
        }
        else if (hue <= 0) {
            hue = 0;
        }
        const saturation = Math.abs(hue - 90) / 90;
        const value = saturation / 2;
        this.particleMaterial.emissiveColor = Color3.FromHSV(hue, saturation, value);
    }
    public setGasSourceTemperature(sourceTemperature: number) {
        this.sourceTemperature = sourceTemperature;
    }

    public getGasCurrentTemperature(){
        return this.currentGasTemperatura1to180;
    }
}
