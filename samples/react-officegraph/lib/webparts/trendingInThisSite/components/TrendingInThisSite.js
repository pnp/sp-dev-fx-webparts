"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var TrendingInThisSite_module_scss_1 = require("../TrendingInThisSite.module.scss");
var TrendingInThisSite = (function (_super) {
    __extends(TrendingInThisSite, _super);
    function TrendingInThisSite(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            trendingDocuments: [],
            loading: true,
            error: null
        };
        return _this;
    }
    TrendingInThisSite.prototype.componentDidMount = function () {
        this.loadTrendingContent(this.props.siteUrl, this.props.numberOfDocuments);
    };
    TrendingInThisSite.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        if (this.props.numberOfDocuments !== prevProps.numberOfDocuments ||
            this.props.siteUrl !== prevProps.siteUrl && (this.props.numberOfDocuments && this.props.siteUrl)) {
            this.loadTrendingContent(this.props.siteUrl, this.props.numberOfDocuments);
        }
    };
    TrendingInThisSite.prototype.render = function () {
        var loading = this.state.loading ? React.createElement("div", { style: { margin: '0 auto' } },
            React.createElement(office_ui_fabric_react_1.Spinner, { label: 'Loading...' })) : React.createElement("div", null);
        var error = this.state.error ? React.createElement("div", null,
            React.createElement("strong", null, "Error:"),
            " ",
            this.state.error) : React.createElement("div", null);
        var documents = this.state.trendingDocuments.map(function (doc, i) {
            var iconUrl = "https://spoprod-a.akamaihd.net/files/odsp-next-prod_ship-2016-08-15_20160815.002/odsp-media/images/filetypes/32/" + doc.extension + ".png";
            return (React.createElement(office_ui_fabric_react_1.DocumentCard, { onClickHref: doc.url, key: doc.id },
                React.createElement(office_ui_fabric_react_1.DocumentCardPreview, { previewImages: [
                        {
                            previewImageSrc: doc.previewImageUrl,
                            iconSrc: iconUrl,
                            width: 318,
                            height: 196,
                            accentColor: '#ce4b1f'
                        }
                    ] }),
                React.createElement(office_ui_fabric_react_1.DocumentCardTitle, { title: doc.title }),
                React.createElement(office_ui_fabric_react_1.DocumentCardActivity, { activity: 'Modified ' + doc.lastModifiedTime, people: [
                        { name: doc.lastModifiedByName, profileImageSrc: doc.lastModifiedByPhotoUrl }
                    ] })));
        });
        return (React.createElement("div", { className: TrendingInThisSite_module_scss_1.default.trendingInThisSite },
            loading,
            error,
            documents,
            React.createElement("div", { style: { clear: 'both' } })));
    };
    TrendingInThisSite.prototype.getValueFromResults = function (key, results) {
        var value = '';
        if (results != null && results.length > 0 && key != null) {
            for (var i = 0; i < results.length; i++) {
                var resultItem = results[i];
                if (resultItem.Key === key) {
                    value = resultItem.Value;
                    break;
                }
            }
        }
        return value;
    };
    TrendingInThisSite.prototype.trim = function (s) {
        if (s != null && s.length > 0) {
            return s.replace(/^\s+|\s+$/gm, '');
        }
        else {
            return s;
        }
    };
    TrendingInThisSite.prototype.getPreviewImageUrl = function (result, siteUrl) {
        var uniqueID = this.getValueFromResults('uniqueID', result);
        var siteId = this.getValueFromResults('siteID', result);
        var webId = this.getValueFromResults('webID', result);
        var docId = this.getValueFromResults('DocId', result);
        if (uniqueID !== null && siteId !== null && webId !== null && docId !== null) {
            return siteUrl + "/_layouts/15/getpreview.ashx?guidFile=" + uniqueID + "&guidSite=" + siteId + "&guidWeb=" + webId + "&docid=" + docId + "\n      &metadatatoken=300x424x2&ClientType=CodenameOsloWeb&size=small";
        }
        else {
            return '';
        }
    };
    TrendingInThisSite.prototype.getUserPhotoUrl = function (userEmail, siteUrl) {
        return siteUrl + "/_layouts/15/userphoto.aspx?size=S&accountname=" + userEmail;
    };
    TrendingInThisSite.prototype.request = function (url, method, headers, data) {
        if (method === void 0) { method = 'GET'; }
        if (headers === void 0) { headers = null; }
        if (data === void 0) { data = null; }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        resolve(this.response);
                    }
                    else if (this.status >= 400) {
                        reject({
                            message: this.response['odata.error'].message.value,
                            statusText: this.statusText,
                            status: this.status
                        });
                    }
                }
            };
            xhr.open(method, url, true);
            if (headers === null) {
                xhr.setRequestHeader('Accept', 'application/json;odata=nometadata');
            }
            else {
                for (var header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header, headers[header]);
                    }
                }
            }
            xhr.responseType = 'json';
            xhr.send(data);
        });
    };
    TrendingInThisSite.prototype.getSiteMembers = function (siteUrl) {
        var component = this;
        return new Promise(function (resolve, reject) {
            component.request(siteUrl + "/_api/Web/AssociatedMemberGroup/Users?$select=Email").then(function (members) {
                var siteMembers = [];
                for (var i = 0; i < members.value.length; i++) {
                    siteMembers.push(members.value[i].Email);
                }
                resolve(siteMembers);
            }, function (error) {
                reject(error);
            });
        });
    };
    TrendingInThisSite.prototype.getActors = function (siteMembers, requestDigest, siteUrl) {
        var component = this;
        var query = '';
        siteMembers.forEach(function (member) {
            if (query.length > 0) {
                query += ' OR ';
            }
            query += "UserName:" + member;
        });
        var postData = JSON.stringify({
            'request': {
                '__metadata': {
                    'type': 'Microsoft.Office.Server.Search.REST.SearchRequest'
                },
                'Querytext': query,
                'SelectProperties': {
                    'results': ['DocId', 'WorkEmail']
                },
                'RowLimit': '100',
                'StartRow': '0',
                'SourceId': 'b09a7990-05ea-4af9-81ef-edfab16c4e31'
            }
        });
        return new Promise(function (resolve, reject) {
            component.request(siteUrl + "/_api/search/postquery", 'POST', {
                'Accept': 'application/json;odata=nometadata',
                'Content-Type': 'application/json;odata=verbose',
                'X-RequestDigest': requestDigest
            }, postData).then(function (data) {
                if (data && data.PrimaryQueryResult && data.PrimaryQueryResult.RelevantResults) {
                    var actors_1 = [];
                    data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach(function (row) {
                        var actorId = component.getValueFromResults('DocId', row.Cells);
                        if (actorId != null && actorId.length > 0) {
                            actors_1.push(actorId);
                        }
                    });
                    resolve(actors_1);
                }
                else {
                    reject();
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    TrendingInThisSite.prototype.getTrendingContent = function (siteUrl, actors, requestDigest) {
        var component = this;
        var gq = '';
        if (actors.length > 1) {
            actors.forEach(function (actor) {
                if (gq.length > 0) {
                    gq += ',';
                }
                gq += "actor(" + actor + ",action:1020)";
            });
            gq += ',and(actor(me,action:1021),actor(me,or(action:1021,action:1036,action:1037,action:1039)))';
            gq = "or(" + gq + ")";
        }
        else {
            gq = "or(actor(" + actors[0] + ",action:1020),and(actor(me,action:1021),actor(me,or(action:1021,action:1036,action:1037,action:1039))))";
        }
        siteUrl = siteUrl.replace(':443/', '/');
        var postData = JSON.stringify({
            'request': {
                '__metadata': {
                    'type': 'Microsoft.Office.Server.Search.REST.SearchRequest'
                },
                'Querytext': 'path:' + siteUrl,
                'SelectProperties': {
                    'results': ['Author', 'AuthorOwsUser', 'DocId', 'DocumentPreviewMetadata', 'Edges', 'EditorOwsUser', 'FileExtension', 'FileType', 'HitHighlightedProperties', 'HitHighlightedSummary', 'LastModifiedTime', 'LikeCountLifetime', 'ListID', 'ListItemID', 'OriginalPath', 'Path', 'Rank', 'SPWebUrl', 'SecondaryFileExtension', 'ServerRedirectedURL', 'SiteTitle', 'Title', 'ViewCountLifetime', 'siteID', 'uniqueID', 'webID']
                },
                'ClientType': 'TrendingInThisSite',
                'BypassResultTypes': 'true',
                'RowLimit': component.props.numberOfDocuments.toString(),
                'StartRow': '0',
                'RankingModelId': '0c77ded8-c3ef-466d-929d-905670ea1d72',
                'Properties': {
                    'results': [{
                            'Name': 'IncludeExternalContent',
                            'Value': {
                                'BoolVal': 'True',
                                'QueryPropertyValueTypeIndex': 3
                            }
                        }, {
                            'Name': 'GraphQuery',
                            'Value': {
                                'StrVal': gq,
                                'QueryPropertyValueTypeIndex': 1
                            }
                        }, {
                            'Name': 'GraphRankingModel',
                            'Value': {
                                'StrVal': '{"features":[{"function":"EdgeWeight"}],"featureCombination":"sum","actorCombination":"sum"}',
                                'QueryPropertyValueTypeIndex': 1
                            }
                        }]
                }
            }
        });
        return new Promise(function (resolve, reject) {
            component.request(siteUrl + "/_api/search/postquery", 'POST', {
                'Accept': 'application/json;odata=nometadata',
                'Content-Type': 'application/json;odata=verbose',
                'X-RequestDigest': requestDigest
            }, postData).then(function (data) {
                var trendingContent = [];
                if (data.PrimaryQueryResult && data.PrimaryQueryResult.RelevantResults &&
                    data.PrimaryQueryResult.RelevantResults.Table.Rows.length > 0) {
                    data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach(function (row) {
                        var cells = row.Cells;
                        var editorInfo = component.getValueFromResults('EditorOwsUser', cells).split('|');
                        var modifiedDate = new Date(component.getValueFromResults('LastModifiedTime', cells).replace('.0000000', ''));
                        var dateString = (modifiedDate.getMonth() + 1) + '/' + modifiedDate.getDate() + '/' + modifiedDate.getFullYear();
                        trendingContent.push({
                            id: component.getValueFromResults('DocId', cells),
                            url: component.getValueFromResults('ServerRedirectedURL', cells),
                            title: component.getValueFromResults('Title', cells),
                            previewImageUrl: component.getPreviewImageUrl(cells, siteUrl),
                            lastModifiedTime: dateString,
                            lastModifiedByName: component.trim(editorInfo[1]),
                            lastModifiedByPhotoUrl: component.getUserPhotoUrl(component.trim(editorInfo[0]), siteUrl),
                            extension: component.getValueFromResults('FileType', cells)
                        });
                    });
                }
                resolve(trendingContent);
            }, function (error) {
                reject(error);
            });
        });
    };
    TrendingInThisSite.prototype.loadTrendingContent = function (siteUrl, numberOfDocuments) {
        var component = this;
        var requestDigest = null;
        component.getRequestDigest(siteUrl)
            .then(function (digest) {
            requestDigest = digest;
        }, function (err) {
            component.handleError(err);
        })
            .then(function () {
            return component.getSiteMembers(siteUrl);
        }, function (err) {
            component.handleError(err);
        })
            .then(function (siteMembers) {
            return component.getActors(siteMembers, requestDigest, siteUrl);
        }, function (err) {
            component.handleError(err);
        })
            .then(function (actors) {
            return component.getTrendingContent(siteUrl, actors, requestDigest);
        }, function (err) {
            component.handleError(err);
        })
            .then(function (trendingDocuments) {
            component.setState(function (previousState, curProps) {
                previousState.trendingDocuments.length = 0;
                return previousState;
            });
            trendingDocuments.forEach(function (result) {
                component.setState(function (previousState, curProps) {
                    previousState.trendingDocuments.push(result);
                    return previousState;
                });
            });
            component.setState(function (previousState, curProps) {
                previousState.loading = false;
                return previousState;
            });
        }, function (err) {
            component.handleError(err);
        });
    };
    TrendingInThisSite.prototype.handleError = function (err) {
        if (err.responseJSON && err.responseJSON.error) {
            this.setState(function (previousState, curProps) {
                previousState.error = "The following error has occured while running the query: " + err.responseJSON.error.message.value;
                return previousState;
            });
        }
        else if (err.responseJSON && err.responseJSON["odata.error"]) {
            this.setState(function (previousState, curProps) {
                previousState.error = "The following error has occured while running the query: " + err.responseJSON["odata.error"].message.value;
                return previousState;
            });
        }
        else {
            this.setState(function (previousState, curProps) {
                previousState.error = "An unexpected error occured while running the query";
                return previousState;
            });
        }
        this.setState(function (previousState, curProps) {
            previousState.loading = false;
            return previousState;
        });
    };
    TrendingInThisSite.prototype.getRequestDigest = function (siteUrl) {
        var component = this;
        return new Promise(function (resolve, reject) {
            component.request(siteUrl + "/_api/contextinfo", 'POST').then(function (data) {
                resolve(data.FormDigestValue);
            }, function (error) {
                reject(error);
            });
        });
    };
    return TrendingInThisSite;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrendingInThisSite;

//# sourceMappingURL=TrendingInThisSite.js.map
