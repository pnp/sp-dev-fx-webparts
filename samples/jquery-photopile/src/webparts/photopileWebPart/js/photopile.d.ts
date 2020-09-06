/**
 * @file
 * Photopile Module definition
 *
 * Enables to interact with the Photopile.js object in typescript
 *
 * Author: Olivier Carpentier
 */
declare module "photopileModule" {

  /**
   * @interface
   * Photopile Module definition
   */
  interface IPhotopile {
    /**
     * @function
     * Inits the photopile effect
     */
    scatter(): void;

    /**
     * @function
     * Sets the number of layers in the pile (max zindex)
     */
    setNumLayers(numLayers: number): void;
    /**
     * @function
     * Sets the overlap amount (px)
     */
    setThumbOverlap(thumbOverlap: number): void;
    /**
     * @function
     * Sets the maximum rotation (deg)
     */
    setThumbRotation(thumbRotation: number): void;
    /**
     * @function
     * Sets the thumbnails border width (px)
     */
    setThumbBorderWidth(thumbBorderWidth: number): void;
    /**
     * @function
     * Sets the thumbails border color
     */
    setThumbBorderColor(thumbBorderColor: string): void;
    /**
     * @function
     * Sets the thumbnails border hover color
     */
    setThumbBorderHover(thumbBorderHover: string): void;
    /**
     * @function
     * Sets if enable draggable thumbnails
     */
    setDraggable(draggable: boolean): void;
    /**
     * @function
     * Sets the speed at which photo fades (ms)
     */
    setFadeDuration(fadeDuration: number): void;
    /**
     * @function
     * Sets the speed at which photo is picked up & put down (ms)
     */
    setPickupDuration(pickupDuration: number): void;
    /**
     * @function
     * Sets the  z-index (show above all)
     */
    setPhotoZIndex(photoZIndex: number): void;
    /**
     * @function
     * Sets the border width around fullsize image
     */
    setPhotoBorder(photoBorder: number): void;
    /**
     * @function
     * Sets the fullsize image border color
     */
    setPhotoBorderColor(photoBorderColor: string): void;
    /**
     * @function
     * Sets if include photo description (alt tag) in photo container
     */
    setShowInfo(showInfo: boolean): void;
    /**
     * @function
     * Sets if autoplay the photopile
     */
    setAutoplayGallery(autoplayGallery: boolean): void;
    /**
     * @function
     * Sets the autoplay speed (ms)
     */
    setAutoplaySpeed(autoplaySpeed: number): void;
}

  const photopile: IPhotopile;
  export = photopile;
}
