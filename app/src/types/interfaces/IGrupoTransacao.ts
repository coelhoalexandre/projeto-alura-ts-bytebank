import Transacao from "../../models/Transacao.js";

export default interface IGrupoTransacao {
  label: string;
  transacoes: Transacao[];
}
