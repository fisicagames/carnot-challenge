import { Scene, HavokPlugin} from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundModel } from "./SoundModel";

export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic: SoundModel;
    private allSounds: SoundModel[] = [];
    private physicsPlugin: HavokPlugin | null;
    private endGameCallback: ((isVisible: boolean) => void) | null = null;
    public endGAme: boolean = false;
    public modeEffectIntense: boolean = true;


    constructor(scene: Scene, physicsPlugin?: HavokPlugin | null) {
        this.scene = scene;
        //TODO: Remove Havok for this game.
        this.physicsPlugin = physicsPlugin || null;


        //https://pixabay.com/pt/music/otimista-legendary-paganini-caprice-house-background-music-for-video-full-ver-271219/
        //Music by Maksym Dudchyk from Pixabay
        this.backgroundMusic = new SoundModel(
            this.scene,
            "backgroundSound",
            "./assets/sounds/overdrive-play-271522_compress.mp3",
            true
        );
        this.backgroundMusic.setVolume(0.7);
        this.allSounds.push(this.backgroundMusic);

        this.updateSceneModels();
    }

    private updateSceneModels() {
        this.scene.onBeforeRenderObservable.add(() => {

        });
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }

    public setEndGameCallback(callback: (isVisible: boolean) => void): void {
        this.endGameCallback = callback;
    }

    private onUpdateScoreCallback: (newScore: number) => void = () => {
        console.warn("No callback registered for score updates.");
    };
    public setScoreUpdateCallback(callback: (newScore: number) => void): void {
        this.onUpdateScoreCallback = callback;
    }

}
