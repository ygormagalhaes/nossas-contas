import moment = require('moment');

export class DateUtils {

    static obterPrimeiroDiaMes(date: Date): Date {
        return moment(date).startOf('M').toDate();
    }

    static obterUltimoDiaMes(date: Date): Date {
        return moment(date).endOf('M').toDate();
    }
}
