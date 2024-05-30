import { FormatoData } from "../types/enums/FormatoData.js";
import Conta from "../models/Conta.js";
import Formatadores from "../utils/Fomatadores.js";
import Transacao from "../models/Transacao.js";
import ContaPremium from "../models/ContraPremium.js";

export default class ContaController {
  private elementoSaldo = document.querySelector(
    ".saldo-valor .valor"
  ) as HTMLElement;
  private elementoNome = document.querySelector(
    ".block-saldo h2"
  ) as HTMLElement;
  private elementoDataAcesso = document.querySelector(
    ".block-saldo time"
  ) as HTMLElement;
  private cliente: Conta;

  constructor(
    private readonly nome: string,
    private readonly saldo: number,
    private readonly extrato?: Transacao[]
  ) {
    this.cliente = new ContaPremium(nome, saldo, extrato);
    this.iniciarClienteController();
  }

  public exibirCliente(): Conta {
    return this.cliente;
  }

  public adicionarSaldo(valor: number): void {
    this.cliente.alterarSaldo(valor);
    const saldoAtual = this.cliente.saldo;
    this.elementoSaldo.textContent = Formatadores.formatarMoeda(saldoAtual);
  }

  public atualizarExtrato(extrato: Transacao[]) {
    this.cliente.novoExtrato(extrato);
  }

  private iniciarClienteController() {
    this.adicionarSaldo(0);
    this.adicionarNome();
    this.adicionarDataDeAcesso();
  }

  private adicionarNome(): void {
    this.elementoNome.textContent = `Olá, ${this.nome} :)`;
  }

  private adicionarDataDeAcesso(): void {
    const dataAcesso: Date = new Date();
    this.elementoDataAcesso.textContent = Formatadores.formatarData(
      dataAcesso,
      FormatoData.DIA_SEMANA_DIA_MES_ANO
    );
  }
}
