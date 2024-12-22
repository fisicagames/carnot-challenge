import { Color3, GlowLayer, MeshBuilder, Scene, StandardMaterial } from "@babylonjs/core";

export class SourceBlocks{
    private scene: Scene;
    
    constructor(scene: Scene){
        this.scene = scene;

        this.createSources();

    }

    private createSources(){
        const sourceBlock = MeshBuilder.CreateBox("HotBlock",
                         {width: 20, height: 7, depth: 14});
        const sourceBlockMaterial = new StandardMaterial("SourceBlockMaterial", this.scene);
        sourceBlockMaterial.diffuseColor = new Color3(1.0, 1.0, 0.0);
        sourceBlockMaterial.emissiveColor = new Color3(1.0, 0.0, 0.0);
        sourceBlock.material = sourceBlockMaterial;

        sourceBlock.position.y = - 5;
        const gl = new GlowLayer("glow", this.scene);
        
        gl.intensity = 1.0;
    }
}