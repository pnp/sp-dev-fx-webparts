export interface ISampleData {
    title: string;
    template: object;
    data: object;
}

export const AllSamples = (): ISampleData[] => {
    return [
        { title: "Styles", template: require("./ExpenseReportWithStyles.template.json"), data: require("./ExpenseReportWithLabels.data.json") },
        { title: "ActivityUpdate", template: require("./ActivityUpdate.template.json"), data: require("./ActivityUpdate.data.json") },
        { title: "ActivityUpdateWithLabels", template: require("./ActivityUpdateWithLabels.template.json"), data: require("./ActivityUpdateWithLabels.data.json") },
        { title: "Agenda", template: require("./Agenda.template.json"), data: require("./Agenda.data.json") },
        { title: "ApplicationLogin", template: require("./ApplicationLogin.template.json"), data: require("./ApplicationLogin.data.json") },
        { title: "CalendarReminder", template: require("./CalendarReminder.template.json"), data: require("./CalendarReminder.data.json") },
        { title: "CalendarReminderWithLabels", template: require("./CalendarReminderWithLabels.template.json"), data: require("./CalendarReminderWithLabels.data.json") },
        { title: "ExpenseReport", template: require("./ExpenseReport.template.json"), data: require("./ExpenseReport.data.json") },
        { title: "ExpenseReportWithLabels", template: require("./ExpenseReportWithLabels.template.json"), data: require("./ExpenseReportWithLabels.data.json") },
        { title: "FlightDetails", template: require("./FlightDetails.template.json"), data: require("./FlightDetails.data.json") },
        { title: "FlightItinerary", template: require("./FlightItinerary.template.json"), data: require("./FlightItinerary.data.json") },
        { title: "FlightUpdate", template: require("./FlightUpdate.template.json"), data: require("./FlightUpdate.data.json") },
        { title: "FlightUpdateTable", template: require("./FlightUpdateTable.template.json"), data: require("./FlightUpdateTable.data.json") },
        { title: "FoodOrder", template: require("./FoodOrder.template.json"), data: require("./FoodOrder.data.json") },
        { title: "FoodOrderWithValidation", template: require("./FoodOrderWithValidation.template.json"), data: require("./FoodOrderWithValidation.data.json") },
        { title: "ImageGallery", template: require("./ImageGallery.template.json"), data: require("./ImageGallery.data.json") },
        { title: "InputForm", template: require("./InputForm.template.json"), data: require("./InputForm.data.json") },
        { title: "InputFormWithLabels", template: require("./InputFormWithLabels.template.json"), data: require("./InputFormWithLabels.data.json") },
        { title: "InputFormWithRTL", template: require("./InputFormWithRTL.template.json"), data: require("./InputFormWithRTL.data.json") },
        { title: "Inputs", template: require("./Inputs.template.json"), data: require("./Inputs.data.json") },
        { title: "InputsWithValidation", template: require("./InputsWithValidation.template.json"), data: require("./InputsWithValidation.data.json") },
        { title: "OrderConfirmation", template: require("./OrderConfirmation.template.json"), data: require("./OrderConfirmation.data.json") },
        { title: "OrderDelivery", template: require("./OrderDelivery.template.json"), data: require("./OrderDelivery.data.json") },
        { title: "ProductVideo", template: require("./ProductVideo.template.json"), data: require("./ProductVideo.data.json") },
        { title: "Restaurant", template: require("./Restaurant.template.json"), data: require("./Restaurant.data.json") },
        { title: "RestaurantOrder", template: require("./RestaurantOrder.template.json"), data: require("./RestaurantOrder.data.json") },
        { title: "ShowCardWizard", template: require("./ShowCardWizard.template.json"), data: require("./ShowCardWizard.data.json") },
        { title: "SimpleFallback", template: require("./SimpleFallback.template.json"), data: require("./SimpleFallback.data.json") },
        { title: "Solitaire", template: require("./Solitaire.template.json"), data: require("./Solitaire.data.json") },
        { title: "SportingEvent", template: require("./SportingEvent.template.json"), data: require("./SportingEvent.data.json") },
        { title: "StockUpdate", template: require("./StockUpdate.template.json"), data: require("./StockUpdate.data.json") },
        { title: "WeatherCompact", template: require("./WeatherCompact.template.json"), data: require("./WeatherCompact.data.json") },
        { title: "WeatherLarge", template: require("./WeatherLarge.template.json"), data: require("./WeatherLarge.data.json") },

        { title: "ac-qv-benefits.json", template: require("./ac-qv-benefits.json"), data: null },
        { title: "ac-qv-cafe.json", template: require("./ac-qv-cafe.json"), data: null },
        { title: "ac-qv-calendar.json", template: require("./ac-qv-calendar.json"), data: null },
        { title: "ac-qv-event.json", template: require("./ac-qv-event.json"), data: null },
        { title: "ac-qv-faqs.json", template: require("./ac-qv-faqs.json"), data: null },
        { title: "ac-qv-form.json", template: require("./ac-qv-form.json"), data: null },
        { title: "ac-qv-holidays.json", template: require("./ac-qv-holidays.json"), data: null },
        { title: "ac-qv-inventory.json", template: require("./ac-qv-inventory.json"), data: null },
        { title: "ac-qv-praise.json", template: require("./ac-qv-praise.json"), data: null },
        { title: "ac-qv-product.json", template: require("./ac-qv-product.json"), data: null },
        { title: "ac-qv-table.json", template: require("./ac-qv-table.json"), data: null },
        { title: "ac-qv-time-off.json", template: require("./ac-qv-time-off.json"), data: null },
    ];
};