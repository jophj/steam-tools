(function () {
	
	

	/* global angular */
	var app = angular.module('reddit-steam-tools', ['ngMaterial']);

	app.factory('SteamAppProvider',[function () {
			
		var HOST = 'localhost:3666';
		var iSteamAppsApi = '/ISteamApps/GetAppList/v2/';
		var appDB = [
					{
						"appid": 5,
						"name": "Dedicated Server"
					},
					{
						"appid": 7,
						"name": "Steam Client"
					},
					{
						"appid": 8,
						"name": "winui2"
					},
					{
						"appid": 10,
						"name": "Counter-Strike"
					},
					{
						"appid": 20,
						"name": "Team Fortress Classic"
					},
					{
						"appid": 30,
						"name": "Day of Defeat"
					},
					{
						"appid": 40,
						"name": "Deathmatch Classic"
					},
					{
						"appid": 50,
						"name": "Half-Life: Opposing Force"
					},
					{
						"appid": 60,
						"name": "Ricochet"
					},
					{
						"appid": 70,
						"name": "Half-Life"
					},
					{
						"appid": 80,
						"name": "Counter-Strike: Condition Zero"
					},
					{
						"appid": 90,
						"name": "Half-Life Dedicated Server"
					},
					{
						"appid": 92,
						"name": "Codename Gordon"
					},
					{
						"appid": 100,
						"name": "Counter-Strike: Condition Zero Deleted Scenes"
					},
					{
						"appid": 130,
						"name": "Half-Life: Blue Shift"
					}];
					
		return{
			initDB: function (callback) {
				var iSteamAppsRequest = new XMLHttpRequest();
				
				iSteamAppsRequest.onload = function (evt) {
					appDB = JSON.parse(iSteamAppsRequest.responseText).applist.apps;
					
					if(callback)
						callback();
				};
				
				iSteamAppsRequest.open("GET", 'http://' + HOST + iSteamAppsApi);
				iSteamAppsRequest.send();
			},
			
			search: function (regexp) {
				var toReturn = [];
				appDB.forEach(function(app) {
					if(app.name.search(regexp) >= 0)
						toReturn.push(app);
				}, this);
				return toReturn;				
			},
			isLoading: function () {
				return appDB == null;
			}
		};
	}]);

	app.controller('appCtrl',[
		'$scope', 'SteamAppProvider',
		function($scope, SteamAppProvider){
			SteamAppProvider.initDB();
			$scope.$watch('searchString', function(newValue){
				if(newValue && newValue.length > 0)
				$scope.apps = SteamAppProvider.search(newValue);
			});
		}
	]);

})();