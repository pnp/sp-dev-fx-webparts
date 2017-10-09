export class SocialMediaPost {
  public Id:number;
  public Title:string;

  public constructor(title:string, id?:number){
    this.Title = title;
    this.Id = id;
  }
}

export class SocialMediaGroup {
  public Id: number;
  public Title: string;
  public Posts: SocialMediaPost[];
}
