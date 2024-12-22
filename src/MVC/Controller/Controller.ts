import { Scene, Vector3, Mesh, FollowCamera, KeyboardEventTypes } from "@babylonjs/core";
import { IModel } from "../Model/IModel";
import { IView } from "../View/IView";
import { CameraController } from "./CameraController";
import { InputKeyboardController } from "./InputKeyboardController";

export class Controller {
    private scene: Scene;
    private model: IModel;
    private view: IView;
    private followCamera: FollowCamera;
    private followCameraTarget: Mesh | null = null;
    private inputKeyboardControllers: InputKeyboardController;


    private isUpPressed: boolean = false;
    private isDownPressed: boolean = false;
    private isLeftPressed: boolean = false;
    private isRightPressed: boolean = false;

    constructor(scene: Scene, model: IModel, view: IView) {
        this.scene = scene;
        this.model = model;
        this.view = view;
        
        this.followCamera = this.scene.activeCamera as FollowCamera;

        this.model.setScoreUpdateCallback((newScore) => {
            this.view.updateScoreText(newScore);
        });

        this.model.setEndGameCallback((isVisible: boolean) => this.showEndGamePanel(isVisible));

        this.inputKeyboardControllers = new InputKeyboardController(scene);
        this.inputKeyboardControllerSetup();
        this.inputTouchControllerSetup();

        
        this.update();

    }  
    
    private inputKeyboardControllerSetup(){
        this.inputKeyboardControllers.bindKeyboardEvents({
            "w": (eventType) => { this.handleKeyPress(eventType, "w"); },
            "arrowup": (eventType) => { this.handleKeyPress(eventType, "arrowup"); },
        });
    }

    private handleKeyPress(eventType: KeyboardEventTypes, key: string) {
        if (eventType === KeyboardEventTypes.KEYDOWN) {
            if (key === "w" || key === "arrowup") {
                console.log(`Key ${key} pressed down`);
            }
        } else if (eventType === KeyboardEventTypes.KEYUP) {
            if (key === "w" || key === "arrowup") {
                console.log(`Key ${key} released`);
            }
        }
    }

    private update() {
        this.scene.onBeforeRenderObservable.add(() => {
            this.updateCameraPosition();            
        });
    }
    private inputTouchControllerSetup() {

        this.view.onButtonMenuStartA(() => this.startGame());
        this.view.onButtonMenuStartB(() => this.startGameLinear());
        this.view.onButtonMenuStartC(() => this.startGame());
        this.view.onButtonMenuContinuar(() => this.continueGame());
        this.view.onButtonMenu(() => this.showMenu());
        this.view.onToggleMusic(() => this.toggleMusic());
        this.view.onButtonLang(() => this.changeLanguage());
        //this.view.buttonUpDown(() => { this.isUpPressed = true; });
        //this.view.onButtonUpUp(() => { this.isUpPressed = false; });
        this.view.setButtonUpUpCallback(() => null);

    }

    public setCameraTarget(target: Vector3 | Mesh): void {
        if (target instanceof Mesh) {
            this.followCameraTarget = target;
        } else if (target instanceof Vector3) {
            this.followCamera.lockedTarget = null;
            this.followCamera.setTarget(target);
        }
    }

    private updateCameraPosition(): void {
        if (this.followCameraTarget && this.followCamera) {
            CameraController.updatePosition(this.followCamera, this.followCameraTarget);
        }
    }

    private startGame(): void {
        //TODO: Mudar para view:
        this.view.changeButtonUPSymbol(`Fonte Quente`);
        this.continueGame();
    }
    private startGameLinear(): void {
        this.view.changeButtonUPSymbol(`⇅`);
        this.continueGame();
    }
    private continueGame(){
        this.view.updateMainMenuVisibility(false);        
        this.view.showEndGamePanel(false);
        this.view.updateScoreText(0);        
    }

    private showMenu(): void {
        this.view.updateMainMenuVisibility(true);
    }

    private toggleMusic(): void {
        this.model.toggleMusicPlayback();
    }

    private changeLanguage(): void {
        this.view.changeLanguage();
    }

    private showEndGamePanel(isVisible: boolean): void {
        this.view.showEndGamePanel(isVisible);
    }
}
