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
        let processName: string = "";
        let pointsAdd: number = 0;
        //piston move:
        if (this.pistonIsWorking) {
            const pistonY = this.piston.body.transformNode.position.y;
            if (pistonY <= CarnotCylinder.VOLUME_MIN) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                processName = "Volume mínimo. \n Perde: -2";
                pointsAdd = -2;
                if(sourceType == 2 && gasTemperature1to180 < 2){
                    this.cylinder_aggregate1.body.setMotionType(PhysicsMotionType.STATIC);
                    const boxMaterial = this.scene.getMaterialByName("Material.001") as StandardMaterial;
                    boxMaterial.emissiveColor = Color3.FromHexString("#0000FF");
                    this.pistonIsWorking = false;
                    processName = "Máquina Congelada! \n Fim de jogo!";
                    pointsAdd = 0;
                    this.onCylinderFrozenCallback();
                }
            }
            if (sourceType !== 0 && pistonY >= CarnotCylinder.VOLUME_MAX &&
                this.piston.body.getLinearVelocity().y !== 0) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                processName = "Volume máximo. \n Perde: -2";
                pointsAdd = -2;
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
                processName = "Máquina fundida!. \n Fim de jogo!";
                pointsAdd = 0;
            }
            else if (sourceType === 1 && pistonY >= CarnotCylinder.VOLUME_MAX) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                processName = "Volume máximo. \n Perde: -2";
                pointsAdd = -2;
            }
            else if (sourceType === 0 && gasTemperature1to180 > 179) {
                this.piston.body.setLinearVelocity(new Vector3(0, this.pistonYVelocityIsothermal, 0));
                processName = "Expansão Isotérmica. \n Ganha: 2";
                pointsAdd = 2;                
            }
            else if (sourceType === 2 && gasTemperature1to180 < 2) {
                if(pistonY > CarnotCylinder.VOLUME_MIN){
                    this.piston.body.setLinearVelocity(new Vector3(0, -this.pistonYVelocityIsothermal, 0));
                    processName = "Compressão Isotérmica. \n Ganha: 2";
                    pointsAdd = 2; 
                }                                
            }
            else if (sourceType === 1 && sourceTypeIndex == 0) {
                if (pistonY >= CarnotCylinder.VOLUME_MAX) {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 06");
                    processName = "Volume máximo. \n Perde: -2";
                    pointsAdd = -2; 
                }
                else if(gasTemperature1to180 > 2){
                    this.piston.body.setLinearVelocity(new Vector3(0, this.pistonYVelocityAdiabatic, 0));
                    processName = "Expansão Adiabática. \n Ganha: 2";
                    pointsAdd = 2; 
                }
                else{
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 07b: Baixa pressão.");
                    processName = "Baixa pressão. \n Perde: -2";
                    pointsAdd = -2; 
                }
                
            }
            else if (sourceType === 1 && sourceTypeIndex == 2) {
                if (pistonY <= CarnotCylinder.VOLUME_MIN) {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    processName = "Volume mínimo. \n Perde: -2";
                    pointsAdd = -2; 
                }
                else if (gasTemperature1to180 < 179){
                    this.piston.body.setLinearVelocity(new Vector3(0, -this.pistonYVelocityAdiabatic, 0));
                    //console.log("if 09a: Compressão adiabática");
                    processName = "Compressão Adiabática. \n Ganha: 2";
                    pointsAdd = 2; 
                }
                else {
                    this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
                    //console.log("if 09b: Estado em Equilíbrio.");
                    processName = "Máquina parada. \n Perde: -2";
                    pointsAdd = -2; 

                }
            }
            else {
                if(this.piston.body.getLinearVelocity().y > 0){
                    processName = "Expansão não Adiabática. \n Perde: 4";
                    pointsAdd = -4; 
                }
                else{
                    processName = "Compressão não Adiabática. \n Perde: 4";
                    pointsAdd = -4; 
                }                
            }
            this.frameCount++;
   
            if (this.frameCount % 10 === 0) {
                this.realTimeGraph.updateGraph(pistonY, gasTemperature1to180, 5);
            } 
            if(this.onUpdateScoreCallback){
                this.onUpdateScoreCallback(pointsAdd,processName);
            }    
        }

    }
    public setCylinderFrozenCallback(callback: () => void) {
        this.onCylinderFrozenCallback = callback;
    }
    public setUpdateScoreCallback(callback: (newScore: number, state: string) => void) {
        this.onUpdateScoreCallback = callback;
    }
}