export interface IModel {
    toggleMusicPlayback(): void;
    setScoreUpdateCallback(callback: (newScore: number) => void): void;
    setEndGameCallback(callback: (isVisible: boolean) => void): void;    
    modeEffectIntense: boolean;
}
