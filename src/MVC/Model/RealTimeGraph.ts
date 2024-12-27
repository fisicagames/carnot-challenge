import { LinesMesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

export class RealTimeGraph{
    private scene: Scene;
    private pointsChart: Vector3[];
    private linesMeshChart: LinesMesh;

    constructor(scene: Scene){
        this.scene = scene;
        this.pointsChart = Array(1000).fill(new Vector3(-10, 25, 5));
        this.linesMeshChart = MeshBuilder.CreateLines("lines", { points: this.pointsChart, updatable: true }, this.scene);
    }

    public updateGraph(x: number, y: number, z: number){
        this.pointsChart.shift();
        //this.pointsChart.push(new Vector3(normalizedX, normalizedY, 5));
        this.pointsChart.push(new Vector3(x, y, z));
        this.linesMeshChart = MeshBuilder.CreateLines("lines", { points: this.pointsChart, instance: this.linesMeshChart }, this.scene);
    }

}