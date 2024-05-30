import { FormatoData } from "../types/enums/FormatoData.js";
import IGrupoTransacao from "../types/interfaces/IGrupoTransacao.js";
import Formatadores from "../utils/Fomatadores.js";

export default class ExtratoView {
  private elementoRegistroDeExtrato = document.querySelector(
    ".extrato .registro-transacoes"
  ) as HTMLElement;

  public renderizarExtrato(gruposTransacoes: IGrupoTransacao[]): void {
    this.elementoRegistroDeExtrato.innerHTML = "";
    let htmlRegistroTransacoes: string = "";

    for (let gruposTransacao of gruposTransacoes) {
      let htmlTransacaoItem: string = "";
      for (let transacao of gruposTransacao.transacoes) {
        htmlTransacaoItem += `
          <div class="transacao-item">
            <div class="transacao-info">
              <span class="tipo">${transacao.tipoTransacao}</span>
              <strong class="valor">${Formatadores.formatarMoeda(
                transacao.valor
              )}</strong>
            </div>
            <time class="data">${Formatadores.formatarData(
              transacao.data,
              FormatoData.DIA_MES
            )}</time>
          </div>
        `;
      }
      htmlRegistroTransacoes += `
        <div class="transacoes-group">
          <strong class="mes-group">${gruposTransacao.label}</strong>
          ${htmlTransacaoItem}
        </div>
      `;
    }
    if (htmlRegistroTransacoes === "") {
      htmlRegistroTransacoes = `<div>Não há transações registradas.</div>`;
    }

    this.elementoRegistroDeExtrato.innerHTML = htmlRegistroTransacoes;
  }
}
