import ExtratoView from "../views/ExtratoView.js";
export default class MainController {
    clienteController;
    transacaoController;
    cliente;
    extratoView = new ExtratoView();
    constructor(clienteController, transacaoController) {
        this.clienteController = clienteController;
        this.transacaoController = transacaoController;
        this.cliente = clienteController.exibirCliente();
        this.atualizarRenderizacao();
    }
    novaTransacao() {
        const objeto = this.transacaoController.criarTransacao(this.cliente.saldo);
        if (objeto?.valor) {
            this.clienteController.adicionarSaldo(objeto.valor);
            this.clienteController.atualizarExtrato(objeto.extrato);
            this.atualizarLocalStorage(this.cliente.saldo, this.cliente.extrato);
            this.atualizarRenderizacao();
        }
    }
    atualizarRenderizacao() {
        this.extratoView.renderizarExtrato(this.cliente.pegarGrupoTrancacoes());
    }
    atualizarLocalStorage(saldo, extrato) {
        localStorage.setItem("Saldo", JSON.stringify(saldo));
        localStorage.setItem("Extrato", JSON.stringify(extrato));
    }
}
