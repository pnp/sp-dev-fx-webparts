declare interface IThirdDeploymentDemoCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ThirdDeploymentDemoCommandSetStrings' {
  const strings: IThirdDeploymentDemoCommandSetStrings;
  export = strings;
}
