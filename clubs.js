var clubData2016 = [
{"name":"Leicester City", "netWorth":"133", "goalDif":"pos"},
{"name":"Tottenham Hotspur", "netWorth":"710", "goalDif":"pos"},
{"name":"Arsenal", "netWorth":"1118", "goalDif":"pos"},
{"name":"Manchester City", "netWorth":"907", "goalDif":"pos"},
{"name":"West Ham United", "netWorth":"215", "goalDif":"pos"},
{"name":"Manchester United", "netWorth":"1848", "goalDif":"pos"},
{"name":"Southampton", "netWorth":"259", "goalDif":"pos"},
{"name":"Liverpool", "netWorth":"537", "goalDif":"pos"},
{"name":"Stoke City", "netWorth":"192", "goalDif":"neg"},
{"name":"Chelsea", "netWorth":"826", "goalDif":"pos"},
{"name":"West Bromwich Albion", "netWorth":"175", "goalDif":"neg"},
{"name":"Everton", "netWorth":"216", "goalDif":"pos"},
{"name":"Bournemouth", "netWorth":"104", "goalDif":"neg"},
{"name":"Watford", "netWorth":"133", "goalDif":"neg"},
{"name":"Crystal Palace", "netWorth":"186", "goalDif":"neg"},
{"name":"Swansea City", "netWorth":"183", "goalDif":"neg"},
{"name":"Sunderland", "netWorth":"121", "goalDif":"neg"},
{"name":"Norwich City", "netWorth":"166", "goalDif":"neg"},
{"name":"Newcastle United", "netWorth":"221", "goalDif":"neg"},
{"name":"Aston Villa", "netWorth":"165", "goalDif":"neg"}
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
		if (clubData2016[i].goalDif == "pos") {
			haloColor = "halo-blue";
		} else if (clubData2016[i].goalDif == "neg") {
			haloColor = "halo-red";
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