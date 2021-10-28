export interface IRFx {
    title: string;
    closingDate:Date;
    contractSpecialist:{
      EMail:string
    };
    contractSpecialistId:number;
    id:number; //the id of the listitem that holds the doclib title and securitygroup name
   // internalSecurityGroupId:number;members
   libraryMembersGroupId:number;
    //externalSecurityGroupId:number;;visitors
    libraryVisitorsGroupId:number;
    libraryOwnersGroupId:number;
    description:string;
    
  }
  