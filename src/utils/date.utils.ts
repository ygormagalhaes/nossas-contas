import moment = require('moment');

export class DateUtils {

    static obterPrimeiroDiaMes(date: Date): Date {
        return moment(date).startOf('M').toDate();
    }

    static obterUltimoDiaMes(date: Date): Date {
        return moment(date).endOf('M').toDate();
    }

    static isDate(param: any): boolean {
        if (!param) {
            return false;
        } else if (typeof param.getTime !== 'function') {
            return false;
        } else if (param.toString() === 'Invalid Date') {
            return false;
        }
        return true;
    }
}
