import * as moment from 'moment';

export class Utils {

    private static calculateDateOffset(daysOffset: number): string {
        return moment().add(daysOffset, 'days').toISOString();  // Calculates the date offset and returns ISO string
    }

    public static replaceQueryPlaceholders(query: string, curUserName: string, curUserLoginName: string, curUserEmail: string): string {
        // Replace user-related placeholders
        let result = query
            .replace("{{curUserFullName}}", curUserName)
            .replace("{{curUserLoginName}}", curUserLoginName)
            .replace("{{curUserEmail}}", curUserEmail);

        // Replace {{today}} with the current date in ISO format
        result = result.replace("{{today}}", moment().toISOString());

        // Replace {{today$-X}} or {{today$+X}} with dynamically calculated date offset
        result = result.replace(/{{today\$(-?\d+)}}/g, (match, daysOffset) => {
            const offset = parseInt(daysOffset, 10);  // Convert the string offset to an integer
            return this.calculateDateOffset(offset);  // Calculate and return the date with the offset
        });

        return result;
    }
}