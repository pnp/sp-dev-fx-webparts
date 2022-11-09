import * as React from 'react';
import { IDalleImageGeneratorProps } from './IDalleImageGeneratorProps';
import { IDalleImageGeneratorState } from './IDalleImageGeneratorState';
import { imageGenerationAllowedSizes } from '../models/IGeneratedImagesRequest';
import { IGeneratedImagesResponse } from '../models/IGeneratedImagesResponse';

import { Stack, Slider } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Image } from '@fluentui/react/lib/Image';
import {
  Link,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';

import { base64StringToBlob } from 'blob-util';

export default class DalleImageGenerator extends React.Component<IDalleImageGeneratorProps, IDalleImageGeneratorState> {

  constructor(props: IDalleImageGeneratorProps) {
    super(props);
    this.state = {
      images: [],
      imageDescription: '',
      imageSize: '256x256',
      numberOfImages: 3,
      imageSavedInfo: '',
      actionMessageInfo: 'Fill the form and generate some images...'
    };

    this._sendImagesGenerationRequest = this._sendImagesGenerationRequest.bind(this);
  }

  public render(): React.ReactElement<IDalleImageGeneratorProps> {

    const options: IChoiceGroupOption[] = [
      { key: '256x256', text: '256x256' },
      { key: '512x512', text: '512x512' },
      { key: '1024x1024', text: '1024x1024'}
    ];

    let images = undefined;
    if (this.state.images && this.state.images.length > 0) {
      images = this.state.images.map((imageAsBase64, index) => {
        const blob = base64StringToBlob(imageAsBase64);
        const url = URL.createObjectURL(blob);
        return <Image key={index} src={url} alt={this.state.imageDescription} onClick={async () => {
          const imageUrl: string = await this.props.dalleImageGeneratorService.saveImageToSiteAssetsLibrary(`${this.state.imageDescription}_${index}.png`, blob);
          this.setState({
            imageSavedInfo: this.props.siteAbsoluteUrl + imageUrl
          });
        }} />
      });
    }

    let imageSavedInfo = undefined;
    if (this.state.imageSavedInfo) {
      imageSavedInfo = <MessageBar messageBarType={MessageBarType.success}>Image saved!
        <Link href={this.state.imageSavedInfo} target="_blank" underline>
        {this.state.imageSavedInfo}
        </Link>
      </MessageBar>
    }

    return (
      <Stack>
        <TextField 
          label="Image description (be creative!)" 
          multiline 
          rows={3} 
          onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => { this.setState({imageDescription: newValue})}}
        />
        <Slider 
          label="Number of images to generate?" 
          min={1} 
          max={10} 
          step={1} 
          defaultValue={3} 
          showValue 
          snapToStep 
          onChange={(value: number, range?: [number, number], event?: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent | React.KeyboardEvent) => { this.setState({numberOfImages: value})}}
        />
        <ChoiceGroup 
          selectedKey={this.state.imageSize} 
          options={options} 
          onChange={(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => { this.setState({imageSize: option.key}) }} 
          label="Size" />;
        <PrimaryButton 
          text="Generate Images with DALL-E"
          onClick={this._sendImagesGenerationRequest} />
        
        <Stack tokens={{ padding: 10, childrenGap: 10 }}>
          <MessageBar>{this.state.actionMessageInfo}</MessageBar>
          {imageSavedInfo}
          {images}
        </Stack>
      </Stack>
    );
  }

  private async _sendImagesGenerationRequest(): Promise<void> {
    console.log(this.state);

    this.setState({
      actionMessageInfo: 'Generating images from DALL-E...'
    })

    const generationsResponse: IGeneratedImagesResponse = await this.props.dalleImageGeneratorService.generateImages(
      this.state.imageDescription, 
      this.state.numberOfImages, 
      this.state.imageSize as imageGenerationAllowedSizes);

    console.log(generationsResponse);

    this.setState({
      actionMessageInfo: 'Click on the image to save it into the site documents library',
      images: generationsResponse.data.map(i => i.b64_json)
    });
  }
}
