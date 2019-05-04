import * as React from 'react';
import { IPhoto } from '../model/IPhoto';

import { IPhotoService } from '../services/PhotoService/IPhotoService';

export interface IPhotosProps {
    customerId: string;
    service: IPhotoService;
}

export interface IPhotosState {
    photos?: IPhoto[];
    currentCustomerId?: string;
}

export class Photos extends React.Component<IPhotosProps, IPhotosState> {

    constructor(props: IPhotosProps) {
        super(props);
        this.state = {
            photos: undefined,
            currentCustomerId: undefined
        };
    }

    public render(): React.ReactElement<IPhotosProps> {

        if (this.props.customerId) {

            if (this.state.currentCustomerId == this.props.customerId) {

                if (this.state.photos && this.state.photos.length > 0) {

                    return (
                        <div>
                            {this.state.photos.map(photo => (
                                <div>
                                    <img src={photo.url} width='200px' /><br />
                                    {photo.name}
                                </div>
                            ))}
                        </div>
                    );

                } else {

                    return (<div>No photos for this property</div>);

                }

            } else {

                this.props.service.getPhotos(this.props.customerId)
                .then ((photos) => {
                    this.setState({
                        photos: photos,
                        currentCustomerId: this.props.customerId
                    });
                });

                return (<div>Loading...</div>);
            }
        } else {
            return (<div></div>);
        }
    }
}