import * as yup from 'yup';

const NAME_MAX: number = 64;
const ISO_DATE: RegExp = /^\d{4}-\d{2}-\d{2}$/;
const UPN_LOCAL: RegExp = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/;
const ISO_COUNTRY: RegExp = /^[A-Z]{2}$/;

export const personalSchema = yup.object({
  firstName: yup.string().trim().required('required').max(NAME_MAX, 'tooLong'),
  lastName: yup.string().trim().required('required').max(NAME_MAX, 'tooLong'),
  displayName: yup.string().trim().required('required').max(256, 'tooLong'),
  employeeId: yup.string().trim().required('required').max(16, 'tooLong'),
  mobilePhone: yup
    .string()
    .trim()
    .matches(/^\+?[0-9 ()-]{5,20}$/, { message: 'invalidPhone', excludeEmptyString: true }),
  personalEmail: yup.string().trim().email('invalidEmail')
});

export const employmentSchema = yup.object({
  jobTitle: yup.string().trim().required('required').max(128, 'tooLong'),
  department: yup.string().trim().required('required').max(64, 'tooLong'),
  companyName: yup.string().trim().max(64, 'tooLong'),
  officeLocation: yup.string().trim().max(128, 'tooLong'),
  country: yup.string().trim().matches(ISO_COUNTRY, { message: 'invalidCountry', excludeEmptyString: true }),
  managerId: yup.string().trim(),
  managerDisplayName: yup.string().trim(),
  managerUpn: yup.string().trim(),
  employeeType: yup
    .string()
    .oneOf(['Employee', 'Contractor'], 'invalidChoice')
    .required('required'),
  hireDate: yup.string().required('required').matches(ISO_DATE, 'invalidDate')
});

export const identitySchema = yup.object({
  userPrincipalName: yup.string().trim().required('required').email('invalidUpn'),
  mailNickname: yup
    .string()
    .trim()
    .required('required')
    .max(64, 'tooLong')
    .matches(UPN_LOCAL, 'invalidLocalPart'),
  domain: yup.string().trim().required('required')
});

export const accountSettingsSchema = yup.object({
  usageLocation: yup.string().required('required').matches(ISO_COUNTRY, 'invalidCountry'),
  accountEnabled: yup.boolean().required(),
  credentialMode: yup.string().oneOf(['password', 'tap'], 'invalidChoice').required('required'),
  forceChangePassword: yup.boolean().required()
});

export const licensesSchema = yup.object({
  licenses: yup
    .array()
    .of(
      yup.object({
        skuId: yup.string().required(),
        skuPartNumber: yup.string().required()
      })
    )
    .required()
});
