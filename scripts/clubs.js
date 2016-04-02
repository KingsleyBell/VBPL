var leagueData;
var year;
var yearData;
var maxWorth;
var maxWLD;
var view = 0;
$.ajax({
    'async': false,
    'global': false,
    'url': "./data/leagueData.json",
    'dataType': "json",
    'success': function (data) {
        leagueData = data;
        year = leagueData[0].year;
        yearData = leagueData[0].yearData;
        maxWorth = leagueData[0].maxWorth;
        maxWLD = leagueData[0].maxWLD;
        console.log("loaded league data");
    }
});

$(document).ready(function(){

	addClubs();	

	var team1 = null;
	var team2 = null;
	var year1;
	var year2;
	var firstTime = true;
	var flick = false;

	// ADD team to compare box on click
	$("#field").on("click", "[id^=team-]", function(){
		var rawTeam = $(this).prop("id").substring(5);
		var team = rawTeam.replace(/\-/g, " ");
		var jsonTeam = getTeamByName(team)[0];
		var index = $.inArray(jsonTeam, yearData) + 1;
		console.log(index);		
		var formColors = [];		

		for( var i = 0; i < 6; i++) {
			if (jsonTeam.form[i]==1) {
				formColors.push("green");
			}
			else if (jsonTeam.form[i]==0) {
				formColors.push("white");	
			}
			else {
				formColors.push("red");
			}
		}		

		if (team1 == team && year1==year) {
			team1 = null;
			flick = true;
			$("#team1").empty();
			$("#team1").append("<div class='compare-default'>Select a team to compare</div>");

			oldTeam1 = null;
			oldIndex1 = null;
			$(this).css("background-color", "rgba(255,255,255,0.2");
			$("#height" + index).css({"background": "rgba(0,0,0,0)"});
		}
		else if (team2 == team && year2==year) {
			team2 = null;
			flick = false;
			$("#team2").empty();
			$("#team2").append("<div class='compare-default'>Select a team to compare</div>");			

			oldTeam2 = null;
			oldIndex2 = null;
			$(this).css("background-color", "rgba(255,255,255,0.2");
			$("#height" + index).css({"background": "rgba(0,0,0,0)"});
		}
		else if (team1 == null) {
			team1 = team;
			year1=year;
			flick = true;			
			$("#team1").empty();
			$("#team1").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding team-header' style='max-height: 20%'><b>" + team + "</b><font style='position: absolute; right: 0px;'>" + year + "</font></div><div class='col-sm-20 no-padding' style='padding-top: 5px; height: 80%; display: flex; align-items: center;'><div class='big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-40 no-padding' style='height: 25%;'><br><div class='col-sm-15 team-medium-box'>Networth: </div><div class='col-sm-10'><div class='team-medium-left no-padding'>£" + jsonTeam.netWorth + "m</div></div><div class='col-sm-25 team-medium-box'>Points: </div><div class='col-sm-10'><div class='team-medium-left'>" + jsonTeam.pts + "</div></div></div><div class='col-sm-40 no-padding' style='height: 40%;'><div class='col-sm-15 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-25 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div><div id='formBox' class='col-sm-40 no-padding' style='height: 15%'><div class='col-sm-8 no-padding' style='font-size: 1.5em'>Form: </div><div class='col-sm-8 form-box " + formColors[0] + "'></div><div class='col-sm-8 form-box " + formColors[1] + "''></div><div class='col-sm-8 form-box " + formColors[2] + "'></div><div class='col-sm-8 form-box " + formColors[3] + "'></div><div class='col-sm-8 form-box " + formColors[4] + "'></div><div class='col-sm-8 form-box " + formColors[5] + "'></div></div></div>");				
			
			oldTeam1 = $(this).attr("id");
			oldIndex1 = index;
			$(this).css("background-color", "rgba(0,255,102,0.5)");
			$("#height" + index).css({"background": "linear-gradient(rgba(255,255,0,0.4), rgba(255,255,102,0)"});
		}		
		else if (team2 == null) {
			team2 = team;
			year2=year;
			flick = false;
			$("#team2").empty();
			$("#team2").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding team-header' style='max-height: 20%'><b>" + team + "</b><font style='position: absolute; right: 0px;'>" + year + "</font></div><div class='col-sm-20 no-padding' style='padding-top: 5px; height: 80%; display: flex; align-items: center;'><div class='big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-40 no-padding' style='height: 25%;'><br><div class='col-sm-15 team-medium-box'>Networth: </div><div class='col-sm-10'><div class='team-medium-left no-padding'>£" + jsonTeam.netWorth + "m</div></div><div class='col-sm-25 team-medium-box'>Points: </div><div class='col-sm-10'><div class='team-medium-left'>" + jsonTeam.pts + "</div></div></div><div class='col-sm-40 no-padding' style='height: 40%;'><div class='col-sm-15 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-25 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div><div id='formBox' class='col-sm-40 no-padding' style='height: 15%'><div class='col-sm-8 no-padding' style='font-size: 1.5em'>Form: </div><div class='col-sm-8 form-box " + formColors[0] + "'></div><div class='col-sm-8 form-box " + formColors[1] + "''></div><div class='col-sm-8 form-box " + formColors[2] + "'></div><div class='col-sm-8 form-box " + formColors[3] + "'></div><div class='col-sm-8 form-box " + formColors[4] + "'></div><div class='col-sm-8 form-box " + formColors[5] + "'></div></div></div>");				
		
			oldTeam2 = $(this).attr("id");
			oldIndex2 = index;
			$(this).css("background-color", "rgba(0,255,102,0.5)");
			$("#height" + index).css({"background": "linear-gradient(rgba(255,255,0,0.4), rgba(255,255,102,0)"});
		}		
		else  if (flick == false){
			team1 = team;

			if(year1==year) {
				$("#" + oldTeam1).css("background-color", "rgba(255,255,255,0.2");
				$("#height" + oldIndex1).css({"background": "rgba(0,0,0,0)"});
			}

			year1=year;
			flick = true;			
			$("#team1").empty();
			$("#team1").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding team-header' style='max-height: 20%'><b>" + team + "</b><font style='position: absolute; right: 0px;'>" + year + "</font></div><div class='col-sm-20 no-padding' style='padding-top: 5px; height: 80%; display: flex; align-items: center;'><div class='big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-40 no-padding' style='height: 25%;'><br><div class='col-sm-15 team-medium-box'>Networth: </div><div class='col-sm-10'><div class='team-medium-left no-padding'>£" + jsonTeam.netWorth + "m</div></div><div class='col-sm-25 team-medium-box'>Points: </div><div class='col-sm-10'><div class='team-medium-left'>" + jsonTeam.pts + "</div></div></div><div class='col-sm-40 no-padding' style='height: 40%;'><div class='col-sm-15 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-25 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div><div id='formBox' class='col-sm-40 no-padding' style='height: 15%'><div class='col-sm-8 no-padding' style='font-size: 1.5em'>Form: </div><div class='col-sm-8 form-box " + formColors[0] + "'></div><div class='col-sm-8 form-box " + formColors[1] + "''></div><div class='col-sm-8 form-box " + formColors[2] + "'></div><div class='col-sm-8 form-box " + formColors[3] + "'></div><div class='col-sm-8 form-box " + formColors[4] + "'></div><div class='col-sm-8 form-box " + formColors[5] + "'></div></div></div>");				
		
			oldTeam1 = $(this).attr("id");
			oldIndex1 = index;
			$(this).css("background-color", "rgba(0,255,102,0.5)");
			$("#height" + index).css({"background": "linear-gradient(rgba(255,255,0,0.4), rgba(255,255,102,0)"});
		}
		else {
			team2 = team;

			if(year2==year) {
				$("#" + oldTeam2).css("background-color", "rgba(255,255,255,0.2");
				$("#height" + oldIndex2).css({"background": "rgba(0,0,0,0)"});
			}

			year2=year;
			flick = false;
			$("#team2").empty();
			$("#team2").append("<div class='team-box' style='background-color: #404040;'><div class='col-sm-60 no-padding team-header' style='max-height: 20%'><b>" + team + "</b><font style='position: absolute; right: 0px;'>" + year + "</font></div><div class='col-sm-20 no-padding' style='padding-top: 5px; height: 80%; display: flex; align-items: center;'><div class='big cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-40 no-padding' style='height: 25%;'><br><div class='col-sm-15 team-medium-box'>Networth: </div><div class='col-sm-10'><div class='team-medium-left no-padding'>£" + jsonTeam.netWorth + "m</div></div><div class='col-sm-25 team-medium-box'>Points: </div><div class='col-sm-10'><div class='team-medium-left'>" + jsonTeam.pts + "</div></div></div><div class='col-sm-40 no-padding' style='height: 40%;'><div class='col-sm-15 team-small-box'>Won:<br />Lost:<br />Drew:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-25 team-small-box'>Goals for:<br />Goals against:<br />Goal Difference:</div><div class='col-sm-10 full-height team-smaller-box' id='small-box-values-2'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div><div id='formBox' class='col-sm-40 no-padding' style='height: 15%'><div class='col-sm-8 no-padding' style='font-size: 1.5em'>Form: </div><div class='col-sm-8 form-box " + formColors[0] + "'></div><div class='col-sm-8 form-box " + formColors[1] + "''></div><div class='col-sm-8 form-box " + formColors[2] + "'></div><div class='col-sm-8 form-box " + formColors[3] + "'></div><div class='col-sm-8 form-box " + formColors[4] + "'></div><div class='col-sm-8 form-box " + formColors[5] + "'></div></div></div>");				
		
			oldTeam2 = $(this).attr("id");
			oldIndex2 = index;
			$(this).css("background-color", "rgba(0,255,102,0.5)");
			$("#height" + index).css({"background": "linear-gradient(rgba(255,255,0,0.4), rgba(255,255,102,0)"});
		}

		if (firstTime) {
			firstTime = false;
			$('body').animate({
	        	scrollTop: $("#team1").offset().top
	    	}, 500);
		}    	

	});

	// Team hoverbox on hover
	$("#field").on("mouseenter", "[id^=team-]", function(){
		var team = $(this).prop("id").substring(5);
		var jsonTeam = getTeamByName(team)[0];
		var percentLeft = $(this).offset().left/$(window).width() * 100;
		var percentTop = ($(this).offset().top-$(window).scrollTop())/$(window).height() * 100;		

       	var hoverBox = $('body').append("<div id='teamTooltip' class='hover-box'><div class='col-sm-60' style='font-size: 2em; height: 20%; margin: 0%;'>" +team + "</div><div class='col-sm-20' style='height: 80%; top: 10px;'><div class='circle medium cover " + team.toLowerCase().replace(/ /g, "-") + "'></div></div><div class='col-sm-40' style='background-color: rgba(44,44,44,0.5); background-clip: content-box; height: 15%; padding-bottom: 0; font-size: 1.5em; margin: 0%;'>&nbsp;&nbsp;Networth: </text><font color=red>£" + jsonTeam.netWorth + " million </font></div><div class='col-sm-40' style='background-color: rgba(44,44,44,0.5); background-clip: content-box; padding-bottom: 3%; padding-top: 1%; height: 65%'><div class='col-sm-15 fullheight' style='text-align: right; font-size: 1.5em;'>Win:<br />Loss:<br />Draw:</div><div class='col-sm-15 fullheight' style='color: red; font-size: 1.5em;'>" + jsonTeam.w + "<br />" + jsonTeam.l + "<br />" + jsonTeam.d + "</div><div class='col-sm-15 fullheight' style='text-align: right; font-size: 1.5em;'>G/F:<br />G/A:<br />GD:</div><div class='col-sm-15 fullheight' style='color: red; font-size: 1.5em;'>" + jsonTeam.gf + "<br />" + jsonTeam.ga + "<br />" + jsonTeam.gd + "</div></div></div>");		
		
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

	//Remove hover box when mouse leaves team
    $("#field").on("mouseleave", "[id^=team-]", function(){
    	$('#teamTooltip').remove();    	
    	
    });
	
	//win loss draw view
	$("#wld").change(function() {	
		view = 1;	
		$("#y5").text(maxWLD);
		$("#y4").text(maxWLD*0.8);
		$("#y3").text(maxWLD*0.6);
		$("#y2").text(maxWLD*0.4);
		$("#y1").text(maxWLD*0.2);
		$("#y-axis-label").text("Wins/Losses/Draws");

		for (var i = 0; i < yearData.length; i++) {
			var winHeight = (yearData[i].w/maxWLD)*440 + 8;
			var drawHeight = (yearData[i].d/maxWLD)*440;
			var lossHeight = (yearData[i].l/maxWLD)*440 + 8;

			$("#height" + (i+1)).height("100%");
			$("#w" + (i+1)).height(winHeight);
			$("#d" + (i+1)).height(drawHeight);
			$("#l" + (i+1)).height(lossHeight);
			console.log(i);
		}
	});

	//Overall view
	$("#overall").change(function() {	
		view = 0;	
		$("#y5").text(maxWorth);
		$("#y4").text(maxWorth*0.8);
		$("#y3").text(maxWorth*0.6);
		$("#y2").text(maxWorth*0.4);
		$("#y1").text(maxWorth*0.2);
		$("#y-axis-label").text("Net Worth (Million £)");

		for (var i = 0; i < yearData.length; i++) {
			var netWorthHeight = (1 - (yearData[i].netWorth/maxWorth))*100;
			var winHeight = yearData[i].w*5 + 8;
			var drawHeight = yearData[i].d*5;
			var lossHeight = yearData[i].l*5 + 8;

			$("#height" + (i+1)).height(netWorthHeight + "%");
			$("#w" + (i+1)).height(winHeight);
			$("#d" + (i+1)).height(drawHeight);
			$("#l" + (i+1)).height(lossHeight);
		}
	});

	//Year changed
	$('#scrollbar').on("input", function() {
		year = $(this).val();		
    	var lbl = $(".sliderLabel").text(year);
    	var leftPx = (year-1995)/(2016-1995)*(this.clientWidth);
    	lbl.css({ left: leftPx });

    	var flip = parseInt($(this).val()) % 2;    	
    	yearData = leagueData[flip].yearData;
    	maxWorth = leagueData[flip].maxWorth;
        maxWLD = leagueData[flip].maxWLD;
        addClubs();

        if (year1==year) {
			$("#" + oldTeam1).css("background-color", "rgba(0,255,102,0.5)");
			$("#height" + oldIndex1).css({"background": "linear-gradient(rgba(255,255,0,0.4), rgba(255,255,102,0))"});			
		} 
		else {
			$("#height" + oldIndex1).css({"background": "rgba(0,0,0,0)"});			
		}
		if(year2 == year) {
			$("#" + oldTeam2).css("background-color", "rgba(0,255,102,0.5)");
				$("#height" + oldIndex2).css({"background": "linear-gradient(rgba(255,255,0,0.4), rgba(255,255,102,0)"});
		}
		else {
			$("#height" + oldIndex2).css({"background": "rgba(0,0,0,0)"});	
		}

        if (view == 1){
        	$("#wld").trigger("change");
        }
	});

	//Remove year tooltip text when mouse leaves scroller
    $("#scrollbar").on("mouseleave", function(){
    	$('.sliderLabel').hide();
    });

	//Remove year tooltip text when mouse leaves scroller
    $("#scrollbar").on("mouseenter", function(){    	
    	$('.sliderLabel').show();
    });

    //Tooltip text for form box
    $("#team1, #team2").on("mouseenter", "#formBox", function(){        	
    	$('body').append("<div id='formTooltip' class='form-hover-box'>Last 6 games, ordered chronologically from left to right</div>");
    	$('#formTooltip').css({	    	
        	"top" : $(this).offset().top + 40,
        	"left" : $(this).offset().left + 80
	    });
    });

    $("#team1, #team2").on("mouseleave", "#formBox", function(){    
    	$("#formTooltip").remove();
    });         

});

function addClubs() {

	//Add top 5 teams
	for (var i = 1; i <= 5; i++) {		
		$("#top" + (i))
		.html("<span style='color: red;'>" + i + ". </span><span style='color: black;'>" + yearData[i-1].name + "</span>");		
	}	

	for (var i = 0; i < yearData.length; i++) {
		var netWorthHeight = (1 - (yearData[i].netWorth/maxWorth))*100;
		var winHeight = yearData[i].w*5 + 8;
		var drawHeight = yearData[i].d*5;
		var lossHeight = yearData[i].l*5 + 8;
		var haloColor;
		if (yearData[i].gd > 0) {
			haloColor = "halo-green";
		} else if (yearData[i].gd < 0) {
			haloColor = "halo-red";
		} else {
			haloColor = "halo-white";
		}
		
		//Set height of team
		$("#height" + (i+1))
		.css({"width": "100%", "height": netWorthHeight + "%", "position": "relative"});		

		//Set wins bar
		$("#w" + (i+1))
		.css({"height": winHeight + "px"});

		//Set draws bar
		$("#d" + (i+1))
		.css({"height": drawHeight + "px"});

		//Set losses bar
		$("#l" + (i+1))
		.css({"height": lossHeight + "px"});

		//Set team halo and circle
		$("#halo" + (i+1)).empty();
		$("#halo" + (i+1))
		.attr("class", "circle " + haloColor);
		$("#halo" + (i+1))
		.append("<div id='team-" + yearData[i].name + "' class='circle normal cover' style='background-image: url(\"images/clubs/" + yearData[i].name.replace(/ /g, "_") + ".ico\");'></div>");
		
	}

}

function getTeamByName(teamName) {
  return yearData.filter(
      function(yearData){return yearData.name == teamName}
  );
}