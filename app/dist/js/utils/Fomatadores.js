import { FormatoData } from "../types/enums/FormatoData.js";
export default class Formatadores {
    static formatarMoeda(valor) {
        return valor.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
        });
    }
    static formatarData(data, formato = FormatoData.PADRAO) {
        switch (formato) {
            case FormatoData.DIA_SEMANA_DIA_MES_ANO:
                return data.toLocaleDateString("pt-br", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
                break;
            case FormatoData.DIA_MES:
                return data.toLocaleDateString("pt-br", {
                    day: "2-digit",
                    month: "2-digit",
                });
                break;
            default:
                return data.toLocaleDateString("pt-br");
                break;
        }
    }
}
