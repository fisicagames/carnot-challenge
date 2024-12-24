import { Mesh, PhysicsAggregate, PhysicsMaterial, PhysicsMotionType, PhysicsShapeMesh, Scene, Vector3 } from "@babylonjs/core";

export class CarnotCylinder {
    private scene: Scene;
    public piston: PhysicsAggregate;
    private pistonYVelocity: number = 1;
    private pistionYAcceleration: number = 1;
    private pistonYPosition: number = 3;


    constructor(scene: Scene) {
        this.scene = scene;
        this.createCylinderWalls();
        this.piston = this.createPiston();
    }

    private createCylinderWalls() {

        const cylinder_aggregate0 = this.createPhysics("Cylinder_primitive0");
        cylinder_aggregate0.body.setMotionType(PhysicsMotionType.STATIC);
        const cylinder_aggregate1 = this.createPhysics("Cylinder_primitive1");
        cylinder_aggregate1.body.setMotionType(PhysicsMotionType.STATIC);
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
        if (sourceType === 0){
            this.piston.body.setLinearVelocity(new Vector3(0, 1, 0));
        }
        if (this.piston.transformNode.position.y < 3) {
            this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
        }
        else if (sourceType === 0 && this.piston.body.transformNode.position.y > 16) {
            this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
            const randomImpulse = new Vector3(
                (Math.random() - 0.5) * 200,
                600,
                (Math.random() - 0.5) * 200
            );
            this.piston.body.applyImpulse(randomImpulse, this.piston.body.transformNode.position);
        }
        else if (sourceType !== 0 && this.piston.body.transformNode.position.y > 16) {
            this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
        }
        else {
            //this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
        }
    }


}