// Strings (localization)
import * as strings from "ListViewMetricsWebPartStrings";

export type MetricType =
  | "totalItemCount"
  | "totalUniqueCount"
  | "average"
  | "maxValue"
  | "minValue"
  | "mostPopularValue"
  | "sumValues";

export type FieldType =
  | "Number"
  | "Currency"
  | "Counter"
  | "Integer"
  | "Double"
  | "Boolean"
  | "Text"
  | "Note"
  | "Choice"
  | "MultiChoice"
  | "Lookup"
  | "LookupMulti"
  | "User"
  | "UserMulti"
  | "URL"
  | "DateTime"
  | "TaxonomyFieldType"
  | "TaxonomyFieldTypeMulti"
  | "Calculated";

export type IFieldTypeMetricCompatibility = {
  [K in MetricType]: readonly FieldType[];
};

type ValidationResult = { isValid: boolean; errorMessage: string };

export class MetricFieldValidator {
  // Buckets
  private static readonly NUMERIC_FIELD_TYPES = Object.freeze<FieldType[]>([
    "Number",
    "Currency",
    "Counter",
    "Integer",
    "Double",
  ]);

  private static readonly TEXTLIKE_FIELD_TYPES = Object.freeze<FieldType[]>([
    "Text",
    "Note",
    "Choice",
    "MultiChoice",
    "Lookup",
    "LookupMulti",
    "User",
    "UserMulti",
    "URL",
    "TaxonomyFieldType",
    "TaxonomyFieldTypeMulti",
    "Boolean",
  ]);

  private static readonly DATE_FIELD_TYPES = Object.freeze<FieldType[]>(["DateTime"]);

  // Compatibility map
  private static readonly METRIC_FIELD_COMPATIBILITY: IFieldTypeMetricCompatibility = {
    totalItemCount: [
      ...MetricFieldValidator.NUMERIC_FIELD_TYPES,
      ...MetricFieldValidator.TEXTLIKE_FIELD_TYPES,
      ...MetricFieldValidator.DATE_FIELD_TYPES,
      "Calculated",
    ],
    totalUniqueCount: [
      ...MetricFieldValidator.NUMERIC_FIELD_TYPES,
      ...MetricFieldValidator.TEXTLIKE_FIELD_TYPES,
      ...MetricFieldValidator.DATE_FIELD_TYPES,
      "Calculated",
    ],
    average: [...MetricFieldValidator.NUMERIC_FIELD_TYPES],
    maxValue: [
      ...MetricFieldValidator.NUMERIC_FIELD_TYPES,
      ...MetricFieldValidator.DATE_FIELD_TYPES,
    ],
    minValue: [
      ...MetricFieldValidator.NUMERIC_FIELD_TYPES,
      ...MetricFieldValidator.DATE_FIELD_TYPES,
    ],
    mostPopularValue: [
      ...MetricFieldValidator.NUMERIC_FIELD_TYPES,
      ...MetricFieldValidator.TEXTLIKE_FIELD_TYPES,
      ...MetricFieldValidator.DATE_FIELD_TYPES,
      "Calculated",
    ],
    sumValues: [...MetricFieldValidator.NUMERIC_FIELD_TYPES],
  };

  public static validateMetricFieldCompatibility(
    metricType: string,
    fieldType: string
  ): ValidationResult {
    if (!metricType || !fieldType) {
      return { isValid: true, errorMessage: "" };
    }

    const mt = metricType as MetricType;
    const ft = fieldType as FieldType;

    const compatible = this.METRIC_FIELD_COMPATIBILITY[mt];
    if (!compatible) {
      return { isValid: false, errorMessage: strings.UnknownMetricType.replace("{0}", metricType) };
    }

    if (compatible.includes(ft)) {
      return { isValid: true, errorMessage: "" };
    }

    const friendlyMetric = this.getFriendlyMetricName(mt);
    const friendlyTypes = this.getFriendlyFieldTypes(compatible);

    return {
      isValid: false,
      errorMessage: strings.MetricNotCompatible
        .replace("{0}", friendlyMetric)
        .replace("{1}", fieldType)
        .replace("{2}", friendlyTypes),
    };
  }

  // Display helpers
  private static getFriendlyMetricName(metricType: MetricType): string {
    const names: Record<MetricType, string> = {
      totalItemCount: strings.PP_Metric_TotalCount,
      totalUniqueCount: strings.PP_Metric_TotalUniqueCount,
      average: strings.PP_Metric_Average,
      maxValue: strings.PP_Metric_MaxValue,
      minValue: strings.PP_Metric_MinValue,
      mostPopularValue: strings.PP_Metric_MostPopularValue,
      sumValues: strings.PP_Metric_Sum,
    };
    return names[metricType] ?? metricType;
  }

  private static getFriendlyFieldTypes(fieldTypes: readonly FieldType[]): string {
    const friendly: Record<FieldType, string> = {
      Number: strings.Field_Number,
      Currency: strings.Field_Currency,
      Counter: strings.Field_Counter,
      Integer: strings.Field_Integer,
      Double: strings.Field_Double,
      Boolean: strings.Field_Boolean,
      Text: strings.Field_Text,
      Note: strings.Field_Note,
      Choice: strings.Field_Choice,
      MultiChoice: strings.Field_MultiChoice,
      Lookup: strings.Field_Lookup,
      LookupMulti: strings.Field_LookupMulti,
      User: strings.Field_User,
      UserMulti: strings.Field_UserMulti,
      URL: strings.Field_URL,
      DateTime: strings.Field_DateTime,
      TaxonomyFieldType: strings.Field_Taxonomy,
      TaxonomyFieldTypeMulti: strings.Field_TaxonomyMulti,
      Calculated: strings.Field_Calculated,
    };
    return fieldTypes.map(t => friendly[t] ?? t).join(", ");
  }
}
