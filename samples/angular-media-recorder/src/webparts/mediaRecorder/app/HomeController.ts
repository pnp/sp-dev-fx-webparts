import { IDataService, } from "../app/DataService";
import { IFile } from "../app/IFile";
import styles from '../MediaRecorder.module.scss';

export default class HomeController {

    /*=================
    | WebPart Properties |
    =================*/
    private listName: string = null;
    private webUrl: string = null;

    /*=================
    | Controller Objects |
    =================*/

    public file: IFile;

    private fileBlob: any = null;
    private currentStream: any = null;
    private recordedBlobs: any = [];
    private recordedBlobType: any = null;

    private message: string = null;
    private vdRecorderSrc: string = null;

    private isLoading: boolean = true;
    private frontCamera: boolean = true;
    private mediaRecorderApi: boolean = false;
    private configurationNeeded: boolean = true;
    private showVideo: boolean = true;
    private showStart: boolean = true;
    private showStop: boolean = false;
    private showUpload: boolean = false;
    private showRetry: boolean = false;
    private showCameraSelection: boolean = true;

    public static $inject: string[] = ['DataService', '$window', '$rootScope', '$scope'];

    constructor(private dataService: IDataService, private $window: ng.IWindowService, private $rootScope: ng.IRootScopeService, private $scope: ng.IScope) {
        const hctrl: HomeController = this;

        /*=================
        | Property changed event in rootScope|
        =================*/
        $rootScope.$on('configurationChanged', (event: ng.IAngularEvent, args: { listName: string; webUrl: string }): void => {
            hctrl.init(args.listName, args.webUrl);
        });
    }

    /*=================
    | View Initialization |
    =================*/
    private init(propListName: string, propWebUrl: string): void {

        const hctrl: HomeController = this;

        hctrl.isLoading = true;

        hctrl.file = null;
        hctrl.fileBlob = null;
        hctrl.currentStream = null;
        hctrl.recordedBlobs = [];
        hctrl.recordedBlobType = null;

        hctrl.message = null;
        hctrl.vdRecorderSrc = null;

        hctrl.frontCamera = true;
        hctrl.mediaRecorderApi = false;
        hctrl.configurationNeeded = true;
        hctrl.showVideo = true;
        hctrl.showStart = true;
        hctrl.showStop = false;
        hctrl.showUpload = false;
        hctrl.showRetry = false;
        hctrl.showCameraSelection = true;

        if (propListName != null && propListName.length > 0 &&
            propWebUrl != null && propWebUrl.length > 0) {
            hctrl.listName = propListName;
            hctrl.webUrl = propWebUrl;
            hctrl.configurationNeeded = false;
        }
        else {
            hctrl.configurationNeeded = true;
            hctrl.isLoading = false;
            setTimeout(function () {
                hctrl.$scope.$apply();
            }, 100);
            return;
        }

        // show/hide relevant video upload buttons depending on browser capabilities
        if ((window as any).MediaRecorder) {
            hctrl.mediaRecorderApi = true;
            hctrl.isLoading = false;
            console.info('This browser does support the MediaRecorder API.');
        } else {
            hctrl.mediaRecorderApi = false;
            hctrl.isLoading = false;
            console.info('This browser does not support the MediaRecorder API.');
        }

        setTimeout(function () {
            hctrl.$scope.$apply();
        }, 100);

    }

    /*=================
    | Start Video Recording |
    =================*/
    private handleVideoRecording(event?: any): void {

        const hctrl: HomeController = this;

        try {
            // First get ahold of getUserMedia, if present
            // Return if browser does not implement to keep a consistent interface
            if (navigator.mediaDevices.getUserMedia === undefined) {
                console.info('getUserMedia is not implemented in this browser');
                return;
            }

            let videoZoneElement = event.srcElement.parentElement;
            let vdRecorder = videoZoneElement.querySelector('video');

            let constraints = {
                audio: true,
                video: {
                    frameRate: { ideal: 10, max: 15 },
                    facingMode: (hctrl.frontCamera ? "user" : "environment")
                }
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {
                    hctrl.vdRecorderSrc = window.URL.createObjectURL(stream);
                    vdRecorder.src = hctrl.vdRecorderSrc;
                    let mediaRecorder = new (window as any).MediaRecorder(stream);
                    hctrl.currentStream = null;
                    hctrl.recordedBlobs = [];
                    hctrl.currentStream = stream;
                    mediaRecorder.start(10);
                    mediaRecorder.ondataavailable = function (e) {
                        if (e.data && e.data.size > 0) {
                            hctrl.recordedBlobs.push(e.data);
                        }
                    };

                }).catch(function (err) {
                    console.error("The camera recording request failed with error : " + err);
                });

            hctrl.showStart = false;
            hctrl.showStop = true;
            hctrl.showUpload = false;
            hctrl.showCameraSelection = false;
        }
        catch (err) {
            console.error("The camera recording request failed with error : " + err);
        }
    }

