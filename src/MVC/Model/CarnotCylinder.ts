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

    constructor(scene: Scene) {
        this.scene = scene;
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
                //console.log("if 01a: Volume mínimo.");
                if(sourceType == 2 && gasTemperature1to180 < 2){
                    this.cylinder_aggregate1.body.setMotionType(PhysicsMotionType.STATIC);
                    const boxMaterial = this.scene.getMaterialByName("Material.001") as StandardMaterial;
                    boxMaterial.emissiveColor = Color3.FromHexString("#0000FF");
                    this.pistonIsWorking = false;
                    //console.log("if 02: Máquina Congelada!");
                    this.onCylinderFrozenCallback();
                }
            }
            if (sourceType !== 0 && pistonY >= CarnotCylinder.VOLUME_MAX &&
                this.piston.body.getLinearVelocity().y !== 0) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                //console.log("if 01b: Volume máximo.");
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
                //console.log("if 02: Máquina Fundida!");
            }
            else if (sourceType === 1 && pistonY >= CarnotCylinder.VOLUME_MAX) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                //console.log("if 03: Volume máximo.");
            }
            else if (sourceType === 0 && gasTemperature1to180 > 179) {
                this.piston.body.setLinearVelocity(new Vector3(0, this.pistonYVelocityIsothermal, 0));
                //console.log("if 04: Expansão Isotérmica.");
            }
            else if (sourceType === 2 && gasTemperature1to180 < 2) {
                if(pistonY > CarnotCylinder.VOLUME_MIN){
                    this.piston.body.setLinearVelocity(new Vector3(0, -this.pistonYVelocityIsothermal, 0));
                    //console.log("if 05: Compressão isotérmica.");
                }                                
            }
            else if (sourceType === 1 && sourceTypeIndex == 0) {
                if (pistonY >= CarnotCylinder.VOLUME_MAX) {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 06");
                }
                else if(gasTemperature1to180 > 2){
                    this.piston.body.setLinearVelocity(new Vector3(0, this.pistonYVelocityAdiabatic, 0));
                    //console.log("if 07a: Expansão adiabática.");
                }
                else{
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 07b: Baixa pressão.");
                }
                
            }
            else if (sourceType === 1 && sourceTypeIndex == 2) {
                if (pistonY <= CarnotCylinder.VOLUME_MIN) {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 08: Volume mínimo.");
                }
                else if (gasTemperature1to180 < 179){
                    this.piston.body.setLinearVelocity(new Vector3(0, -this.pistonYVelocityAdiabatic, 0));
                    //console.log("if 09a: Compressão adiabática");
                }
                else {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 09b: Estado em Equilíbrio.");
                }
            }
            else {
                if(this.piston.body.getLinearVelocity().y > 0){
                    //console.log("if 12a: Expansão não adiabática")
                }
                else{
                    //console.log("if 12b: Compressão não adiabática")
                }                
            }
            //console.log(gasTemperature1to180,pistonY,sourceTypeIndex);
            this.frameCount++;
    
            if (this.frameCount % 10 === 0) {
                this.realTimeGraph.updateGraph(pistonY, gasTemperature1to180, 5);
                
            }            
        }
    }
    public setCylinderFrozenCallback(callback: () => void) {
        this.onCylinderFrozenCallback = callback;
    }
}