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
							text = list.length + " item finished. Congratulations!"
						} else {
							text = list.length + " items finished. Congratulations!"
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
	}

	$scope.removeItem = function (index) {
		Items.removeItem($scope.page, index);
		$scope.list = Items.getList($scope.page);
	}

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
	}
})

.controller("settingsController", function ($scope, $stateParams, Items, Settings) {
	$scope.settingsList = Settings.getSettings();

	$scope.updateSettings = function () {
		Settings.togSettings($scope.settingsList);
	}
});