import { Color3, LinesMesh, Mesh, MeshBuilder, PhysicsAggregate, PhysicsMaterial, PhysicsMotionType, PhysicsShapeMesh, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { RealTimeGraph } from "./RealTimeGraph";

export class CarnotCylinder {
    private scene: Scene;
    public piston: PhysicsAggregate;
    private cylinder_aggregate0!: PhysicsAggregate;
    private cylinder_aggregate1!: PhysicsAggregate;
    private pistonYVelocityIsothermal: number = 1.0;
    private pistonYVelocityAdiabatic: number = 1.5;
    private pistonYPosition: number = 3;
    public pistonIsWorking: boolean = true;
    private static readonly VOLUME_MAX: number = 16;
    private static readonly VOLUME_MIN: number = 2;
    private onCylinderFrozenCallback!: (() => void);
    private frameCount: number = 0;
    private realTimeGraph: RealTimeGraph;
    public onUpdateScoreCallback?: ((score: number, state: string) => void);
    private lastVolume: number = 2;
    private processName: string = "";
    private pointsAdd: number = 0;
    private onPistonExplosionCallback!: (() => void);

    public setPistonExplosionCallback(callback: () => void) {
        this.onPistonExplosionCallback = callback;
    }

    constructor(scene: Scene) {
        this.scene = scene;
        const meshPiston = this.scene.getMeshByName("Cylinder.001") as Mesh;
        meshPiston.position.y = 2;
        this.createCylinderWalls();
        this.piston = this.createPiston();
        this.realTimeGraph = new RealTimeGraph(this.scene);
    }

    private createCylinderWalls() {
        this.cylinder_aggregate0 = this.createPhysics("Cylinder_primitive0");
        this.cylinder_aggregate0.body.setMotionType(PhysicsMotionType.STATIC);
        this.cylinder_aggregate1 = this.createPhysics("Cylinder_primitive1");
        this.cylinder_aggregate1.body.setMotionType(PhysicsMotionType.STATIC);
    }

    private createPiston() {
        const piston_aggregate2 = this.createPhysics("Cylinder.001");
        piston_aggregate2.body.setMotionType(PhysicsMotionType.DYNAMIC);
        this.pistonYPosition = piston_aggregate2.body.transformNode.position.y;
        return piston_aggregate2;
    }

    private createPhysics(meshName: string): PhysicsAggregate {
        const mesh = this.scene.getMeshByName(meshName) as Mesh;
        const shape = new PhysicsShapeMesh(mesh, this.scene);
        shape.material = { friction: 0.0, restitution: 1.0 };
        return new PhysicsAggregate(mesh, shape, { mass: 0 }, this.scene);
    }

    public getPistonY(): number {
        return this.piston.body.transformNode.position.y;
    }

    public updatePistonMove(sourceType: number, sourceTypeIndex: number, gasTemperature1to180: number) {
        //piston move:
        if (this.pistonIsWorking) {
            const pistonY = this.piston.body.transformNode.position.y;
            if (pistonY <= CarnotCylinder.VOLUME_MIN) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                this.processName = "Volume mínimo.";
                if (sourceType == 2 && gasTemperature1to180 < 2) {
                    this.cylinder_aggregate1.body.setMotionType(PhysicsMotionType.STATIC);
                    const boxMaterial = this.scene.getMaterialByName("Material.001") as StandardMaterial;
                    boxMaterial.emissiveColor = Color3.FromHexString("#0000FF");
                    this.pistonIsWorking = false;
                    this.processName = "Máquina Congelada! \n Fim de jogo!";
                    this.onCylinderFrozenCallback();
                }
            }
            if (sourceType !== 0 && pistonY >= CarnotCylinder.VOLUME_MAX &&
                this.piston.body.getLinearVelocity().y !== 0) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                this.processName = "Volume máximo! \n Pistão emperrado!\n Fim de jogo!";
                this.pistonIsWorking = false;
            }
            else if (sourceType === 0 && pistonY > CarnotCylinder.VOLUME_MAX && gasTemperature1to180 > 170) {
                this.piston.body.setMassProperties({ mass: 1 });
                this.cylinder_aggregate0.body.setMassProperties({ mass: 1 });
                this.cylinder_aggregate1.body.setMassProperties({ mass: 1 });
                this.cylinder_aggregate0.body.setMotionType(PhysicsMotionType.DYNAMIC);
                this.cylinder_aggregate1.body.setMotionType(PhysicsMotionType.DYNAMIC);
                const boxMaterial = this.scene.getMaterialByName("Material.001") as StandardMaterial;
                boxMaterial.emissiveColor = Color3.FromHexString("#530000");

                this.pistonIsWorking = false;
                this.processName = "Máquina fundida!. \n Fim de jogo!";
                this.onPistonExplosionCallback();
            }
            else if (sourceType === 1 && pistonY >= CarnotCylinder.VOLUME_MAX) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                this.processName = "Volume máximo! \n Pistão emperrado!\n Fim de jogo!";
                this.pistonIsWorking = false;
            }
            else if (sourceType === 0 && gasTemperature1to180 > 179) {
                this.piston.body.setLinearVelocity(new Vector3(0, this.pistonYVelocityIsothermal, 0));
                this.processName = "Expansão Isotérmica.";
            }
            else if (sourceType === 2 && gasTemperature1to180 < 2) {
                if (pistonY > CarnotCylinder.VOLUME_MIN) {
                    this.piston.body.setLinearVelocity(new Vector3(0, -this.pistonYVelocityIsothermal, 0));
                    this.processName = "Compressão Isotérmica.";
                }
            }
            else if (sourceType === 1 && sourceTypeIndex == 0) {
                if (pistonY >= CarnotCylinder.VOLUME_MAX) {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 06");
                    this.processName = "Volume máximo! \n Pistão emperrado!\n Fim de jogo!";
                    this.pistonIsWorking = false;
                }
                else if (gasTemperature1to180 > 2) {
                    this.piston.body.setLinearVelocity(new Vector3(0, this.pistonYVelocityAdiabatic, 0));
                    this.processName = "Expansão Adiabática.";
                }
                else {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 07b: Baixa pressão.");
                    this.processName = "Baixa pressão.";
                }

            }
            else if (sourceType === 1 && sourceTypeIndex == 2) {
                if (pistonY <= CarnotCylinder.VOLUME_MIN) {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    this.processName = "Volume mínimo.";
                }
                else if (gasTemperature1to180 < 179) {
                    this.piston.body.setLinearVelocity(new Vector3(0, -this.pistonYVelocityAdiabatic, 0));
                    //console.log("if 09a: Compressão adiabática");
                    this.processName = "Compressão Adiabática.";
                }
                else {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 09b: Estado em Equilíbrio.");
                    this.processName = "Máquina parada.";
                }
            }
            else {
                if (this.piston.body.getLinearVelocity().y > 0) {
                    this.processName = "Expansão não Adiabática.";
                }
                else {
                    this.processName = "Compressão não Adiabática.";
                }
            }
            this.frameCount++;

            if (this.frameCount % 10 === 0) {
                this.realTimeGraph.updateGraph(pistonY, gasTemperature1to180, 5);
                const deltaVolume = pistonY - this.lastVolume
                const pressure = (gasTemperature1to180 + 273) / (pistonY + 5);
                const work = pressure * deltaVolume;
                this.lastVolume = pistonY;
                if (this.onUpdateScoreCallback) {
                    this.onUpdateScoreCallback(work, this.processName + `\n Trabalho: ${work.toFixed(1)} J`);
                }
            }
        }
        else {
            if (this.onUpdateScoreCallback) {
                this.onUpdateScoreCallback(0, this.processName);
            }
        }
    }
    public setCylinderFrozenCallback(callback: () => void) {
        this.onCylinderFrozenCallback = callback;
    }
    public setUpdateScoreCallback(callback: (newScore: number, state: string) => void) {
        this.onUpdateScoreCallback = callback;
    }

    public resetCylinder() {

        //this.cylinder_aggregate1 = this.createPhysics("Cylinder_primitive1");
        this.cylinder_aggregate0.body.disablePreStep = false
        this.cylinder_aggregate0.body.setMotionType(PhysicsMotionType.ANIMATED);
        const cMesh0 = this.scene.getMeshByName("Cylinder_primitive0") as Mesh;
        cMesh0.position = new Vector3(0, 0, 0);
        cMesh0.rotation = new Vector3(0, 0, 0);
        this.cylinder_aggregate0.body.setAngularVelocity(Vector3.Zero());
        this.cylinder_aggregate0.body.setLinearVelocity(Vector3.Zero());

        this.cylinder_aggregate1.body.disablePreStep = false
        this.cylinder_aggregate1.body.setMotionType(PhysicsMotionType.ANIMATED);
        const cMesh1 = this.scene.getMeshByName("Cylinder_primitive1") as Mesh;
        cMesh1.position = new Vector3(0, 0, 0);
        cMesh0.rotation = new Vector3(0, 0, 0);
        this.cylinder_aggregate1.body.setAngularVelocity(Vector3.Zero());
        this.cylinder_aggregate1.body.setLinearVelocity(Vector3.Zero());


        this.scene.onBeforeRenderObservable.addOnce(() => {
            this.cylinder_aggregate0.body.disablePreStep = true;
            this.cylinder_aggregate0.body.setMotionType(PhysicsMotionType.STATIC);
            this.cylinder_aggregate1.body.disablePreStep = true;
            this.cylinder_aggregate1.body.setMotionType(PhysicsMotionType.STATIC);


            console.log("Reset Cylinders");

        })
    }
    public resetPiston() {
        this.piston.body.disablePreStep = false
        this.piston.body.setMotionType(PhysicsMotionType.ANIMATED);
        this.piston.body.transformNode.position = new Vector3(0, 2, 0);
        this.piston.body.transformNode.rotation = new Vector3(0, 0, Math.PI);
        this.piston.body.setAngularVelocity(Vector3.Zero());
        this.piston.body.setLinearVelocity(Vector3.Zero());

        this.scene.onBeforeRenderObservable.addOnce(() => {
            this.piston.body.setMotionType(PhysicsMotionType.DYNAMIC);
            this.piston.body.disablePreStep = true;
            console.log("Reset Piston");
        })
    }
}