    /*=================
    | Stop Video Recording |
    =================*/
    private handleVideoStop(event?: any): void {

        const hctrl: HomeController = this;

        try {
            hctrl.currentStream.getTracks().forEach(function (track) {
                track.stop();
            });

            hctrl.recordedBlobType = hctrl.recordedBlobs[0].type;
            hctrl.fileBlob = new Blob(hctrl.recordedBlobs, { type: hctrl.recordedBlobType });

            let videoZoneElement = event.srcElement.parentElement;
            if (videoZoneElement) {

                let vdRecorder = videoZoneElement.querySelector('video');
                if (vdRecorder) {

                    if (vdRecorder) {
                        vdRecorder.pause();
                        vdRecorder.src = '';
                        vdRecorder.load();
                    }

                    if (hctrl.currentStream && hctrl.currentStream.stop) {
                        hctrl.currentStream.stop();
                    }
                }

                let videoPlaybackZoneElement = videoZoneElement.querySelector('playback');
                if (videoPlaybackZoneElement) {
                    let videoPlaybackElement = document.createElement('video');
                    videoPlaybackElement.controls = true;
                    videoPlaybackElement.classList.add(styles.mediaRecorderVideo);
                    videoPlaybackElement.src = window.URL.createObjectURL(hctrl.fileBlob);
                    videoPlaybackZoneElement.appendChild(videoPlaybackElement);
                    videoPlaybackElement.play();
                }
            }
        }
        catch (err) {
            console.error("The camera stop request failed with error : " + err);
        }
        finally {
            hctrl.currentStream = null;
            hctrl.recordedBlobs = [];
            hctrl.recordedBlobType = null;
            hctrl.vdRecorderSrc = null;
            hctrl.showVideo = false;
            hctrl.showStart = false;
            hctrl.showStop = false;
            hctrl.showUpload = true;
            hctrl.showRetry = true;
        }
    }

    /*=================
    | Chnage Camera  |
    =================*/
    private cameraChange(event?: any): void {

        const hctrl: HomeController = this;

        try {
            if (event.srcElement) {
                if (event.srcElement.innerText == "Use Front Camera") {
                    event.srcElement.innerText = "Use Back Camera";
                    hctrl.frontCamera = true;

                } else {
                    event.srcElement.innerText = "Use Front Camera";
                    hctrl.frontCamera = false;
                }
            }
        }
        catch (err) {
            console.error("The camera change request failed with error : " + err);
        }
    }

    /*=================
    | Upload Recording |
    =================*/
    private handleVideoUpload(event?: any): void {

        const hctrl: HomeController = this;

        hctrl.showUpload = false;
        hctrl.isLoading = true;

        try {
            let rand = Math.floor((Math.random() * 10000000));
            let fileName = "video_" + rand + ".webm";
            let contents = hctrl.dataService.arrayBufferToBase64(hctrl.fileBlob);
            
            hctrl.dataService.uploadFile(contents, fileName, hctrl.webUrl, hctrl.listName).then((itemId: string): void => {
                hctrl.message = "File uploaded Id is : " + itemId + " with name " + fileName;
            }).catch((err): void => {
                console.error("The video upload request failed with error : " + err);
            });

            let videoZoneElement = event.srcElement.parentElement;

            if (videoZoneElement) {
                let videoPlaybackZoneElement = videoZoneElement.querySelector('playback');

                if (videoPlaybackZoneElement) {
                    let videoPlaybackElement = videoZoneElement.querySelector('video');

                    if (videoPlaybackElement) {
                        videoPlaybackElement.parentNode.removeChild(videoPlaybackElement);
                    }
                }
            }
        }
        catch (err) {
            console.error("The video upload request failed with error : " + err);
        }
        finally {
            hctrl.fileBlob = null;
            hctrl.isLoading = false;
        }
    }

    /*=================
    | Upload File |
    =================*/
    public handleFileUpload(event?: any): void {

        const hctrl: HomeController = this;

        if (!hctrl.file) {
            hctrl.message = 'Select a file to upload.';
            return;
        }

        hctrl.isLoading = true;

        let fileName = hctrl.file.fileName;
        let fileBuffer = hctrl.file.fileAsBuffer;

        try {
            hctrl.dataService.uploadFile(fileBuffer, fileName, hctrl.webUrl, hctrl.listName).then((itemId: string): void => {
                hctrl.message = "File uploaded Id is : " + itemId + " with name " + fileName;
            }).catch((err): void => {
                console.error("The file upload request failed with error : " + err);
            });
        }
        catch (err) {
            console.error("The file upload request failed with error : " + err);
        }
        finally {
            hctrl.isLoading = false;
            hctrl.file = null;
        }
    }

    /*=================
    | Retry |
    =================*/
    public handleVideoRetry(event?: any): void {

        const hctrl: HomeController = this;

        try {

            let videoZoneElement = event.srcElement.parentElement;
            if (videoZoneElement) {

                let videoPlaybackZoneElement = videoZoneElement.querySelector('playback');
                if (videoPlaybackZoneElement) {

                    let videoPlaybackElement = videoZoneElement.querySelector('video');
                    if (videoPlaybackElement) {
                        videoPlaybackElement.parentNode.removeChild(videoPlaybackElement);
                    }
                }
            }

            hctrl.init(hctrl.listName, hctrl.webUrl);
        }
        catch (err) {
            console.error("The retry request failed with error : " + err);
        }
    }
}