export default class Formatador {
    static formatarMoeda(valor) {
        return valor.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
        });
    }
    static formatarData(data) {
        return data.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
}
