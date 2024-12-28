export interface IModel {
    toggleMusicPlayback(): void;
    setScoreUpdateCallback(callback: (newScore: number, state: string) => void): void;
    setEndGameCallback(callback: (isVisible: boolean) => void): void;  
    changeSourceTypes(): void;  
    resetGame(): void;
}
