angular.module('ToDoApp')

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: "settingsController"
	})

	.state('app.list', {
		url: '/list:itemID',
		views: {
			'listContent': {
				templateUrl: 'templates/list.html',
				controller: 'listController',
			}
		}
	});
	
	$urlRouterProvider.otherwise('/app/list1');
});