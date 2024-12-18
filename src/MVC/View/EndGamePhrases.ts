export class EndGamePhrases {
    public static getRandomBallOutPhrase(languageOption: number): string {
        const phrasesPt = [
            "⚽ Bola Fora! 🚫",
            "⚽❌ Fora!",
            "🥅 ➡️ Bola Fora!",
            "⚽⬅️ Fora do Jogo!",
            "🚩⚽ Bola Fora!",
            "⚽🙀 Oops! Bola Fora!",
            "⚽💨❌ Fora!",
            "🛑⚽ Fora de campo!",
            "😬⚽ Saiu!",
            "⚽🤦‍♂️ Bola Fora!",
            "🏃‍♂️⚽💥 Bola bem fora!",
            "💢⚽ Fora da Área!",
            "🎯❌ Errou! Bola Fora!",
            "⚽✨ Fora de Controle!",
            "🚫⚽🌀 Desastre! Bola Fora!"
        ];

        const phrasesEn = [
            "⚽ Ball Out! 🚫",
            "⚽❌ Out!",
            "🥅 ➡️ Ball Out!",
            "⚽⬅️ Out of the Game!",
            "🚩⚽ Ball Out!",
            "⚽🙀 Oops! Ball Out!",
            "⚽💨❌ Out!",
            "🛑⚽ Out of the field!",
            "😬⚽ It went out!",
            "⚽🤦‍♂️ Ball Out!",
            "🏃‍♂️⚽💥 Way off the mark!",
            "💢⚽ Out of the Area!",
            "🎯❌ Missed! Ball Out!",
            "⚽✨ Out of Control!",
            "🚫⚽🌀 Disaster! Ball Out!"
        ];

        if (languageOption === 1) {
            return phrasesEn[Math.floor(Math.random() * phrasesEn.length)];
        } else {
            return phrasesPt[Math.floor(Math.random() * phrasesPt.length)];
        }
    }
}
