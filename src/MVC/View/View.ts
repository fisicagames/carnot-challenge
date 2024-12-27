// src\View\View.ts
import { Scene } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Rectangle, TextBlock } from "@babylonjs/gui";
import { IView } from "./IView";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { EndGamePhrases } from "./EndGamePhrases";
import { PhysicsConceptualPhrases } from "./PhysicsConceptualPhrases";
import { LanguageDetector } from "./LanguageDetector";

export class View implements IView {
    private scene: Scene;
    public advancedTexture: AdvancedDynamicTexture;
    private rectangleMenu!: Rectangle;
    private buttonMenuStartA!: Button;
    private buttonMenuStartB!: Button;
    private buttonMenuStartC!: Button;
    private buttonMenuContinuar!: Button;
    private buttonMenu!: Button;
    private textblockLevel!: TextBlock;
    private rectangleTouch!: Rectangle;
    private rectangleTop!: Rectangle;
    public textblockMenuMusic!: TextBlock;
    private isMusicOn: boolean = true;
    private buttonLang!: Button;
    private languageSwitcher: LanguageSwitcher;
    private buttonUp!: Button;
    private buttonDown!: Button;
    private buttonRight!: Button;
    private buttonLeft!: Button;
    private rectangleGame!: Rectangle;
    private textblockMenuBest!: TextBlock;
    private textblockTotalScore!: TextBlock;
    private topScore: number = 0;
    private textblockScoreGame!: TextBlock;
    private textblockCenterPhrase!: TextBlock;
    private textblockSecond!: TextBlock;
    private rectangleAviso!: Rectangle;
    private textblockAviso!: TextBlock;
    private buttonEfeitoSuave!: Button;
    private buttonEfeitoIntenso!: Button;
    private firstTime: boolean = true;

    constructor(scene: Scene, advancedTexture: AdvancedDynamicTexture) {
        this.scene = scene;
        this.advancedTexture = advancedTexture;
        this.languageSwitcher = new LanguageSwitcher();
        this.initializeGUI();
        LanguageDetector.detectAndSetLanguage(() => this.changeLanguage());
    }

    public changeLanguage(): void {
        this.languageSwitcher.changeLanguage(this.advancedTexture);
    }

    private initializeGUI() {
        this.buttonMenuStartA = this.advancedTexture.getControlByName("ButtonMenuStartA") as Button;
        this.buttonMenuStartB = this.advancedTexture.getControlByName("ButtonMenuStartB") as Button;
        this.buttonMenuStartC = this.advancedTexture.getControlByName("ButtonMenuStartC") as Button;
        this.buttonMenu = this.advancedTexture.getControlByName("ButtonMenu") as Button;
        this.buttonMenu.isVisible = false;
        this.buttonMenuContinuar = this.advancedTexture.getControlByName("ButtonMenuContinuar") as Button;
        this.rectangleMenu = this.advancedTexture.getControlByName("RectangleMenu") as Rectangle;
        this.rectangleMenu.isVisible = true;
        this.textblockLevel = this.advancedTexture.getControlByName("TextblockLevel") as TextBlock;
        this.textblockLevel.isVisible = false;
        this.rectangleTouch = this.advancedTexture.getControlByName("RectangleTouch") as Rectangle;
        this.rectangleTouch.isVisible = false;
        this.rectangleTop = this.advancedTexture.getControlByName("RectangleTop") as Rectangle;
        this.rectangleTop.isVisible = false;
        this.textblockMenuMusic = this.advancedTexture.getControlByName("TextblockMenuMusic") as TextBlock;
        this.buttonLang = this.advancedTexture.getControlByName("ButtonLang") as Button;
        this.buttonUp = this.advancedTexture.getControlByName("ButtonUp") as Button;
        this.buttonDown = this.advancedTexture.getControlByName("ButtonDown") as Button;
        this.buttonLeft = this.advancedTexture.getControlByName("ButtonRight") as Button;
        this.buttonRight = this.advancedTexture.getControlByName("ButtonLeft") as Button;
        this.buttonDown.isVisible = false;
        this.buttonRight.isVisible = false;
        this.buttonLeft.isVisible = false;
        this.rectangleGame = this.advancedTexture.getControlByName("RectangleGame") as Rectangle;
        this.rectangleGame.isVisible = false;
        this.textblockMenuBest = this.advancedTexture.getControlByName("TextblockMenuBest") as TextBlock;
        this.textblockTotalScore = this.advancedTexture.getControlByName("TextblockTotalScore") as TextBlock;
        this.textblockScoreGame = this.advancedTexture.getControlByName("TextblockScoreGame") as TextBlock;
        this.textblockCenterPhrase = this.advancedTexture.getControlByName("TextblockCenterPhrase") as TextBlock;
        this.textblockCenterPhrase.isVisible = false;
        this.textblockSecond = this.advancedTexture.getControlByName("TextblockSecond") as TextBlock;
        this.rectangleAviso = this.advancedTexture.getControlByName("RectangleAviso") as Rectangle;
        this.textblockAviso = this.advancedTexture.getControlByName("TextblockAviso") as TextBlock;
        this.buttonEfeitoSuave = this.advancedTexture.getControlByName("ButtonEfeitoSuave") as Button;
        this.buttonEfeitoIntenso = this.advancedTexture.getControlByName("ButtonEfeitoIntenso") as Button;
        this.rectangleAviso.isVisible = false;
    }

