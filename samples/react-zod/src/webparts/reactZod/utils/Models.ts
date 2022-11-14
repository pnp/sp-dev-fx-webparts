import { z } from "zod";

const dateFormatter = new Intl.DateTimeFormat([], {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

// Setup schema
const FormResultSchema = z.object({
  Id: z.number(),
  Title: z.string(),
  Description: z.string(),
  IsActive: z.boolean(),
  Qty: z.number().nonnegative(),
  Rating: z.number().min(0).max(10),
  Email: z.string().email(),
  Status: z.enum(["Active", "Done", "Rejected"]),
  PublishDate: z
    .string()
    .transform((value) => (value ? dateFormatter.format(new Date(value)) : "")),
  Contact: z
    .object({
      Title: z.string(),
    })
    .transform((value) => value.Title),
});
const FormResultsSchema = z.array(FormResultSchema);

// Generate type from schema
type FormResultModel = z.infer<typeof FormResultSchema>;
type FormResultsModel = z.infer<typeof FormResultsSchema>;

export { FormResultsSchema, FormResultModel, FormResultsModel };
