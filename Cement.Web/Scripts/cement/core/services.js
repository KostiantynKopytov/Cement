define(['angular', 'cement/core/services/pageService'],
    function (angular) {
        console.log('services');
        return angular.module('cement.core.services', ['cement.core.services.pageService']);
    }
);
