define([], function() {
    return {
        name: 'PageController',
        factory: ["$scope", "$location", "$rootScope", function($scope, $location, $rootScope) {
            $rootScope.title = $location.$$path;
            

            $scope.changeTitle = function() {
                $scope.page.placeholder2.settings.title += "vasya";
            };

            $scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1) || 'home';
                return page === currentRoute.toLowerCase() ? 'active' : '';
            };
            
            $scope.page = {
                layout: "Templates/MainLayout",
                placeholder: {
                    name: "testmodule",
                    settings: {
                        title: 'Test Module 1',
                        option1: '1',
                        option2: '2'
                    }
                },
                placeholder2: {
                    name: "testmodule",
                    settings: {
                        title: 'Test Module 2',
                        option1: '1',
                        option2: '2'
                    }
                }
            };

            $scope.goodMood = "yes";
        }]
    };
});