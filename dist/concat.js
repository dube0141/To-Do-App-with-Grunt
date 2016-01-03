angular.module('ToDoApp', ['ionic'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});
angular.module("ToDoApp")

.controller("listController", function ($scope, $stateParams, Items, Settings) {
	$scope.page = $stateParams.itemID;
	$scope.title = "List " + $scope.page;
	$scope.list = Items.getList($scope.page);

	$scope.toggleItem = function (index) {
		var settings = Settings.getSettings();
		var vibrateIsOn = settings[0].checked;
		var notificationsIsOn = settings[1].checked;

		if (vibrateIsOn) {
			navigator.vibrate(100);
		}

		var list = Items.getList($scope.page);

		if (list[index].icon == "icon ion-ios-circle-outline") {
			list[index].icon = "icon ion-ios-checkmark-outline";
		} else {
			list[index].icon = "icon ion-ios-circle-outline";
		}

		Items.togItem($scope.page, list, index);

		if (notificationsIsOn) {
			var tmp = Items.getList($scope.page);
			var count = 0;

			for (var i = 0; i < tmp.length; i++) {
				if (tmp[i].icon == "icon ion-ios-checkmark-outline") {
					count++;
					if (count == tmp.length) {
						var text = "";
						if (list.length <= 1) {
							text = list.length + " item finished. Congratulations!";
						} else {
							text = list.length + " items finished. Congratulations!";
						}

						cordova.plugins.notification.local.schedule({
							id: 1,
							title: "List " + $scope.page + " Completed!",
							text: text,
						});
					}
				}
			}
		}

		$scope.list[index] = list[index];
	};

	$scope.removeItem = function (index) {
		Items.removeItem($scope.page, index);
		$scope.list = Items.getList($scope.page);
	};

	$scope.addItem = function () {
		var res = $scope.input;
		if (res) {
			var newItem = {
				"title": res,
				"icon": "icon ion-ios-circle-outline"
			};

			Items.setItem($scope.page, newItem);
			$scope.list = Items.getList($scope.page);
			$scope.input = "";
		}
	};
})

.controller("settingsController", function ($scope, $stateParams, Items, Settings) {
	$scope.settingsList = Settings.getSettings();

	$scope.updateSettings = function () {
		Settings.togSettings($scope.settingsList);
	};
});
angular.module("ToDoApp")
	.factory("Items", function ItemsFactory() {
		return {
			setItem: function (listID, item) {
				var list = [];

				if (localStorage.getItem("list" + listID)) {
					list = JSON.parse(localStorage.getItem("list" + listID));
					list.push(item);
				} else {
					list.push(item);
				}
				var newList = JSON.stringify(list);
				localStorage.setItem("list" + listID, newList);
			},
			removeItem: function (listID, index) {
				var list = JSON.parse(localStorage.getItem("list" + listID));
				list.splice(index, 1);
				list = JSON.stringify(list);
				return localStorage.setItem("list" + listID, list);
			},
			togItem: function (listID, item, index) {
				var list = JSON.parse(localStorage.getItem("list" + listID));
				list[index] = item[index];

				list = JSON.stringify(list);
				return localStorage.setItem("list" + listID, list);

			},
			getList: function (listID) {
				if (localStorage.getItem("list" + listID)) {
					return JSON.parse(localStorage.getItem("list" + listID));
				} else {
					var defaultList1 = [{
						"title": "Apples",
						icon: "icon ion-ios-circle-outline"
					}];

					var defaultList2 = [{
						"title": "Oranges",
						icon: "icon ion-ios-circle-outline"
					}];

					var defaultList3 = [{
						"title": "Bananas",
						icon: "icon ion-ios-circle-outline"
					}];

					localStorage.setItem("list1", JSON.stringify(defaultList1));
					localStorage.setItem("list2", JSON.stringify(defaultList2));
					localStorage.setItem("list3", JSON.stringify(defaultList3));

					return JSON.parse(localStorage.getItem("list" + listID));
				}
			}
		};
	});
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
angular.module("ToDoApp")
	.factory("Settings", function ItemsFactory() {
		return {
			getSettings: function () {
				if (localStorage.getItem("settings")) {
					return JSON.parse(localStorage.getItem("settings"));
				} else {
					var settingsList = [{
						text: "Vibrate",
						checked: true
					}, {
						text: "Notifications",
						checked: false
					}];
					localStorage.setItem("settings", JSON.stringify(settingsList));
					return JSON.parse(localStorage.getItem("settings"));
				}
			},
			togSettings: function (settings) {
				return localStorage.setItem("settings", JSON.stringify(settings));
			}
		};
	});