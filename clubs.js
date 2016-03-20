// Form numbers represent: 1 -> Win, 0 -> Draw, -1 -> Loss

var clubData2016 = [
{"name":"Leicester City", "netWorth":133, "w":18, "d":9, "l":3, "gf":53, "ga":31, "gd":22, "pts":63, "form":[1,-1,1,0,1,1]},
{"name":"Tottenham Hotspur", "netWorth":710, "w":16, "d":10, "l":4, "gf":53, "ga":24, "gd":29, "pts":58, "form":[1,1,1,-1,0,1]},
{"name":"Arsenal", "netWorth":1118, "w":15, "d":7, "l":7, "gf":46, "ga":30, "gd":16, "pts":52, "form":[0,1,1,-1,-1,0]},
{"name":"Manchester City", "netWorth":907, "w":15, "d":6, "l":8, "gf":52, "ga":31, "gd":21, "pts":51, "form":[1,-1,-1,-1,1,0]},
{"name":"West Ham United", "netWorth":215, "w":13, "d":10, "l":6, "gf":45, "ga":33, "gd":12, "pts":49, "form":[1,-1,0,1,1,1]},
{"name":"Manchester United", "netWorth":1848, "w":13, "d":8, "l":8, "gf":37, "ga":27, "gd":10, "pts":47, "form":[1,0,-1,1,1,-1]},
{"name":"Southampton FC", "netWorth":259, "w":12, "d":8, "l":10, "gf":38, "ga":30, "gd":8, "pts":44, "form":[1,1,-1,-1,0,1]},
{"name":"Liverpool FC", "netWorth":537, "w":12, "d":8, "l":8, "gf":43, "ga":37, "gd":6, "pts":44, "form":[1,-1,0,1,1,1]},
{"name":"Stoke City", "netWorth":192, "w":12, "d":7, "l":11, "gf":32, "ga":36, "gd":-4, "pts":43, "form":[-1,1,1,1,0,-1]},
{"name":"Chelsea", "netWorth":826, "w":10, "d":10, "l":9, "gf":43, "ga":39, "gd":4, "pts":40, "form":[0,0,1,1,1,0]},
{"name":"West Bromwich Albion", "netWorth":175, "w":10, "d":9, "l":10, "gf":30, "ga":36, "gd":-6, "pts":39, "form":[0,-1,1,1,0,1]},
{"name":"Everton", "netWorth":216, "w":9, "d":11, "l":8, "gf":51, "ga":39, "gd":12, "pts":38, "form":[-1,1,1,-1,1,-1]},
{"name":"Bournemouth", "netWorth":104, "w":10, "d":8, "l":12, "gf":38, "ga":47, "gd":-9, "pts":38, "form":[-1,-1,0,1,1,1]},
{"name":"Watford FC", "netWorth":133, "w":10, "d":7, "l":12, "gf":29, "ga":30, "gd":-1, "pts":37, "form":[0,-1,1,0,-1,-1]},
{"name":"Crystal Palace", "netWorth":186, "w":9, "d":6, "l":14, "gf":32, "ga":39, "gd":-7, "pts":33, "form":[-1,0,-1,-1,0,-1]},
{"name":"Swansea City", "netWorth":183, "w":8, "d":9, "l":13, "gf":30, "ga":40, "gd":-10, "pts":33, "form":[0,-1,-1,1,1,-1]},
{"name":"Sunderland", "netWorth":121, "w":6, "d":7, "l":16, "gf":35, "ga":54, "gd":-19, "pts":25, "form":[-1,0,1,-1,0,0]},
{"name":"Norwich City", "netWorth":166, "w":6, "d":7, "l":17, "gf":31, "ga":54, "gd":-23, "pts":25, "form":[-1,0,-1,-1,-1,0]},
{"name":"Newcastle United", "netWorth":221, "w":6, "d":6, "l":17, "gf":28, "ga":54, "gd":-26, "pts":24, "form":[-1,1,-1,-1,-1,-1]},
{"name":"Aston Villa", "netWorth":165, "w":3, "d":7, "l":20, "gf":22, "ga":57, "gd":-35, "pts":16, "form":[1,-1,-1,-1,-1,-1]}
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
		var netWorthHeight = (1 - (clubData2016[i].netWorth/2500))*100;
		var winHeight = clubData2016[i].w*5 + 8;
		var drawHeight = clubData2016[i].d*5;
		var lossHeight = clubData2016[i].l*5 + 8;
		var haloColor;
		if (clubData2016[i].gd > 0) {
			haloColor = "halo-green";
		} else if (clubData2016[i].gd < 0) {
			haloColor = "halo-red";
		} else {
			haloColor = "halo-white";
		}
		
		var div = d3.select("body")
					.select("div.col-sm-3.full-height:nth-child(" + (i + 1) + ")")
					.append("div")
					.attr("style", "width: 100%; height: " + netWorthHeight + "%; position: relative;")

		//Append wins bar
		div.append("div")
		.attr("class","no-padding")	
		.attr("style", "width: 10%; height: " + winHeight + "px; background-color: rgba(0,127,255,0.6); position: absolute; left: 20%; bottom: 50px;");

		//Append draws bar
		div.append("div")		
		.attr("class","no-padding")	
		.attr("style", "width: 10%; height: " + drawHeight + "px; background-color: rgba(255,255,255,0.6); position: absolute; left: 45%; bottom: 58px;");

		//Append losses bar
		div.append("div")		
		.attr("class","no-padding")	
		.attr("style", "width: 10%; height: " + lossHeight + "px; background-color: rgba(255,91,0,0.6); position: absolute; left: 70%; bottom: 50px;");

		d3.select("body")
		.select("div.col-sm-3.full-height:nth-child(" + (i + 1) + ")")		
		.append("center")
		.append("div")		
		.attr("class", "circle " + haloColor)		
		.append("div")
		.attr("id", "team-" + clubData2016[i].name)
		.attr("class", "circle normal cover")
		.attr("style","background-image: url(\"images/clubs/" + clubData2016[i].name.replace(/ /g, "_") + ".ico\");");			
	}

	var scrollbar = d3.select("body").select("#scrollbar");
}

