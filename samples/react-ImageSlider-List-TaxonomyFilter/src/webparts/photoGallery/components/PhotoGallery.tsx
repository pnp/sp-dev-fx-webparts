import * as React from 'react';
import styles from './PhotoGallery.module.scss';
import { IPhotoGalleryProps } from './IPhotoGalleryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {SPHttpClient,SPHttpClientResponse} from '@microsoft/sp-http';
import Slider from 'react-slick';
import {IPhotoGallery} from '../model/IPhotoGallery';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
export default class PhotoGallery extends React.Component<IPhotoGalleryProps,any> {


  


  constructor (props) {
    super(props);
    
    this.state = {
      currentboxvalue:String, 
      photoGallery: [      {
        photoURL:"",
        photoID:""
      }
      ],
    };
  
  this.getPhotos=this.getPhotos.bind(this);
  this.loadPhotos=this.loadPhotos.bind(this);
  this.getPhotosURL=this.getPhotosURL.bind(this);
}

componentDidUpdate(prevProps) {
   if (prevProps.tagkeywords === this.props.tagkeywords)
   {
    // this.loadPhotos()
   }
   else
   {
    this.loadPhotos();
   }
}

  componentDidMount(){
      this.loadPhotos();
  
  }
 
 getPhotos(termSet) {  
    
    this.props.spHttpClient.get(this.props.siteurl + `/_api/web/lists/GetByTitle('Photos')/Items?$filter=TaxCatchAll/IdForTerm eq '`  + termSet +`'`, 
    SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {  
      if (response.ok) {  
          response.json().then((responseJSON) => {  
              if (responseJSON!=null && responseJSON.value!=null){  
                for (var i=0; i < responseJSON.value.length; i++) {
                  this.getPhotosURL(responseJSON.value[i].ID)
                  //so on 
               }
              
              }  
          }); 
      }  
  });
}
    


  loadPhotos()
  {
   if (this.props.tagkeywords != undefined)
   {
     if (this.props.tagkeywords.length >=1)
     {
       this.state.photoGallery.length=0;
    this.props.tagkeywords.map((tg) => this.getPhotos(tg.key));
     }
   }
    
   //this.getPhotosURL(2);
   //this.getPhotosURL(3);
  
  }


  getPhotosURL(itemid) {  
    
    this.props.spHttpClient.get(this.props.siteurl + `/_api/web/lists/GetByTitle('Photos')/Items(`+itemid+`)?$select=FileRef/FileRef`, 
    SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {  
      if (response.ok) {  
          response.json().then((responseJSON) => {  
              if (responseJSON!=null){  
                  let items:any[] = responseJSON;  
                  this.setState(prevState => ({
                    photoGallery: [...prevState.photoGallery, { "photoURL" : items["FileRef"], "photoID" : itemid }]
                  }))
              }  
          });  
      }  
  }); 
}
    

  public render(): React.ReactElement<IPhotoGalleryProps> {
    debugger;
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      cssEase: "linear"
    };

    return (
      <div>
      { this.state.photoGallery != undefined &&
      <Slider {...settings}>
        {      
                this.state.photoGallery.map((pg)=> <this.PhotoComponent imgurl={pg.photoURL} />)          
        }
      </Slider>
      }
      { this.state.photoGallery.length == 1 && this.state.photoGallery[0].photoID == "" && <h1>Please configure the web part</h1>
      
      }
      </div>
    );
  
  }

  PhotoComponent=props =>
  (
  <div>
  <img src={props.imgurl} />
  </div>
  );
}
