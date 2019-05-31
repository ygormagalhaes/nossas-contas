export class ObjectUtils {
    static isObjectEmpty(target: object): boolean {
        if (!target || Object.keys(target).length === 0) {
            return true;
        }

        return false;
    }
}
