import { sp, IWebInfo } from '@pnp/sp/presets/all';
import { LogHelper, ListNames, ListTitles } from 'utilities';
import { BaseService } from './base.service';

export class QuestionsAssetsService extends BaseService {

  public async uploadImageToQuestionsAssets(questionTitle: string, blobInfo: any, onUploadProgress) : Promise<string> {
    LogHelper.verbose('usePageApi', 'uploadImageToSiteAssetsAsync', ``);

    var web: IWebInfo = await sp.web
      .expand('Url', 'ServerRelativeUrl')
      .get();

    var uniqueId = Math.floor(Math.random() * 10000); // get a 4 digit random number
    var folderName = questionTitle.replace('?', '').replace(/[\W_]+/g, '-');
    var folderPath = `${web.ServerRelativeUrl}/${ListNames.QUESTIONS_ASSETS}`;
    var imageName = `${uniqueId}_${blobInfo.blob().name}`;
    var imageUrl = `${web.Url}/${ListNames.QUESTIONS_ASSETS}/${folderName}/${imageName}`;

    // ensure our folders exist before we try to add files
    if(folderName && folderName.length > 0) {
      folderPath += `/${folderName}`;
      await sp.web.lists.getByTitle(ListTitles.QUESTIONS_ASSETS).rootFolder.folders.add(`${folderName}`);
    }

    onUploadProgress(0);

    // chunk if bigger than 5 MB
    const chunkSize = 5242880;

    if (blobInfo.blob().size <= chunkSize) {
      // small upload
      await sp.web.getFolderByServerRelativeUrl(folderPath).files
        .add(imageName, blobInfo.blob(), true);

        return imageUrl;
    }
    else {
      // large upload
      await sp.web.getFolderByServerRelativeUrl(folderPath).files.addChunked(imageName, blobInfo.blob(), data => {
        var percentComplete = data.blockNumber / data.totalBlocks * 100;
        onUploadProgress(percentComplete);
      }, true, chunkSize);

      return imageUrl;
    }
  }

}
