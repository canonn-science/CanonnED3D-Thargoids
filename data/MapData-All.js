var canonnEd3d_thargoids = {

	//Define Categories
	systemsData: {
		"categories": {
			"Points of Interest - POI": {
				"100": {
					"name": "System",
					"color": "F7F7F7"
				},
				"101": {
					"name": "Megaship",
					"color": "42f4df"
				},
				"102": {
					"name": "Capital Ship",
					"color": "f442e2"
				},
				"103": {
					"name": "INRA Base",
					"color": "ffa500"
				},				
			},
			"Barnacles - (BN)": {
				"200": {
					"name": "Barnacle",
					"color": "44f441"
				}
				// Disabled until output shows status
				/*			"200": {
				"name": "Ripe",
				"color": "F7F7F7"
				},
				"201": {
				"name": "Dead",
				"color": "F7F7F7"
				} */
			},
			"Thargoid Structures - (TS)": {
				"500": {
					"name": "Active",
					"color": "4152f4"
				},
				"501": {
					"name": "Inactive",
					"color": "9d41f4"
				},
				"502": {
					"name": "Link",
					
					"color": "f2f2f2"					
				},
			},
			"Hyperdictions": {
				"800": {
					"name": "Start System",
					"color": "0040ff"
				},
				"801": {
					"name": "End System",
					"color": "ff0040"
				},
				"802": {
					"name": "Route",
					"color": "50a830"
				},
			},			
			"Unidentified Signal Source - (USS)": {
				"700": {
					"name": "Non-Human Signal Source",
					"color": "cc3333"
				},
				"701": {
					"name": "No NHSS Found",
					"color": "666664"
				}
				
			},			
			"Error Sites": {
				"600": {
					"name": "Invalid Data Information",
					"color": "150187"
				}
			}
		},
		"routes": [],
		"systems": [{
				"name": "Sol",
				"coords": {
					"x": "0",
					"y": "0",
					"z": "0"
				},
				"cat": [
					"100"
				]
			}, 
			{
				"name": "Col 70 Sector FY-N c21-3",
				"coords": {
					"x": "687.0625",
					"y": "-362.53125",
					"z": "-697.0625"
				},
				"cat": [
					"100"
				]
			}, 
			//687.0625 / -362.53125 / -697.0625
			{
				"name": "Merope",
				"coords": {
					"x": "-78.59375",
					"y": "-149.625",
					"z": "-340.53125"
				},
				"cat": [
					"100"
				]
			}, {
				"name": "HIP 22460",
				"coords": {
					"x": "-41.3125",
					"y": "-58.96875",
					"z": "-354.78125"
				},
				"cat": [
					"100"
				]
			}, 
		]
	},

	formatTSL: function (data) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].From && data[i].From.replace(" ", "").length > 1) {
				
				var tslRoute = {};
				
				//hdRoute["title"]="CMDR "+data[i].CMDR+" "+data[i].From+" to "+data[i].To 
				tslRoute["points"] = [{"s": data[i].From,"label": data[i].From},{"s": data[i].To,"label": data[i].To}]
				tslRoute["cat"]=[502]
				tslRoute["circle"]=false
				
				canonnEd3d_thargoids.systemsData.routes.push(tslRoute);
			}

		}

	},					
	
	
	formatHD: function (data) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].From && data[i].From.replace(" ", "").length > 1) {
				
				var hdFrom = {}
				hdFrom["name"] = data[i].From;

				//Ripe or Dead Status not enabled yet, pending CSV fixes
				hdFrom["cat"] = [800];
				hdFrom["coords"] = {
					"x": parseFloat(data[i].FromX),
					"y": parseFloat(data[i].FromY),
					"z": parseFloat(data[i].FromZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_thargoids.systemsData.systems.push(hdFrom);
				
				var hdTo = {}
				hdTo["name"] = data[i].To;

				//Ripe or Dead Status not enabled yet, pending CSV fixes
				hdTo["cat"] = [801];
				hdTo["coords"] = {
					"x": parseFloat(data[i].ToX),
					"y": parseFloat(data[i].ToY),
					"z": parseFloat(data[i].ToZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_thargoids.systemsData.systems.push(hdTo);
				
				var hdRoute = {};
				
				hdRoute["title"]="CMDR "+data[i].CMDR+" "+data[i].From+" to "+data[i].To 
				hdRoute["points"] = [{"s": data[i].From,"label": data[i].From},{"s": data[i].To,"label": data[i].To}]
				hdRoute["cat"]=[802]
				hdRoute["circle"]=false
				
				canonnEd3d_thargoids.systemsData.routes.push(hdRoute);
			}

		}

	},					
	
	formatTI: function (data) {
		//Here you format BN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].System && data[i].System.replace(" ", "").length > 1) {
				var tiSite = {};
				tiSite["name"] = data[i].System;
		

				switch(data[i].USSType) {
				case '$USS_Type_NonHuman;':
					tiSite["cat"] = [700];
					tiSite["coords"] = {
					"x": parseFloat(data[i].x),
					"y": parseFloat(data[i].y),
					"z": parseFloat(data[i].z)
					}
					break;
				
				} 			
				
				
				

				// We can then push the site to the object that stores all systems
				canonnEd3d_thargoids.systemsData.systems.push(tiSite);
			}

		}

	},	
	
	formatMS: function (data) {
		//Here you format BN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].System && data[i].System.replace(" ", "").length > 1) {
				var msSite = {};
				msSite["name"] = data[i].System;
		

				switch(data[i].Type) {
				case 'Megaship':
					msSite["cat"] = [101];
					msSite["coords"] = {
					"x": parseFloat(data[i].x),
					"y": parseFloat(data[i].y),
					"z": parseFloat(data[i].z)
					}
					break;
				case 'Capital Ship':
					msSite["cat"] = [102];
					msSite["coords"] = {
					"x": parseFloat(data[i].x),
					"y": parseFloat(data[i].y),
					"z": parseFloat(data[i].z)
					}
					break;					
				case 'INRA Base':
					msSite["cat"] = [103];
					msSite["coords"] = {
					"x": parseFloat(data[i].x),
					"y": parseFloat(data[i].y),
					"z": parseFloat(data[i].z)
					}
					break;					
				} 			
				
				
				

				// We can then push the site to the object that stores all systems
				canonnEd3d_thargoids.systemsData.systems.push(msSite);
			}

		}

	},		
	
	// Lets get data from CSV Files
	formatBN: function (data) {
		//Here you format BN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var bnSite = {};
				bnSite["name"] = data[i].system;

				//Ripe or Dead Status not enabled yet, pending CSV fixes
				bnSite["cat"] = [200];
				bnSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_thargoids.systemsData.systems.push(bnSite);
			}

		}

	},
	// Sites visited but not NHSS
	formatVS: function (data) {
		//Here you format BN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].System && data[i].System.replace(" ", "").length > 1) {
				var tiSite = {};
				tiSite["name"] = data[i].System;
		

				tiSite["cat"] = [701];
				tiSite["coords"] = {
					"x": parseFloat(data[i].X),
					"y": parseFloat(data[i].Y),
					"z": parseFloat(data[i].Z)
				};


				
				
				

				// We can then push the site to the object that stores all systems
				canonnEd3d_thargoids.systemsData.systems.push(tiSite);
			}

		}

	},	
	

	formatTS: function (data) {
		//Here you format TS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var tsSite = {};
				tsSite["name"] = data[i].system;

				//Check if Site is Active or Inactive, set Category to match
				if (data[i].active.toString().toLowerCase() == "y") {
					tsSite["cat"] = [500];
				} else {
					tsSite["cat"] = [501];
				}
				tsSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_thargoids.systemsData.systems.push(tsSite);
			}

		}

	},

	

	parseData: function (url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function (results) {

				callBack(results.data);

				// after we called the callback
				// (which is synchronous, so we know it's safe here)
				// we can resolve the promise

				resolvePromise();
			}
		});
	},

	init: function () {
		
		//Barnacles
		var p1 = new Promise(function (resolve, reject) {
				canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGOwaRT8ESad9j0GAQ7tMMNj8ObxipFW8fop3eaZ-HoCVo_k9dQsHVvs1oFvARrY5SC6o4uDAWKQA/pub?gid=290263950&single=true&output=csv", canonnEd3d_thargoids.formatBN, resolve);
			});

		//Thargoid Site Links
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vShCRewOJojaJ3XCQ3hzaSihFD46Px2qB6cO0d7NAbNNrb8729fA4UqzTxoKP8UFsE60XomVK8juyXq/pub?gid=0&single=true&output=csv", canonnEd3d_thargoids.formatTSL, resolve);
		});
		
		//Thargoid Sites
		var p3 = new Promise(function (resolve, reject) {
				canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-rhi1p4BU7AlOSj7_78Kvk5Ox6vb39vzzlWU3yI-dqlaLxk-CFLWvAFKc-J7WhomFiQ_u0P7Stxz/pub?gid=0&single=true&output=csv", canonnEd3d_thargoids.formatTS, resolve);
			});
			
		//Thargoid Sites
		var p4 = new Promise(function (resolve, reject) {
				canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRQ9O_WQPF7gpL1dEWgI97GVD_EMN7Sgm4LYxj2N4SQtG5HNInyP08I1eDqkZHQhYeIVNHiwtiDOYlS/pub?gid=981173890&single=true&output=csv", canonnEd3d_thargoids.formatMS, resolve);
			});			

		// Thargoid US			
		var p5 = new Promise(function (resolve, reject) {
				canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vROqL6zifWWxcwlZ0R6iLvrMrUdfJijnMoZee-SrN0NVPqhTdH3Zdx6E7RxP1wH2xgwfrhwfVWUHnKU/pub?gid=954889761&single=true&output=csv", canonnEd3d_thargoids.formatTI, resolve);
			});			

		// Thargoid Hyperdictions
		var p6 = new Promise(function (resolve, reject) {			
			canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSEVt8eYMJgd5vXfCMiExWc23D1G5G0DCEfs5A6N3AQGupAp1KslajioBZgB0IGiMd7MR_Ur3RPsv39/pub?gid=1013174415&single=true&output=csv", canonnEd3d_thargoids.formatHD, resolve);	
		});						
		
		var p7 = new Promise(function (resolve, reject) {			
			canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vS3sabePivfqUNdCie_7UPA6cBHzXVNtFfTP6JnHfcQez4GWQoRRkTxvzIRBNnNbDV2ATfEg0iGK0Cj/pub?gid=640903479&single=true&output=csv", canonnEd3d_thargoids.formatVS, resolve);	
		});						


		Promise.all([p1, p2, p3, p4, p5, p6, p7]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_thargoids.systemsData,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [28, 10000],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00'
			});
		});
	}
};
