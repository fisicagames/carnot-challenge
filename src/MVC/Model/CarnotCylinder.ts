import { Mesh, PhysicsAggregate, PhysicsMaterial, PhysicsMotionType, PhysicsShapeMesh, Scene, Vector3 } from "@babylonjs/core";

export class CarnotCylinder {
    private scene: Scene;
    public piston: PhysicsAggregate;

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
        //Initial velocity:
        piston_aggregate2.body.setLinearVelocity(new Vector3(0, -2, 0));
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

    public updatePistonMove() {
        //piston move:
        if (this.piston.transformNode.position.y < 3) {
            this.piston.body.setLinearVelocity(new Vector3(0, 4, 0));
        }
        else if (this.piston.body.transformNode.position.y > 15) {
            this.piston.body.setLinearVelocity(new Vector3(0, -4, 0));
        }
        else {
            this.piston.body.setLinearVelocity(new Vector3(0, 0, 0));
        }
    }


}