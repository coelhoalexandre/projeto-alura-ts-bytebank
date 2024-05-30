export default class Cliente {
    nome;
    _saldo;
    _extrato;
    constructor(nome, _saldo, _extrato = []) {
        this.nome = nome;
        this._saldo = _saldo;
        this._extrato = _extrato;
    }
    get saldo() {
        const saldo = this._saldo;
        return saldo;
    }
    get extrato() {
        const extrato = this._extrato;
        return extrato;
    }
    novoExtrato(extrato) {
        this._extrato = extrato;
    }
    alterarSaldo(valor) {
        this._saldo += valor;
    }
    pegarGrupoTrancacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this._extrato);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: [],
                });
            }
            gruposTransacoes.at(-1)?.transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
}
