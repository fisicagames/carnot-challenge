import { Color3, GlowLayer, MeshBuilder, Scene, StandardMaterial } from "@babylonjs/core";

export class SourceBlocks {
    private scene: Scene;
    private sourceTypes: number[] = [1, 2, 1, 0];
    private sourceTypeIndex: number = 2;
    private sourceType: number = 1;
    private sourceBlockMaterial!: StandardMaterial;

    constructor(scene: Scene) {
        this.scene = scene;

        this.createSources();

    }

    private createSources() {
        const sourceBlock = MeshBuilder.CreateBox("HotBlock",
            { width: 20, height: 7, depth: 14 });
        this.sourceBlockMaterial = new StandardMaterial("SourceBlockMaterial", this.scene);
        this.sourceBlockMaterial.diffuseColor = new Color3(1.0, 1.0, 0.0);
        this.sourceBlockMaterial.emissiveColor = new Color3(0.1, 0.1, 0.1);
        sourceBlock.material = this.sourceBlockMaterial;

        sourceBlock.position.y = - 5;
        const gl = new GlowLayer("glow", this.scene);

        gl.intensity = 1.0;
    }

    public changeSourceTypes() {
        this.sourceTypeIndex = (this.sourceTypeIndex + 1) % this.sourceTypes.length;

        this.sourceType = this.sourceTypes[this.sourceTypeIndex];

        switch (this.sourceType) {
            case 0: //Hot
                this.sourceBlockMaterial.diffuseColor = new Color3(1.0, 1.0, 0.0);
                this.sourceBlockMaterial.emissiveColor = new Color3(1.0, 0.0, 0.0);
                break;
            case 1: //Isolating
                this.sourceBlockMaterial.diffuseColor = new Color3(1.0, 1.0, 0.0);
                this.sourceBlockMaterial.emissiveColor = new Color3(0.1, 0.1, 0.1);
                break;
            case 2: //Cold
                this.sourceBlockMaterial.diffuseColor = new Color3(0.0, 0.0, 1.0);
                this.sourceBlockMaterial.emissiveColor = new Color3(0.0, 0.0, 1.0);
                break;
        }
    }
}