$(document).ready(function(){
	$("#search_input").on("keyup", function() {
		var searchText = $("#search_input").val()
		$.get("http://api.bing.com/qsonhs.aspx?q="+searchText, function(d){
			var d = d.AS.Results[0].Suggests,
				dLen = d.length;
				result = "";
			for(var i = 0; i < dLen; i++) {
				result += "<li>" + d[i].Txt + "</li>";
			}
			$("#search-result").html(result);
			$("#search-suggest").show().css({
				top: $(".search-form").offset().top + $("#search-form").outerHeight(),
				left: $(".search-form").offset().left,
				position: "absolute"
		});
		}, "json");
	});
	$(document).on("click", function(){
		$("#search-suggest").hide();
	});
	$("#search-suggest").on("click", "li", function(){
		var keyword = $(this).text();
		location.href = "http://cn.bing.com/search?q=" + keyword;
	});
}); 