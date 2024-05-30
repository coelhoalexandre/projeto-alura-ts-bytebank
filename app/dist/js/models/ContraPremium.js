import Conta from "./Conta.js";
export default class ContaPremium extends Conta {
    alterarSaldo(valor) {
        if (valor > 0) {
            console.log("Ganhou um bônus de 0.50 centavos");
            valor += 0.5;
        }
        super.alterarSaldo(valor);
    }
}
