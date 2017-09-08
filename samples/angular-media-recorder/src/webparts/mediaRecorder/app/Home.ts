
import styles from '../MediaRecorder.module.scss';

export default class Home {
    public static templateHtml: string =  `
    <div class="${styles.mediaRecorder}" ng-cloak>
        <div class="${styles.container}" data-ng-controller="HomeController as hctrl">
            <div ng-if="hctrl.message">
                <div class="${styles.mediaRecorderSection}">
                    {{hctrl.message}}
                </div>
            </div>
            <div ng-if="hctrl.configurationNeeded && !hctrl.isLoading">
                <div class="${styles.mediaRecorderSection}">
                    Please configure this webpart
                </div>
            </div>
            <div ng-if="!hctrl.configurationNeeded">
                <div class="${styles.mediaRecorderSection}" ng-if="hctrl.isLoading">
                    Loading...
                </div>
                <div class="${styles.mediaRecorderSection}" ng-if="!hctrl.mediaRecorderApi">
                    <input value="hctrl.file.fileName" data-custom-file-change="hctrl.file" type="file" accept="video/*" capture="user"/>
                    <button class="${styles.mediaRecorderButton}" ng-model="hctrl.btnFileUpload" data-ng-click="hctrl.handleFileUpload($event)">Upload File</button>        
                </div>
                <div class="${styles.mediaRecorderSection}" ng-if="hctrl.mediaRecorderApi">
                    <playback></playback>
                    <video class="${styles.mediaRecorderVideo}" ng-if="hctrl.showVideo" ng-model="hctrl.vdRecorder" autoPlay muted ></video>
                    <button class="${styles.mediaRecorderButton}" ng-if="hctrl.showCameraSelection" ng-model="hctrl.frontCamera" ng-click="hctrl.cameraChange($event)">Use Back Camera</button>
                    <button class="${styles.mediaRecorderButton}" ng-if="hctrl.showStart"  ng-model="hctrl.btnStart" ng-click="hctrl.handleVideoRecording($event)">Start Recording</button>
                    <button class="${styles.mediaRecorderButton}" ng-if="hctrl.showStop"  ng-model="hctrl.btnStop" ng-click="hctrl.handleVideoStop($event)">Stop Recording</button>
                    <button class="${styles.mediaRecorderButton}" ng-if="hctrl.showUpload" ng-model="hctrl.btnUpload" ng-click="hctrl.handleVideoUpload($event)">Upload Recording</button>
                    <button class="${styles.mediaRecorderButton}" ng-if="hctrl.showRetry" ng-model="hctrl.btnRetry" ng-click="hctrl.handleVideoRetry($event)">Retry</button>
                </div>
            </div>
        </div>
    </div>
    `;
}