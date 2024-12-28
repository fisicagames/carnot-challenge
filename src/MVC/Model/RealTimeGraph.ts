import { LinesMesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

export class RealTimeGraph{
    private scene: Scene;
    private pointsChart: Vector3[];
    private linesMeshChart: LinesMesh;

    constructor(scene: Scene){
        this.scene = scene;
        this.pointsChart = Array(200).fill(new Vector3(-9.99, 27.14, 5));
        this.linesMeshChart = MeshBuilder.CreateLines("lines", { points: this.pointsChart, updatable: true }, this.scene);
    }

    public updateGraph(x: number, y: number, z: number){
        this.pointsChart.shift();
        const normalizedX = this.normalize(x, 2, 16, -10, 10);
        const ratio = (y+273) / (x+5);
        const normalizedY = this.normalize(ratio, 13, 64, 17, 27);
        this.pointsChart.push(new Vector3(normalizedX, normalizedY, z));
        this.linesMeshChart = MeshBuilder.CreateLines("lines", { points: this.pointsChart, instance: this.linesMeshChart }, this.scene);
    }
    
    private normalize(value: number, minInput: number, maxInput: number, minOutput: number, maxOutput: number): number {
        return minOutput + (value - minInput) * (maxOutput - minOutput) / (maxInput - minInput);
    }

}