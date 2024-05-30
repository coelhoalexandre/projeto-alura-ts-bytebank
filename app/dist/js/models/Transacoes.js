export default class Transacoes {
    transacoes = [];
    empurrarTransacoes(transacoes) {
        this.transacoes = transacoes;
    }
    adicionarNovaTransacao(novaTransacao) {
        this.transacoes.push(novaTransacao);
    }
    lista() {
        return this.transacoes;
    }
}
