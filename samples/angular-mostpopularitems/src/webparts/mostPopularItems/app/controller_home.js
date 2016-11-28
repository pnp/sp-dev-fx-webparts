var AppMostPopularItems = angular.module('app_MostPopularItems', ['officeuifabric.core', 'officeuifabric.components']);

AppMostPopularItems.controller("controller_home", ["$rootScope", "$scope", "$http", "$location", "$window",
    function ($rootScope, $scope, $http, $location, $window) {

        $scope.PopularItems = [];
        $scope.isLoading = true;
        $scope.url = null;
        $scope.numberOfItems = 5;
        $scope.needsconfig = true;
        $scope.error = '';

        $rootScope.$on('configurationChanged', function (event, args) {

            $scope.PopularItems = [];
            $scope.isLoading = true;
            $scope.error = '';

            if (args.url != null && args.url.length > 0) {
                $scope.url = args.url;
                $scope.numberOfItems = args.numberOfItems;

                if (_spPageContextInfo.siteAbsoluteUrl == "https://wwww.contoso.com/") {
                    $scope.loadMockupMessages();
                }
                else {
                    $scope.loadMessages();
                }
                $scope.needsconfig = false;
                $scope.$apply();
            }
            else {
                $scope.needsconfig = true;
                $scope.$apply();
            }
        });

        $scope.loadMessages = function () {

            var endpointurl = _spPageContextInfo.siteAbsoluteUrl + "/_api/search/query?querytext='path:" + $scope.url + "'&rowlimit=500&sortlist='ViewsLifeTime:descending'";

            $http({
                method: 'GET',
                url: endpointurl,
                headers: { "Accept": "application/json;odata=verbose" }
            }).success(function (data, status, headers, config) {
                var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

                if (results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                        // Note - result value index are subjected to change based on the environment
                        var ViewsLifeTime = 0;
                        var ViewsRecent = 0;

                        if (results[i].Cells.results[21].Value) {
                            ViewsLifeTime = parseInt(results[i].Cells.results[21].Value);
                        }

                        if (results[i].Cells.results[21].Value) {
                            ViewsRecent = parseInt(results[i].Cells.results[22].Value);
                        }

                        $scope.PopularItems.push({
                            Title: results[i].Cells.results[3].Value,
                            Path: results[i].Cells.results[6].Value,
                            Author: results[i].Cells.results[4].Value,
                            Write: results[i].Cells.results[8].Value,
                            LastModifiedTime: results[i].Cells.results[9].Value,
                            FileExtension: results[i].Cells.results[18].Value,
                            ViewsLifeTime: ViewsLifeTime,
                            ViewsRecent: ViewsRecent
                        });
                    }
                }

                $scope.isLoading = false;

            }).error(function (data, status, headers, config) {
                $scope.isLoading = false;
                $scope.error = 'Unable to load the details.';
            });
        };

        $scope.loadMockupMessages = function () {

            $scope.PopularItems = [
                {
                    Title: 'Sample',
                    Path: 'Sample Status',
                    Author: 'Joseph Velliah',
                    Write: '2015-08-12T07:00:00Z',
                    LastModifiedTime: '2016-08-12T07:00:00Z',
                    FileExtension: 'aspx',
                    ViewsLifeTime: 200,
                    ViewsRecent: 30
                }
            ];
            $scope.isLoading = false;
        };

    }]);







