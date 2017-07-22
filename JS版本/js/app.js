window.onload = function () {
	var searchSuggest = getDom("search-suggest");
	var searchForm = getDom("search-form");
	var searchInput = getDom("search_input");
	var	searchFormLeft = getLeft(searchForm);
	var	searchFormTop = getTop(searchForm);
	var searchResults = getDom("search-result");
	getEvent(searchInput, "keyup", function(){
		var searchText = searchInput.value;
		ajaxGet("http://api.bing.com/qsonhs.aspx?q=" + searchText, function(d) {
			var d = d.AS.Results[0].Suggests;
			var html = "";
			var dLen = d.length;
			for( var i = 0; i < dLen; i++) {
				html += "<li>" + d[i].Txt + "</li>";
			}
			searchResults.innerHTML = html;
		});
		searchSuggest.style.left = getLeft(searchForm) + "px";
		searchSuggest.style.top = getTop(searchForm) + 38 + "px";
		searchSuggest.style.display = "block";
		
		if(searchText === "") {
			searchSuggest.style.display = "none";
		}
	});
	
	getEvent(document, "click", function(){
		searchSuggest.style.display = "none";
	});
	
	delegation("li", "click", function() {
		var keyWord = this.innerText;
		console.log(keyWord);
		location.href = "http://cn.bing.com/search?q=" + keyWord;
	});
}
function ajaxGet(url, callback) {
	var _xhr = null;
	if( window.XMLHttpRequest) {
		_xhr = new window.XMLHttpRequest();
	} else if( window.ActiveXObject) {
		_xhr = new window.ActiveXObject("Msxml2.XMLHTTP");
	}
	_xhr.onreadystatechange = function() {
		if( _xhr.readyState == 4 && _xhr.status == 200 ){
			callback(JSON.parse(_xhr.responseText));
		}
	}
	_xhr.open("get", url, false);
	_xhr.send(null);
}

function delegation(target, event, fn) {
	getEvent(document, event, function(e){
		if( e.target.nodeName.toLocaleLowerCase() == target) {
			fn.call( e.target );
		}
	});
}

function getDom(id) {
	return document.getElementById(id);
}

function getEvent(id, event, fn) {
	var el = getDom(id) || document;
	if(el.addEventListener) {
		el.addEventListener(event, fn, false);
	} else {
		el.attachEvent("on" + event, fn);
	}
}

function getTop(element) {
	var actualTop = element.offsetTop,
		current = element.offsetParent;
	while(current != null) {
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

function getLeft(element) {
	var actualLeft = element.offsetLeft,
		current = element.offsetParent;
	while(current != null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}