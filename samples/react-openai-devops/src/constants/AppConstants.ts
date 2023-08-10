export class AppConstants {
  private static DEVOPS_ORGANIZATION = "";
  private static OPENAI_API_KEY = "";

  public static getDevOpsOrganization() {
    return AppConstants.DEVOPS_ORGANIZATION;
  }

  public static setDevOpsOrganization(newValue: string) {
    AppConstants.DEVOPS_ORGANIZATION = newValue;
  }
  public static getOpenAIKey() {
    return AppConstants.OPENAI_API_KEY;
  }

  public static setOpenAIKey(newValue: string) {
    AppConstants.OPENAI_API_KEY = newValue;
  }
}
