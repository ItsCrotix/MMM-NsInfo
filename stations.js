// Use this script to get all of the stationId's
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const apiKey = "YOUR_API_KEY_HERE"; // Use your api key here
var stationName = "Utrecht"; // Set your city here, leave an empty string if you want to see all available IDs

const getStations = () => {
	stationName = stationName.charAt(0).toUpperCase() + stationName.slice(1).toLowerCase();
	var stationList = [];
	var stationRequest = new XMLHttpRequest();
	const url = "https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations";
	stationRequest.open("GET", url, true);
	stationRequest.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
	stationRequest.onreadystatechange = function () {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var JSONResponse = JSON.parse(this.responseText);
				var stations = JSONResponse.payload;
				for (var i in stations) {
					if (stations[i] !== "") stationList.push(stations[i].namen.lang + ": " + stations[i].code);
				}
				stationList.sort().forEach((station) => {
					if (station.includes(stationName)) {
						console.log(station);
					}
				});
			}
		}
	};
	stationRequest.send();
};

getStations();
