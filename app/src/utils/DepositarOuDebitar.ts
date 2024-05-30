import { TipoTransacao } from "../types/enums/TipoTransacao.js";

export default function DepositarOuDebitar(
  tipoTransacao: TipoTransacao
): TipoTransacao | undefined {
  if (tipoTransacao === TipoTransacao.DEPOSITO) {
    return TipoTransacao.DEPOSITAR;
  } else if (
    tipoTransacao === TipoTransacao.TRANFERENCIA ||
    tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO
  ) {
    return TipoTransacao.DEBITAR;
  }
}
