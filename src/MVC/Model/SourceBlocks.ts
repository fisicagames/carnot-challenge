import { Color3, GlowLayer, MeshBuilder, Scene, StandardMaterial } from "@babylonjs/core";

export class SourceBlocks {
    private scene: Scene;
    private sourceTypes: number[] = [1, 2, 1, 0];
    private sourceTypeIndex: number = 2;
    private sourceType: number = 1;

    private sourceBlockMaterial!: StandardMaterial;
    private gl!: GlowLayer;    

    constructor(scene: Scene) {
        this.scene = scene;

        this.createSources();

    }

    private createSources() {
        const sourceBlock = MeshBuilder.CreateBox("HotBlock",
            { width: 20, height: 7, depth: 14 });
        this.sourceBlockMaterial = new StandardMaterial("SourceBlockMaterial", this.scene);
        this.sourceBlockMaterial.diffuseColor = Color3.FromHexString("#9F9F9F");
        this.sourceBlockMaterial.emissiveColor = Color3.FromHexString("#2C2C2C");
        sourceBlock.material = this.sourceBlockMaterial;

        sourceBlock.position.y = - 5;
        this.gl = new GlowLayer("glow", this.scene);
        this.gl.intensity = 1.0;
    }

    public changeSourceTypes() {
        this.sourceTypeIndex = (this.sourceTypeIndex + 1) % this.sourceTypes.length;

        this.sourceType = this.sourceTypes[this.sourceTypeIndex];

        switch (this.sourceType) {
            case 0: //Hot
                this.sourceBlockMaterial.diffuseColor = Color3.FromHexString("#8B8B1A");
                this.sourceBlockMaterial.emissiveColor = new Color3(1.0, 0.0, 0.0);
                this.gl.intensity = 2.0;
                break;
            case 1: //Isolating
                this.sourceBlockMaterial.diffuseColor = Color3.FromHexString("#9F9F9F");
                this.sourceBlockMaterial.emissiveColor = Color3.FromHexString("#2C2C2C");
                this.gl.intensity = 1.0;
                break;
            case 2: //Cold
                this.sourceBlockMaterial.diffuseColor = new Color3(1.0, 1.0, 1.0);
                this.sourceBlockMaterial.emissiveColor = Color3.FromHexString("#00C1FF");
                this.gl.intensity = 0.5;
                break;
        }
        return this.sourceType;
    }
    public getSourceType(): number {
        return this.sourceType;
    }
    public getSourceTypeIndex(): number {
        return this.sourceTypeIndex;
    }
    public resetSource(){
        this.sourceTypeIndex = 1;
        this.changeSourceTypes();
    }
}