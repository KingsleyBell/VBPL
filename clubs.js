// <center><div class="circle halo-red"><div class="circle normal cover man-united"></div></div></center>
function drawCircle() {
	d3.select("body").select("div.col-sm-3.full-height:nth-child(20)")
	.append("center")
	.append("div")
	.attr("class", "circle halo-red")
	.append("div")
	.attr("class", "circle normal cover man-united");
}