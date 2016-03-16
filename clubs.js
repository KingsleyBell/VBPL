var clubData2016 = [
{"name":"Leicester City", "netWorth":"133", "goalDif":22},
{"name":"Tottenham Hotspur", "netWorth":"710", "goalDif":29},
{"name":"Arsenal", "netWorth":"1118", "goalDif":16},
{"name":"Manchester City", "netWorth":"907", "goalDif":21},
{"name":"West Ham United", "netWorth":"215", "goalDif":12},
{"name":"Manchester United", "netWorth":"1848", "goalDif":10},
{"name":"Southampton", "netWorth":"259", "goalDif":8},
{"name":"Liverpool", "netWorth":"537", "goalDif":6},
{"name":"Stoke City", "netWorth":"192", "goalDif":-4},
{"name":"Chelsea", "netWorth":"826", "goalDif":4},
{"name":"West Bromwich Albion", "netWorth":"175", "goalDif":-6},
{"name":"Everton", "netWorth":"216", "goalDif":12},
{"name":"Bournemouth", "netWorth":"104", "goalDif":-9},
{"name":"Watford", "netWorth":"133", "goalDif":-1},
{"name":"Crystal Palace", "netWorth":"186", "goalDif":-7},
{"name":"Swansea City", "netWorth":"183", "goalDif":-10},
{"name":"Sunderland", "netWorth":"121", "goalDif":-19},
{"name":"Norwich City", "netWorth":"166", "goalDif":-23},
{"name":"Newcastle United", "netWorth":"221", "goalDif":-26},
{"name":"Aston Villa", "netWorth":"165", "goalDif":-35}
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
		var height = (1 - (clubData2016[i].netWorth/2500))*100;
		var haloColor;
		if (clubData2016[i].goalDif > 0) {
			haloColor = "halo-green";
		} else if (clubData2016[i].goalDif < 0) {
			haloColor = "halo-red";
		} else {
			// Handle zero goal difference here
			haloColor = "halo-white";
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