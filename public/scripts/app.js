(function () {
	
	var SteamAppProvider = function () {
			
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
	};
	
	var source   = document.getElementById("entry-template").innerHTML;
	var template = Handlebars.compile(source);
	
	var dataprovider = SteamAppProvider();
	dataprovider.initDB(function () {
		
		var loadingElement = document.getElementById('loading');
		loadingElement.parentElement.removeChild(loadingElement);
	});
	
	window.onload = function () {
		document.getElementById('searchString').onkeyup = function (evt) {
			if(evt.keyCode == 13)
				window.onSearchApp();
		};
	};
	
	window.addApp = function (app) {
		console.log(app);
	};
	
	
	
	window.onSearchApp = function () {
		if (dataprovider.isLoading()){
			console.log('Wait for it...');
		}
		else{
			var searchString = document.getElementById('searchString').value;
			var regexp = new RegExp(searchString, 'i');
			var apps = dataprovider.search(regexp);
			
			var resultsElement = document.getElementById('results');
			var resultListElement = template({"apps": apps});
			resultsElement.innerHTML = resultListElement;	
		}
	};
	
})();