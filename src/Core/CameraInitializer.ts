import { Scene, Vector3, FollowCamera, UniversalCamera, AbstractMesh } from "@babylonjs/core";

export class CameraInitializer {
    public static createFollowCamera(scene: Scene, targetMesh: AbstractMesh | null = null): FollowCamera {
        const camera = new FollowCamera("FollowCam", new Vector3(-40, 5, 0), scene);
        camera.radius = 30;
        camera.heightOffset = 10;
        camera.rotationOffset = 0;
        camera.cameraAcceleration = 0.01;
        camera.maxCameraSpeed = 100;
        camera.lockedTarget = targetMesh;
        return camera;
    }

    public static createUniversalCamera(scene: Scene, canvas?: HTMLCanvasElement): UniversalCamera {
        const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 21, -50), scene);
        //camera.setTarget(Vector3.Zero());
        camera.setTarget(new Vector3(0, 5.31, 7.84));
        //TODO: [x] Add or remove the attachControl bellow to control the camera with mouse:
        if(canvas){
            camera.attachControl(canvas, true);
        }
        return camera;
    }
}