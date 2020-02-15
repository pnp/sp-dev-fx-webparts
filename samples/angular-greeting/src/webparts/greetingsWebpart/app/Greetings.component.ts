import { GreetingService } from "./Greetings.service";

export class GreetingController {
  public userName: string = "";
  public userJobTitle: string = "";
  public webSiteTitle: string = "";
  public welComeMessage: string = "";
  public userImageUrl: string = "";

  public greetingMessage: string = "";
  public prefixWelcomeMessage: string = "Welcome to ";

  public static $inject: string[] = ["GreetingService", "$scope"];

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private GreetingService: GreetingService,
    private $scope: ng.IScope
  ) {
    this.$scope.$on(
      "configurationChangedGreetingWebPart",
      (event: ng.IAngularEvent, data: any) => {
        this.webSiteTitle = data.webTitle;
        this.userName = data.userDisplayName;
        this.getValues();
        console.log(this.userImageUrl);
        //this.$scope.$apply();
      }
    );
    this.getValues();
  }

  public getValues = () => {
    if (new Date().getHours() > 0 && new Date().getHours() < 12)
      this.greetingMessage = "Good Morning ";
    else if (new Date().getHours() >= 12 && new Date().getHours() <= 5)
      this.greetingMessage = "Good Afternoon ";
    else if (new Date().getHours() > 5) this.greetingMessage = "Good Evening ";

    if (this.userName.length == 0) this.userName = "Gaurav Goyal";

    if (this.userJobTitle.length == 0) this.userJobTitle = "";

    if (this.webSiteTitle.length == 0)
      this.webSiteTitle = this.prefixWelcomeMessage + "Demo of SPFx Web Part";

    if (this.welComeMessage.length == 0)
      this.welComeMessage = this.greetingMessage + this.userName;

    // if (this.userImageUrl.length == 0)
    //   this.userImageUrl ="";

    this.getCurrentUserInformation();

  }

  public getCurrentUserInformation = () => {
    this.GreetingService.getCurrentUserInformation().then(ig => {
      this.webSiteTitle = this.prefixWelcomeMessage + this.webSiteTitle;
      this.userImageUrl = ig.userImageUrl;
      //this.userName = this.userName;
      this.userJobTitle = ig.userJobTitle;
      this.$scope.$apply();
    });
  }
}

export let GreetingComponent = {
  selector: "greetingComponent",
  template: require("./Greetings.component.html").toString(),
  bindings: {},
  controller: GreetingController,
  styles:require("./Greeting.module.css").toString()
};