    public updateMainMenuVisibility(isVisible: boolean) {
        this.rectangleMenu.isVisible = isVisible;
        this.buttonMenu.isVisible = !isVisible;
        this.textblockLevel.isVisible = !isVisible;
        this.rectangleTouch.isVisible = !isVisible;
        this.rectangleTop.isVisible = !isVisible;
        this.rectangleGame.isVisible = !isVisible;
        this.textblockCenterPhrase.isVisible = !isVisible;
    }

    public onButtonEfeitoSuave(callback: () => void) {
        this.buttonEfeitoSuave.onPointerUpObservable.add(() => {
            callback();
        });
    };
    public onButtonEfeitoIntenso(callback: () => void) {
        this.buttonEfeitoIntenso.onPointerUpObservable.add(() => {
            callback();
        });
    };


    public onButtonMenuStartA(callback: () => void): void {
        this.buttonMenuStartA.onPointerUpObservable.add(() => {
            callback();
        });
    }

    public onButtonMenuStartB(callback: () => void): void {
        this.buttonMenuStartB.onPointerUpObservable.add(() => {
            callback();
        });
    }
    public onButtonMenuStartC(callback: () => void): void {
        this.buttonMenuStartC.onPointerUpObservable.add(callback);
    }
    public onButtonMenuContinuar(callback: () => void): void {
        this.buttonMenuContinuar.onPointerUpObservable.add(callback);
    }
    public onButtonMenu(callback: () => void): void {
        this.buttonMenu.onPointerUpObservable.add(callback);
    }

    public onToggleMusic(callback: () => void): void {
        this.textblockMenuMusic.onPointerUpObservable.add(() => {
            callback(); // Chama o callback passado
            this.toggleMusicIcon(); // Atualiza o ícone da música
        });
    }

    public onButtonLang(callback: () => void): void {
        this.buttonLang.onPointerUpObservable.add(callback);
    }

    public toggleMusicIcon(): void {
        this.isMusicOn = !this.isMusicOn;
        this.textblockMenuMusic.text = this.isMusicOn ? "🔊" : "🔈";
    }

    public setButtonUpUpCallback(callback: () => void): void {
        this.buttonUp.onPointerUpObservable.add(callback);
    }
    public buttonDownUp(callback: () => void): void {
        this.buttonDown.onPointerUpObservable.add(callback);
    }
    public buttonRightUp(callback: () => void): void {
        this.buttonRight.onPointerUpObservable.add(callback);
    }
    public buttonLeftUp(callback: () => void): void {
        this.buttonLeft.onPointerUpObservable.add(callback);
    }
    public buttonUpDown(callback: () => void): void {
        this.buttonUp.onPointerDownObservable.add(callback);
    }
    public buttonDownDown(callback: () => void): void {
        this.buttonDown.onPointerDownObservable.add(callback);
    }
    public buttonRightDown(callback: () => void): void {
        this.buttonRight.onPointerDownObservable.add(callback);
    }
    public buttonLeftDown(callback: () => void): void {
        this.buttonLeft.onPointerDownObservable.add(callback);
    }

    public updateScoreText(newScore: number, state: string): void {
        if (this.languageSwitcher.languageOption == 0) {
            this.textblockLevel.text = `${state} \n Trabalho total: ${newScore.toFixed(0)} J` ;
            //TODO: Remove next two lines for run only when endGame event. Send to show end game?
            this.textblockTotalScore.text = this.getScoreDisplay(newScore);
        }
        else {
            this.textblockLevel.text = newScore + ` Volts. \n Max. voltage: ` + this.getScoreDisplay(this.topScore);
            //TODO: Remove next two lines for run only when endGame event. Send to show end game?
            this.textblockTotalScore.text = `Voltage: ` + this.getScoreDisplay(newScore) + ` 🏆`;

        }
        if (this.topScore < newScore) {
            this.topScore = newScore;
            this.textblockMenuBest.text = this.getScoreDisplay(newScore);
        }
    }

    private getScoreDisplay(score: number): string {
        if (score < 600) {
            return `${score.toFixed(0)} J`;
        } else if (score < 1200) {
            return `${score.toFixed(0)} J 🥉`;
        } else if (score < 2400) {
            return `${score.toFixed(0)} J 🥈`;
        } else {
            return `${score.toFixed(0)} J 🥇`;
        }
    }

    public showEndGamePanel(isVisible: boolean): void {
        this.rectangleGame.isVisible = isVisible;
        if (isVisible && !this.textblockCenterPhrase.isVisible) {
            this.textblockCenterPhrase.isVisible = isVisible;
            this.textblockCenterPhrase.text = PhysicsConceptualPhrases.getRandomPendulumPhrase(this.languageSwitcher.languageOption);
        }
        else {
            this.textblockCenterPhrase.isVisible = isVisible;
        }
    }
    public changeButtonUPSymbol(string: string) {
        if (!this.buttonUp.textBlock) {
            console.warn(`[WARNING]: buttonUp.textBlock is null or undefined.`);
            return; 
        }
        if(string == "0"){
            this.buttonUp.textBlock.text = "Fonte Quente";
        }
        else if(string == "1"){
            this.buttonUp.textBlock.text = "Isolante";
        }
        else {
            this.buttonUp.textBlock.text = "Fonte Fria";
        }
        
    }
}
