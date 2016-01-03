angular.module("ToDoApp")
	.factory("Settings", function ItemsFactory($http) {
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
		}
	});