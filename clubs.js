var clubData2016 = [
{"name":"Leicester City", "netWorth":133, "w":18, "d":9, "l":3, "gf":53, "ga":31, "gd":22, "pts":63},
{"name":"Tottenham Hotspur", "netWorth":710, "w":16, "d":10, "l":4, "gf":53, "ga":24, "gd":29, "pts":58},
{"name":"Arsenal", "netWorth":1118, "w":15, "d":7, "l":7, "gf":46, "ga"30, "gd":16, "pts":52},
{"name":"Manchester City", "netWorth":907, "w":15, "d":6, "l":8, "gf":52, "ga":31, "gd":21, "pts":51},
{"name":"West Ham United", "netWorth":215, "w":13, "d":10, "l":6, "gf":45, "ga":33, "gd":12, "pts":49},
{"name":"Manchester United", "netWorth":1848, "w":13, "d":8, "l":8, "gf":37, "ga":27, "gd":10, "pts":47},
{"name":"Southampton", "netWorth":259, "w":12, "d":8, "l":10, "gf":38, "ga":30, "gd":8, "pts":44},
{"name":"Liverpool", "netWorth":537, "w":12, "d":8, "l":8, "gf":43, "ga":37, "gd":6, "pts":44},
{"name":"Stoke City", "netWorth":192, "w":12, "d":7, "l":11, "gf":32, "ga":36, "gd":-4, "pts":43},
{"name":"Chelsea", "netWorth":826, "w":10, "d":10, "l":9, "gf":43, "ga":39, "gd":4, "pts":40},
{"name":"West Bromwich Albion", "netWorth":175, "w":10, "d":9, "l":10, "gf":30, "ga":36, "gd":-6, "pts":39},
{"name":"Everton", "netWorth":216, "w":9, "d":11, "l":8, "gf":51, "ga":39, "gd":12, "pts":38},
{"name":"Bournemouth", "netWorth":104, "w":10, "d":8, "l":12, "gf":38, "ga":47, "gd":-9, "pts":38},
{"name":"Watford", "netWorth":133, "w":10, "d":7, "l":12, "gf":29, "ga":30, "gd":-1, "pts":37},
{"name":"Crystal Palace", "netWorth":186, "w":9, "d":6, "l":14, "gf":32, "ga":39, "gd":-7, "pts":33},
{"name":"Swansea City", "netWorth":183, "w":8, "d":9, "l":13, "gf":30, "ga":40, "gd":-10, "pts":33},
{"name":"Sunderland", "netWorth":121, "w":6, "d":7, "l":16, "gf":35, "ga":54, "gd":-19, "pts":25},
{"name":"Norwich City", "netWorth":166, "w":6, "d":7, "l":17, "gf":31, "ga":54, "gd":-23, "pts":25},
{"name":"Newcastle United", "netWorth":221, "w":6, "d":6, "l":17, "gf":28, "ga":54, "gd":-26, "pts":24},
{"name":"Aston Villa", "netWorth":165, "w":3, "d":7, "l":20, "gf":22, "ga":57, "gd":-35, "pts":16}
]

function addClubs() {
	for (var i = 0; i < 5; i++) {
		d3.select("body")
		.select("div.col-sm-12.top-five:nth-child(" + (i + 1) + ")")
		.append("text")
		.attr("style", "color: black;")
		.text(clubData2016[i].name);
	}	


	for (var i = 0; i < clubData2016.length; i++) {
		var height = (1 - (clubData2016[i].netWorth/2000))*100;
		var haloColor;
		if (clubData2016[i].gd > 0) {
			haloColor = "halo-blue";
		} else if (clubData2016[i].gd < 0) {
			haloColor = "halo-red";
		} else {
			// Handle zero goal difference here
		}
		
		d3.select("body")
		.select("div.col-sm-3.full-height:nth-child(" + (i + 1) + ")")
		.append("div")
		.attr("style", "width: 100%; height: " + height + "%;");

		d3.select("body")
		.select("div.col-sm-3.full-height:nth-child(" + (i + 1) + ")")
		.append("center")
		.append("div")
		.attr("class", "circle " + haloColor)
		.append("div")
		.attr("class", "circle normal cover " + clubData2016[i].name.toLowerCase().replace(/ /g, "-"));
	}
}