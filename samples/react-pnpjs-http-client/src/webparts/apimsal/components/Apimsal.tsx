import * as React from 'react';
import styles from './Apimsal.module.scss';
import { IApimsalProps } from './IApimsalProps';
import  '@pnp/graph/';
import  '@pnp/graph/users';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardTitle,
} from 'office-ui-fabric-react/lib/DocumentCard';
// import { IUser } from '@pnp/graph/users';
export interface IReactSpfxState{    
    user:GitUser;
        
} 
export interface GitUser{
  name:string;
  followers:number;
  blog:string;
  imageUrl:string;
}
export default class Apimsal extends React.Component<IApimsalProps,GitUser, {}> {
  
//  public async componentDidMount() {

public async componentDidMount(): Promise<void> {
  // read all file sizes from Documents library
  console.log("loadedx");
  this.setState({
    "name": "",   
  "blog": "",   
  "followers":9,
  "imageUrl":""
});

  await this.fetchUserDetails();
}

private fetchUserDetails= async (): Promise<void> => {
  // @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await this.props.userService.getUserDetails("divya-akula","name").then((result:any)=>{
    this.setState({name: result.name,followers:result.followers,blog:result.blog,imageUrl:result.
      avatar_url}
    );
  }); 
}

 

  public    render(): React.ReactElement<IApimsalProps> {
    // let userDetails:ReactElement= null;
  
    const {
      isDarkTheme,
      hasTeamsContext,
    } = this.props;
    if(this.state !== null)
    {
      return (
        <section className={`${styles.apimsal} ${hasTeamsContext ? styles.teams : ''}`}>
          <div>
            {/* <h3>{this.state.user.name}</h3> */}
            <this.UserElement blog={this.state.blog} followers={this.state.followers} name={this.state.name} imageUrl={this.state.imageUrl}/>
            <div />
          </div>
        </section>);
    }
    return (
      <section className={`${styles.apimsal} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, !</h2>
          <div/>
          <div>Web part property value: </div>
        </div>
        <div>
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col">
                I am empty <i className="ms-Icon ms-Icon--Sad" aria-hidden="true"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  
  }
    UserElement( currentUser: GitUser ):React.ReactElement
  {
    // const previewProps: IDocumentCardPreviewProps = {
    //   previewImages: [
    //     {
    //       previewImageSrc: currentUser.imageUrl,
    //       imageFit: ImageFit.cover,
    //       height: 130
    //     }
    //   ]
    // };
    let UserDetail=null;
    // await  this.props.userService.getUserDetails("divya-akula","name").then((result:any)=>{
      console.log(currentUser);
      UserDetail=
        <div className={`${styles.proile}`}>
          <DocumentCard>
          <DocumentCardDetails>
          <DocumentCardTitle
            title={currentUser.name}
            shouldTruncate={true}
          />
          <DocumentCardActivity people={[{ name: String( currentUser.followers), profileImageSrc: currentUser.imageUrl }]} activity={currentUser.blog}/>
          
            </DocumentCardDetails>
          </DocumentCard>
          
            </div>;
            // return userDetail;
    //  }).catch((excep:any)=>{
    //   console.log(excep);
    // });
    // var userElement = React.createElement("div",userDetail);

    return UserDetail;
  }

}


