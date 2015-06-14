(function () {
	
	var SteamAppProvider = function () {
			
		var HOST = 'localhost:3666';
		var iSteamAppsApi = '/ISteamApps/GetAppList/v2/';
		var appDB = null;
		var isLoading = true;
		
		return{
			initDB: function (callback) {
				var iSteamAppsRequest = new XMLHttpRequest();
				
				iSteamAppsRequest.onload = function (evt) {
					appDB = JSON.parse(iSteamAppsRequest.responseText).applist.apps;
					isLoading = false;
					
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
				return isLoading;
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
	
	window.onSearchApp = function () {
		if (dataprovider.isLoading()){
			console.log('Wait for it...');
		}
		else{
			var searchString = document.getElementById('searchString').value;
			var regexp = new RegExp(searchString, 'i');
			var apps = dataprovider.search(regexp);
				
			apps.forEach(function(app) {
				var div = document.createElement('div');
				div.innerHTML = template(app);
				document.body.appendChild(div);	
			}, this);		
		}
	};
	
})();