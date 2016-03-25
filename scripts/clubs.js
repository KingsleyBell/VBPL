var clubData2016;
$.ajax({
    'async': false,
    'global': false,
    'url': "./data/2016.json",
    'dataType': "json",
    'success': function (data) {
        clubData2016 = data;
        console.log("loaded 2016 data");
    }
});


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
					.attr("id", "height" + i)
					.attr("style", "width: 100%; height: " + netWorthHeight + "%; position: relative;")

		//Append wins bar
		div.append("div")
		.attr("id", "w" + i)
		.attr("class","no-padding")	
		.attr("style", "width: 10%; height: " + winHeight + "px; background-color: rgba(0,127,255,0.6); position: absolute; left: 20%; bottom: 50px;");

		//Append draws bar
		div.append("div")
		.attr("id", "d" + i)
		.attr("class","no-padding")	
		.attr("style", "width: 10%; height: " + drawHeight + "px; background-color: rgba(255,255,255,0.6); position: absolute; left: 45%; bottom: 58px;");

		//Append losses bar
		div.append("div")
		.attr("id", "l" + i)
		.attr("class","no-padding")	
		.attr("style", "width: 10%; height: " + lossHeight + "px; background-color: rgba(255,91,0,0.6); position: absolute; left: 70%; bottom: 50px;");

		//Append team circle
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
	var flick = false;

	// ADD team to compare box on click
	$("#field").on("click", "[id^=team-]", function(){
		var team = $(this).prop("id").substring(5);
		var jsonTeam = getTeamByName(team)[0];

		if (team1 == team) {
			team1 = null;
			flick = true;
			$("#team1").empty();
			$("#team1").append("<div class='compare-default'>Select a team to compare</div>");
		}
		else if (team2 == team) {
			team2 = null;
			flick = false;
			$("#team2").empty();
			$("#team2").append("<div class='compare-default'>Select a team to compare</div>");
		}
		else if (team1 == null) {
			team1 = team;
			flick = true;
			$("#team1").empty();
			$("#team1").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding'><b style='font-size: 2em;'>" + team + "</b></div><div class='col-sm-10 no-padding' style='display: flex; align-items: center;'><div class='circle big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-50' style='height: 75%;'><div class='col-sm-20 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-20 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");
		}		
		else if (team2 == null) {
			team2 = team;
			flick = false;
			$("#team2").empty();
			$("#team2").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding'><b style='font-size: 2em;'>" + team + "</b></div><div class='col-sm-10 no-padding' style='display: flex; align-items: center;'><div class='circle big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-50' style='height: 75%;'><div class='col-sm-20 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-20 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");
		}		
		else  if (flick == false){
			team1 = team;
			flick = true;			
			$("#team1").empty();
			$("#team1").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding'><b style='font-size: 2em;'>" + team + "</b></div><div class='col-sm-10 no-padding' style='display: flex; align-items: center;'><div class='circle big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-50' style='height: 75%;'><div class='col-sm-20 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-20 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");			
		}
		else {
			team2 = team;
			flick = false;
			$("#team2").empty();
			$("#team2").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding'><b style='font-size: 2em;'>" + team + "</b></div><div class='col-sm-10 no-padding' style='display: flex; align-items: center;'><div class='circle big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-50' style='height: 75%;'><div class='col-sm-20 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-20 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");			
		}

    	$('body').animate({
        	scrollTop: $("#team1").offset().top
    	}, 500);

	});

	// Team hoverbox on hover
	$("#field").on("mouseenter", "[id^=team-]", function(){
		var team = $(this).prop("id").substring(5);
		var jsonTeam = getTeamByName(team)[0];
		var percentLeft = $(this).offset().left/$(window).width() * 100;
		var percentTop = ($(this).offset().top-$(window).scrollTop())/$(window).height() * 100;		

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
	
	$("#wld").change(function() {		
		$("#y5").text("20");
		$("#y4").text("16");
		$("#y3").text("12");
		$("#y2").text("8");
		$("#y1").text("4");
		$("#y-axis-label").text("Wins/Losses/Draws");

		for (var i = 0; i < clubData2016.length; i++) {
			var winHeight = (clubData2016[i].w/20)*440 + 8;
			var drawHeight = (clubData2016[i].d/20)*440;
			var lossHeight = (clubData2016[i].l/20)*440 + 8;

			$("#height" + i).height("100%");
			$("#w" + i).height(winHeight);
			$("#d" + i).height(drawHeight);
			$("#l" + i).height(lossHeight);
		}
	});

	$("#overall").change(function() {		
		$("#y5").text("2500");
		$("#y4").text("2000");
		$("#y3").text("1500");
		$("#y2").text("1000");
		$("#y1").text("500");
		$("#y-axis-label").text("Net Worth (Million £)");

		for (var i = 0; i < clubData2016.length; i++) {
			var netWorthHeight = (1 - (clubData2016[i].netWorth/2500))*100;
			var winHeight = clubData2016[i].w*5 + 8;
			var drawHeight = clubData2016[i].d*5;
			var lossHeight = clubData2016[i].l*5 + 8;

			$("#height" + i).height(netWorthHeight + "%");
			$("#w" + i).height(winHeight);
			$("#d" + i).height(drawHeight);
			$("#l" + i).height(lossHeight);
		}
	});

});

function getTeamByName(teamName) {
  return clubData2016.filter(
      function(clubData2016){return clubData2016.name == teamName}
  );
}