angular.module("ToDoApp")
	.factory("Items", function ItemsFactory($http) {
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
				list = JSON.parse(localStorage.getItem("list" + listID));
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
		}
	});