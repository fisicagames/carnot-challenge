export interface IModel {
    toggleMusicPlayback(): void;
    setScoreUpdateCallback(callback: (newScore: number, state: string, work: number) => void): void;
    setEndGameCallback(callback: (isVisible: boolean) => void): void;  
    changeSourceTypes(): void;  
    resetGame(): void;
    updateModels: boolean;
}
