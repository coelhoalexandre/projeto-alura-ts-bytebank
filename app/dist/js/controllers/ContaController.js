import { FormatoData } from "../types/enums/FormatoData.js";
import Formatadores from "../utils/Fomatadores.js";
import ContaPremium from "../models/ContraPremium.js";
export default class ContaController {
    nome;
    saldo;
    extrato;
    elementoSaldo = document.querySelector(".saldo-valor .valor");
    elementoNome = document.querySelector(".block-saldo h2");
    elementoDataAcesso = document.querySelector(".block-saldo time");
    cliente;
    constructor(nome, saldo, extrato) {
        this.nome = nome;
        this.saldo = saldo;
        this.extrato = extrato;
        this.cliente = new ContaPremium(nome, saldo, extrato);
        this.iniciarClienteController();
    }
    exibirCliente() {
        return this.cliente;
    }
    adicionarSaldo(valor) {
        this.cliente.alterarSaldo(valor);
        const saldoAtual = this.cliente.saldo;
        this.elementoSaldo.textContent = Formatadores.formatarMoeda(saldoAtual);
    }
    atualizarExtrato(extrato) {
        this.cliente.novoExtrato(extrato);
    }
    iniciarClienteController() {
        this.adicionarSaldo(0);
        this.adicionarNome();
        this.adicionarDataDeAcesso();
    }
    adicionarNome() {
        this.elementoNome.textContent = `Olá, ${this.nome} :)`;
    }
    adicionarDataDeAcesso() {
        const dataAcesso = new Date();
        this.elementoDataAcesso.textContent = Formatadores.formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
    }
}
