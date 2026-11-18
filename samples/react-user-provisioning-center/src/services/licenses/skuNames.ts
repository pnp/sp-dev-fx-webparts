const SKU_DISPLAY_NAMES: Record<string, string> = {

  SPE_F1: 'Microsoft 365 F1',
  SPE_F3: 'Microsoft 365 F3',
  SPE_E3: 'Microsoft 365 E3',
  SPE_E5: 'Microsoft 365 E5',
  SPE_E3_USGOV: 'Microsoft 365 E3 (GCC Government)',
  SPE_E5_USGOV: 'Microsoft 365 E5 (GCC Government)',
  SPE_F5: 'Microsoft 365 F5',

  O365_F3: 'Office 365 F3',
  O365_E3: 'Office 365 E3',
  O365_E5: 'Office 365 E5',
  O365_E5_NOPSTNCONF: 'Office 365 E5 without Audio Conferencing',
  O365_BUSINESS_ESSENTIALS: 'Microsoft 365 Business Basic',
  O365_BUSINESS_PREMIUM: 'Microsoft 365 Business Standard',
  O365_BUSINESS: 'Microsoft 365 Apps for Business',
  SPB: 'Microsoft 365 Business Premium',
  STANDARDPACK: 'Office 365 E1',
  ENTERPRISEPACK: 'Office 365 E3',
  ENTERPRISEPREMIUM: 'Office 365 E5',
  ENTERPRISEPREMIUM_NOPSTNCONF: 'Office 365 E5 without Audio Conferencing',
  DESKLESSPACK: 'Office 365 F3',

  EXCHANGESTANDARD: 'Exchange Online (Plan 1)',
  EXCHANGEENTERPRISE: 'Exchange Online (Plan 2)',
  EXCHANGEDESKLESS: 'Exchange Online Kiosk',
  EXCHANGE_ESSENTIALS: 'Exchange Online Essentials',
  EXCHANGEDESKLESS_GOV: 'Exchange Online Kiosk (Government)',
  EXCHANGESTANDARD_GOV: 'Exchange Online (Plan 1) (Government)',
  EXCHANGEENTERPRISE_GOV: 'Exchange Online (Plan 2) (Government)',

  TEAMS_EXPLORATORY: 'Microsoft Teams Exploratory',
  TEAMS_FREE: 'Microsoft Teams (Free)',
  TEAMS_ESSENTIALS: 'Microsoft Teams Essentials',

  ONEDRIVESTANDARD: 'OneDrive for Business (Plan 1)',
  ONEDRIVEENTERPRISE: 'OneDrive for Business (Plan 2)',
  WACONEDRIVESTANDARD: 'OneDrive for Business (Plan 1)',
  WACONEDRIVEENTERPRISE: 'OneDrive for Business (Plan 2)',
  SHAREPOINTSTANDARD: 'SharePoint Online (Plan 1)',
  SHAREPOINTENTERPRISE: 'SharePoint Online (Plan 2)',

  POWER_BI_STANDARD: 'Power BI Free',
  POWER_BI_PRO: 'Power BI Pro',
  POWER_BI_PREMIUM_PER_USER: 'Power BI Premium Per User',
  POWERAPPS_PER_USER: 'Power Apps Plan 2',
  POWERAPPS_VIRAL: 'Power Apps Plan 2 Trial',
  POWERAUTOMATE_FREE: 'Power Automate Free',
  POWERAUTOMATE_PER_USER: 'Power Automate Per User',
  POWERAUTOMATE_VIRAL: 'Power Automate Trial',

  EMSPREMIUM: 'Enterprise Mobility + Security E5',
  EMS: 'Enterprise Mobility + Security E3',
  EMSPREMIUM_USGOV: 'Enterprise Mobility + Security E5 (Government)',
  AAD_PREMIUM: 'Microsoft Entra ID P1',
  AAD_PREMIUM_P2: 'Microsoft Entra ID P2',
  AAD_BASIC: 'Microsoft Entra ID Basic',
  AAD_PREMIUM_GOV: 'Microsoft Entra ID P1 (Government)',
  AAD_PREMIUM_P2_GOV: 'Microsoft Entra ID P2 (Government)',
  ATA: 'Microsoft Entra ID Protection',
  RMS_S_ENTERPRISE: 'Azure Information Protection Premium P1',
  RMS_S_PREMIUM: 'Azure Information Protection P2',
  INTUNE: 'Microsoft Intune',
  INTUNE_A: 'Microsoft Intune',
  INTUNE_A_D: 'Microsoft Intune Device',

  DYN365_ENTERPRISE_PLAN1: 'Dynamics 365 Customer Engagement Plan',
  DYN365_ENTERPRISE_SALES: 'Dynamics 365 Sales Enterprise Edition',
  DYN365_ENTERPRISE_CUSTOMER_SERVICE: 'Dynamics 365 Customer Service Enterprise Edition',
  DYN365_TEAM_MEMBERS: 'Dynamics 365 Team Members',
  DYN365_BUSCENTRAL_ESSENTIALS: 'Dynamics 365 Business Central Essentials',
  DYN365_BUSCENTRAL_PREMIUM: 'Dynamics 365 Business Central Premium',
  CRMSTANDARD: 'Dynamics 365 Sales Professional',

  WIN10_PRO_ENT: 'Windows 10/11 Enterprise E3',
  WIN10_VDA_PRO: 'Windows 10/11 Enterprise E5',
  WIN_VDA_E3: 'Windows 10/11 Enterprise E3 (VDA)',
  WIN_VDA_E5: 'Windows 10/11 Enterprise E5 (VDA)',

  VISIO_PLAN1: 'Visio Plan 1',
  VISIO_PLAN2: 'Visio Plan 2',
  PROJECTPROFESSIONAL: 'Project Plan 3',
  PROJECTPREMIUM: 'Project Plan 5',
  PROJECTESSENTIALS: 'Project Plan 1',

  STANDARDWOFFPACK_FACULTY: 'Office 365 A1 (Faculty)',
  STANDARDWOFFPACK_STUDENT: 'Office 365 A1 (Student)',
  STANDARDWOFFPACK_IW_FACULTY: 'Office 365 A1 Plus (Faculty)',
  STANDARDWOFFPACK_IW_STUDENT: 'Office 365 A1 Plus (Student)',
  ENTERPRISEPACKPLUS_FACULTY: 'Office 365 A3 (Faculty)',
  ENTERPRISEPACKPLUS_STUDENT: 'Office 365 A3 (Student)',
  ENTERPRISEPREMIUM_FACULTY: 'Office 365 A5 (Faculty)',
  ENTERPRISEPREMIUM_STUDENT: 'Office 365 A5 (Student)',

  SPE_F3_USGOV: 'Microsoft 365 F3 (Government)',
  SPE_F1_USGOV: 'Microsoft 365 F1 (Government)',

  COPILOT_STICKERPACK: 'Microsoft Copilot Pro',
  COPILOT_FOR_M365: 'Microsoft 365 Copilot',

  FLOW_FREE: 'Power Automate Free',
  POWERAPPS_DEV: 'Power Apps Developer',

  M365EDU_A1: 'Microsoft 365 A1',
  M365EDU_A3: 'Microsoft 365 A3',
  M365EDU_A5: 'Microsoft 365 A5',
  M365EDU_A3_FACULTY: 'Microsoft 365 A3 (Faculty)',
  M365EDU_A5_FACULTY: 'Microsoft 365 A5 (Faculty)',

  Defender_for_P1: 'Microsoft Defender for Office 365 Plan 1',
  Defender_for_P2: 'Microsoft Defender for Office 365 Plan 2'
};

export function skuDisplayName(skuPartNumber: string): string {
  const known: string | undefined = SKU_DISPLAY_NAMES[skuPartNumber];
  if (known) {
    return known;
  }

  return skuPartNumber.replace(/_/g, ' ');
}