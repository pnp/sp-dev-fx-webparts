import * as Handlebars from 'handlebars';

export default class TemplateHelper {

    public static registerHelpers(handlebars: typeof Handlebars): void {
        handlebars.registerHelper('log', TemplateHelper.logHelper);
        handlebars.registerHelper('dateFormat', TemplateHelper.dateFormatHelper);
        handlebars.registerHelper('isDueDatePassed', TemplateHelper.isDueDatePassedHelper);
        handlebars.registerHelper('equalValue', TemplateHelper.equalValueHelper);
        handlebars.registerHelper('shortDateFormat', TemplateHelper.shortDateFormatHelper);
    }

    public static logHelper(data: string): string {
        // console.log(data);
        const jsonString = JSON.stringify(data, null, 2);
        return jsonString;
    }

    public static dateFormatHelper(date: string): string {
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }

    public static isDueDatePassedHelper(date: string): boolean {
        const dueDate = new Date(date);
        const currentDate = new Date();
        return dueDate < currentDate;
    }

    public static equalValueHelper(value1: string, value2: string): boolean {
        return value1 === value2;
    }

    public static shortDateFormatHelper(date: string): string {
        const formattedDate = new Date(date);
        const options = { 
            year: 'numeric' as const, 
            month: 'short' as const, 
            day: 'numeric' as const,
            hour: '2-digit' as const, 
            minute: '2-digit' as const,
            hour12: true,
            timeZone: 'UTC'
          };
          return formattedDate.toLocaleString('en-US', options);
    }
}