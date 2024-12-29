import { AdvancedDynamicTexture, TextBlock, Button } from "@babylonjs/gui";

export class LanguageSwitcher {
    public languageOption: number;
    private strings: Record<string, string[]>;

    constructor() {
        this.languageOption = 0;
        this.strings = {
            ButtonLang: ["ENGLISH", "PORTUGUÊS"],
            TextblockMeta: ["Objetivo: troque as fontes de calor no momento certo para maximizar o rendimento da máquina e se aproximar do valor máximo definido pelo rendimento de Carnot!", "Goal: Switch the heat sources at the right time to maximize the machine's efficiency and approach the maximum value defined by Carnot efficiency!"],
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
            TextblockAviso:  ["🌟 Pontuações e Níveis 🏆\n\n499-: Iniciante 🐣\n\n500 - 539: Estudante Curioso 🧐\n540 - 579: Estudante Aplicado 📘\n580 - 619: Universitário Iniciante ✏️\n620 - 659: Universitário Dedicado 📚\n660 - 699: Professor de Física 🧑‍🏫\n700 - 709: Professor de Termodinâmica 🔥\n710 - 719: Gênio da Física 🧠\n\n720+: Nicolas Léonard Sadi Carnot ⚙️","🌟 Scores and Levels 🏆\n\n499-: Beginner 🐣\n\n500 - 539: Curious Student 🧐\n540 - 579: Dedicated Student 📘\n580 - 619: Novice University Student ✏️\n620 - 659: Advanced University Student 📚\n660 - 699: Physics Professor 🧑‍🏫\n700 - 709: Thermodynamics Professor 🔥\n710 - 719: Physics Genius 🧠\n\n720+: Nicolas Léonard Sadi Carnot ⚙️"],
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
