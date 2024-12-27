import { Vector3, Scene, MeshBuilder, Mesh } from "@babylonjs/core";

export class LineDrawer {
    private scene: Scene;
    private points: Vector3[] = [];
    private lineMesh: Mesh | null = null;
    private maxPoints: number = 100; // Defina o limite de pontos na linha

    constructor(scene: Scene) {
        this.scene = scene;
    }

    /**
     * Adiciona um novo ponto ao gráfico.
     * 
     * @param point - O ponto a ser adicionado (Vector3).
     */
    public addPoint(point: Vector3): void {
        this.points.push(point);
        
        // Limitar o número de pontos para evitar que a linha cresça indefinidamente
        if (this.points.length > this.maxPoints) {
            this.points.shift(); // Remover o ponto mais antigo
        }
        
        this.updateLine();
    }

    /**
     * Atualiza a linha desenhada com os pontos atuais.
     * Esta função cria a linha com os pontos, ou a atualiza se a linha já existir.
     */
    private updateLine(): void {
        if (this.lineMesh) {
            // Atualiza os pontos da linha existente
            this.lineMesh.dispose(); // Dispose da linha antiga, não há uma atualização direta de pontos
        }

        // Cria uma nova linha com os pontos atualizados
        this.lineMesh = MeshBuilder.CreateLines("line", { points: this.points }, this.scene);
    }
}
