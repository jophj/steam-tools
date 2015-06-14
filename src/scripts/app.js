(function () {
	
	var SteamAppProvider = function () {
			
		var HOST = 'localhost:3666';
		var iSteamAppsApi = '/ISteamApps/GetAppList/v2/';
		var appDB = null;
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
			}
		};
	};
	
	var dataprovider = SteamAppProvider();
	dataprovider.initDB(null);
	
	
})();