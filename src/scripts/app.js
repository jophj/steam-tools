(function () {
	var HOST = 'localhost:3666';
	
	var iSteamAppsApi = '/ISteamApps/GetAppList/v2/';
	
	var iSteamAppsRequest = new XMLHttpRequest();
	var appDB = null;
	
	iSteamAppsRequest.onload = function (evt) {
		appDB = JSON.parse(iSteamAppsRequest.responseText).applist.apps;
	};
	
	iSteamAppsRequest.open("GET", 'http://' + HOST + iSteamAppsApi);
	iSteamAppsRequest.send();
})();