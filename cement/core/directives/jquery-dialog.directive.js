define(['module!core', 'extensions', 'jquery-ui'], function (module) {
	var template = "<div id='dialog'><div ng-transclude></div><button class='btn btn-success' ng-click='onOk()'>Save</button><button class='btn btn-danger'' ng-click='onCancel()'>Cancel</button></div>";
	module.directive('jqueryDialog', function () {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				openDialog: "=",
				onOk: "=",
				onCancel: "=",
				title: "@"
			},
			link: function (scope, element, attrs) {

			    $(element).dialog({
			    	autoOpen: false,
			    	modal: true
			    });

			    scope.$watch('title', function (newval) {
			    	$(element).dialog('option', 'title', newval);
			    });

			    scope.$watch('openDialog', function (newval) {
			    	newval ? $(element).dialog('open') : (element).dialog('close');
			    });
			},
			template: template
		};
	});
});