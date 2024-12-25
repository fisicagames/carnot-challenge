import { Mesh, PhysicsAggregate, PhysicsMaterial, PhysicsMotionType, PhysicsShapeMesh, Scene, Vector3 } from "@babylonjs/core";

export class CarnotCylinder {
    private scene: Scene;
    public piston: PhysicsAggregate;
    private cylinder_aggregate0!: PhysicsAggregate;
    private cylinder_aggregate1!: PhysicsAggregate;
    private pistonYVelocity: number = 1;
    private pistonYAcceleration: number = 1;
    private pistonYPosition: number = 3;
    public pistonIsWorking: boolean = true;


    constructor(scene: Scene) {
        this.scene = scene;
        this.createCylinderWalls();
        this.piston = this.createPiston();
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

    public updatePistonMove(sourceType: number, gasTemperature: number) {
        //piston move:
        if(this.pistonIsWorking){
            if (sourceType !== 0 && this.piston.body.transformNode.position.y < 2) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));             
            }
            else if (sourceType === 0 && this.piston.body.transformNode.position.y > 16) {
                this.piston.body.setMassProperties({ mass: 1 });
                this.cylinder_aggregate0.body.setMassProperties({ mass: 1 });
                this.cylinder_aggregate1.body.setMassProperties({ mass: 1 });
                this.cylinder_aggregate0.body.setMotionType(PhysicsMotionType.DYNAMIC);
                this.cylinder_aggregate1.body.setMotionType(PhysicsMotionType.DYNAMIC);
                this.pistonIsWorking = false;
            }
            else if (sourceType === 1 && this.piston.body.transformNode.position.y >= 16) {
                this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
            }
            else if (sourceType === 0) {
                this.piston.body.setLinearVelocity(new Vector3(0, 2, 0));
            }        
            else if (sourceType === 2){
                this.piston.body.setLinearVelocity(new Vector3(0, -2, 0));
            }
            else if(sourceType === 1){
                
            }            
        }
    }
}