import { AdvancedDynamicTexture, TextBlock, Button } from "@babylonjs/gui";

export class LanguageSwitcher {
    public languageOption: number;
    private strings: Record<string, string[]>;

    constructor() {
        this.languageOption = 0;
        this.strings = {
            ButtonLang: ["ENGLISH", "PORTUGUÊS"],
            TextblockMeta: ["Objetivo: movimente o ímã para alterar o fluxo magnético e induzir corrente elétrica na bobina, iluminando a lâmpada com a máxima intensidade que conseguir!", "Goal: Move the magnet to alter the magnetic flux and induce an electric current in the coil, lighting the bulb as brightly as possible!"],
            TextblockTitle: ["Carnot Game", "Carnot Game"], 
            ButtonMenuStartA: ["Iniciar", "Start"],
            ButtonMenuStartB: ["Movimento Linear", "Linear Motion"],
            ButtonMenuStartC: ["None", "None"],
            TextblockMenuScore: ["Maior pontuação:", "High Score:"],
            TextblockSecond: ["ℰ: força eletromotriz induzida (volts).", "ℰ: electromotive force induced (volts)." ],
            TextBlockThird: ["N: número de espiras da bobina.","N: number of coil turns."],
            TextBlockQuarter: ["ΔΦ: variação do fluxo magnético (weber).","ΔΦ: variation in magnetic flux (weber)."],
            TextBlockFiver:  ["Δt: intervalo de tempo (segundos).","Δt: time interval (seconds)."],
            ButtonMenuContinuar: ["Reiniciar","Restart"],
            TextblockScoreGame: ["Tensão:  0 Volts","Voltage: 0 Volts"],
            TextblockMusic: ["Música:","Music:"],
            TextblockAviso:  ["Aviso: este jogo contém efeitos visuais rápidos, incluindo luzes piscando e mudanças bruscas de iluminação, que podem não ser adequados para pessoas com epilepsia fotossensível ou outras condições relacionadas à luz. Escolha a configuração que melhor se adapta a você:","Warning: This game contains fast visual effects, including flashing lights and sudden changes in illumination, which may not be suitable for individuals with photosensitive epilepsy or other light-related conditions. Please choose the setting that works best for you:"],
            ButtonEfeitoSuave: ["Efeito Suave","Soft Effect"],
            ButtonEfeitoIntenso: ["Efeito Intenso","Intense Effect"],

        };
    }

    public changeLanguage(advancedTexture: AdvancedDynamicTexture): void {
        this.languageOption = this.languageOption === 0 ? 1 : 0;
        this.updateText(advancedTexture);
    }

    public updateText(advancedTexture: AdvancedDynamicTexture): void {
        for (const key in this.strings) {
            if (this.strings.hasOwnProperty(key)) {
                const translations = this.strings[key];
                const control = advancedTexture.getControlByName(key);

                if (control instanceof TextBlock) {
                    control.text = translations[this.languageOption];
                } else if (control instanceof Button && control.textBlock) {
                    control.textBlock.text = translations[this.languageOption];
                }
            }
        }
    }

    public getCurrentLanguage(): number {
        return this.languageOption;
    }

    public getTranslation(key: string): string {
        return this.strings[key][this.languageOption];
    }
}
