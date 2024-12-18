// Interface que define o contrato para comunicação
interface DListener {
    onEventFromD(): void;
}

// Classe D que trabalha com a interface
class D {
    private listener?: DListener;

    // Método para registrar a classe que implementa a interface
    setListener(listener: DListener): void {
        this.listener = listener;
    }

    // Método que simula um evento
    triggerEvent(): void {
        console.log("D: Evento ocorreu!");
        // Notifica o listener se estiver configurado
        this.listener?.onEventFromD();
    }
}

// Classe C que implementa a interface e instancia D
class C implements DListener {
    private dInstance: D;

    constructor() {
        // C instancia D
        this.dInstance = new D();

        // Registra a si mesmo como listener para D
        this.dInstance.setListener(this);
    }

    // Implementação do método da interface
    public onEventFromD(): void {
        console.log("C: Recebi o evento de D!");
    }

    // Método que pode ser chamado externamente para disparar o evento em D
    triggerDEvent(): void {
        console.log("C: Disparando evento em D.");
        this.dInstance.triggerEvent();
    }
}

// Código de execução
const instanceC = new C();
instanceC.triggerDEvent();
