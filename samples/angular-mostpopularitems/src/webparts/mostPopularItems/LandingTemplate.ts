export default class LandingTemplate {
    public static templateHtml: string =  `
        <div data-ng-controller="controller_home">
            <div ng-show="isLoading">
            <uif-spinner>Loading...</uif-spinner>
            </div>
            <div ng-show="needsconfig">
                <p>Please configure this webpart.</p>
            </div>

            <uif-list ng-show="isLoading === false && (PopularItems).length > 0">
            <uif-list-item ng-repeat="PopularItem in PopularItems | orderBy : '-ViewsLifeTime' | limitTo: numberOfItems" uif-item="PopularItem" uif-type="itemWithImage">
                <uif-list-item-image>
                    {{PopularItem.ViewsLifeTime}}
                </uif-list-item-image>
                <uif-list-item-primary-text>{{PopularItem.Title}}</uif-list-item-primary-text>
                <uif-list-item-secondary-text>{{PopularItem.Author}}</uif-list-item-secondary-text>
                <uif-list-item-tertiary-text>{{PopularItem.LastModifiedTime | date : 'shortDate'}}</uif-list-item-tertiary-text>
                <uif-list-item-optional-text>{{PopularItem.FileExtension}}</uif-list-item-optional-text>
            </uif-list-item>
            </uif-list>

            <div ng-show="isLoading === false && (PopularItems).length <= 0 && !error">
                <p>No records found.</p>
            </div>
            <div ng-if="error">
                <p>{{error}}</p>
            </div>
        </div>
    `;
}