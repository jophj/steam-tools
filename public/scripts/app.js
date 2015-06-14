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
			},
			
			search: function (regexp) {
				var toReturn = [];
				appDB.forEach(function(app) {
					if(app.name.search(regexp) >= 0)
						toReturn.push(app);
				}, this);
				return toReturn;				
			}
		};
	};
	
	var source   = document.getElementById("entry-template").innerHTML;
	var template = Handlebars.compile(source);
	
	
	var dataprovider = SteamAppProvider();
	dataprovider.initDB(function () {
		var apps = dataprovider.search(/borderlands/i);
		
		apps.forEach(function(app) {
			var div = document.createElement('div');
			div.innerHTML = template(app);
			document.body.appendChild(div);	
		}, this);		
		
	});
	
})();