defineModule({
    name: 'cement.core.controllers',
    fileDeps: [
        'cement/core/controllers/PageController',
    ],
    callback: function (module) {
        for (var i = 1; i < arguments.length; i++) {
            var controller = arguments[i];
            module.controller(controller.name, controller.factory);
        }
    }
});
