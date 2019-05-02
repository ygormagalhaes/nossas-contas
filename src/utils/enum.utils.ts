export class EnumUtils {

    static existeValorNoEnum(valor: any, enumerator: object) {
        const valores: any[] = Object.keys(enumerator).map(key => enumerator[key]);
        return valores.includes(valor);
    }

}
