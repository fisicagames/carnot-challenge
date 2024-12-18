// Classe B que aceita um único callback
class B {
    private callback?: () => void;

    // Método para registrar o callback
    registerCallback(callback: () => void): void {
        this.callback = callback;
    }

    // Método que simula um evento
    triggerEvent(): void {
        console.log("B: Evento ocorreu!");
        // Chama o callback registrado, se existir
        this.callback?.();
    }
}

// Classe A que instancia B e registra um callback
class A {
    private bInstance: B;

    constructor() {
        // A instancia B
        this.bInstance = new B();

        // Registra um callback em B
        this.bInstance.registerCallback(() => this.onEventFromB());
    }

    // Método chamado pelo callback quando o evento ocorre em B
    private onEventFromB(): void {
        console.log("A: Recebi o evento de B!");
    }

    // Método que pode ser chamado externamente para disparar o evento em B
    triggerBEvent(): void {
        console.log("A: Disparando evento em B.");
        this.bInstance.triggerEvent();
    }
}

// Código de execução
const instanceA = new A();
instanceA.triggerBEvent();
