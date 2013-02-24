define(['angular'],
    function (angular) {
        
        var module = angular.module('cement.core.controllers', []);
        for (var i = 1; i < arguments.length; i++) {
            var controller = arguments[i];
            module.controller(controller.name, controller.factory);
        }
        return module;
    }
);
