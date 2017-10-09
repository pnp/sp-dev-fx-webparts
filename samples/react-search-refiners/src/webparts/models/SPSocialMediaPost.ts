//Almost the same as SocialMediaGroup, but the other way around: Post is prime and holds its group information within.
//Used for OData query with PnP ODataEntityArray. The data provider should transform that as SocialMediaGroup.
//Also used to add new items to lists.
export class SPSocialMediaPage {
  public Id: number;
}

export class SPSocialMediaGroup {
  public Id?: number;
  public Title?: string;
  public Page?: SPSocialMediaPage;
}

export class SPSocialMediaPost {
  public Id?: number;
  public Title?:string;
  public PostGroup?: SPSocialMediaGroup;
}