$(document).ready(function(){	

	var team1 = null;
	var team2 = null;

	$("#field").on("click", "[id^=team-]", function(){
		var team = $(this).prop("id").substring(5);
		var jsonTeam = getTeamByName(team)[0];

		if (team1 == team) {
			team1 = null;
			$("#team1").empty();
			$("#team1").append("<div class='compare-default'>Select a team to compare</div>");
		}
		else if (team2 == team) {
			team2 = null;
			$("#team2").empty();
			$("#team2").append("<div class='compare-default'>Select a team to compare</div>");
		}
		else if (team1 == null) {
			team1 = team;
			$("#team1").empty();
			$("#team1").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding'><b style='font-size: 2em;'>" + team + "</b></div><div class='col-sm-10 no-padding' style='display: flex; align-items: center;'><div class='circle big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-50' style='height: 75%;'><div class='col-sm-20 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-20 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");
		}		
		else if (team2 == null) {
			team2 = team;
			$("#team2").empty();
			$("#team2").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding'><b style='font-size: 2em;'>" + team + "</b></div><div class='col-sm-10 no-padding' style='display: flex; align-items: center;'><div class='circle big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-50' style='height: 75%;'><div class='col-sm-20 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-20 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");
		}		
		else {
			team1 = team;
			team2 = null;
			$("#team1").empty();
			$("#team1").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding'><b style='font-size: 2em;'>" + team + "</b></div><div class='col-sm-10 no-padding' style='display: flex; align-items: center;'><div class='circle big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-50' style='height: 75%;'><div class='col-sm-20 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-20 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");			
		}

	});

	$("#field").on("mouseenter", "[id^=team-]", function(){
		var team = $(this).prop("id").substring(5);
		var jsonTeam = getTeamByName(team)[0];
		var percentLeft = $(this).offset().left/$(window).width() * 100;
		var percentTop = $(this).offset().top/$(window).height() * 100;		

       	var hoverBox = $('body').append("<div id='teamTooltip' class='hover-box'><div class='col-sm-60' style='font-size: 2em; height: 20%; margin: 0%;'>" + team + "</div><div class='col-sm-20' style='height: 80%; display: flex; align-items: center;'><div class='circle medium cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-40' style='background-color: rgba(44,44,44,0.5); background-clip: content-box; padding-bottom: 3%; padding-top: 3%; height: 80%'><div class='col-sm-15 fullheight' style='text-align: right; font-size: 1.5em;'>Win:<br />Loss:<br />Draw:</div><div class='col-sm-15 fullheight' style='color: red; font-size: 1.5em;'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-15 fullheight' style='text-align: right; font-size: 1.5em;'>G/F:<br />G/A:<br />GD:</div><div class='col-sm-15 fullheight' style='color: red; font-size: 1.5em;'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");
	    
	    if(percentLeft <= 50 && percentTop <= 50) {
	    	$('#teamTooltip').css({	    	
	        	"top" : $(this).offset().top + 50,
	        	"left" : $(this).offset().left + 50
	    	});
	    }
	    else if(percentLeft <= 50 && percentTop > 50) {
	    	$('#teamTooltip').css({	    	
	        	"top" : $(this).offset().top - 150,
	        	"left" : $(this).offset().left + 50
	    	});
	    }
	    else if(percentLeft > 50 && percentTop <= 50) {
	    	$('#teamTooltip').css({	    	
	        	"top" : $(this).offset().top + 50,
	        	"left" : $(this).offset().left - 400
	    	});
	    }
	    else {
	    	$('#teamTooltip').css({	    	
	    		"top" : $(this).offset().top - 150,
	        	"left" : $(this).offset().left - 400	
	    	});
	    }
	    
    });

    $("#field").on("mouseleave", "[id^=team-]", function(){
    	$('#teamTooltip').remove();
    });
	
	

});

function getTeamByName(teamName) {
  return clubData2016.filter(
      function(clubData2016){return clubData2016.name == teamName}
  );
}