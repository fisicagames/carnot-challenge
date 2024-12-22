import { MeshBuilder, Scene } from "@babylonjs/core";

export class SourceBlocks{
    private scene: Scene;
    
    constructor(scene: Scene){
        this.scene = scene;

        this.createSources();

    }

    private createSources(){
        const hotBlock = MeshBuilder.CreateBox("HotBlock",
                         {width: 20, height: 7, depth: 14});
        hotBlock.position.y = - 5;

    }
}