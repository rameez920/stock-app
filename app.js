
function Stock(name, currentPrice, high, low, change, percentChange) {
	this.name = name;
	this.currentPrice = currentPrice;
	this.high = high;
	this.low = low;
	this.change = change;
	this.percentChange = percentChange;
}

function getStockInfo(stockSymbol) {
	
	$.ajax({
		data: {symbol: stockSymbol},
		url: "http://dev.markitondemand.com/Api/v2/Quote/jsonp",
		dataType: "jsonp"
	
	}).done(function(data) {
		if (data.hasOwnProperty('message'))
			alert("enter a vailid stock name");
		else {
			var myStock = new Stock(data.Name, data.LastPrice, data.High, data.Low, data.Change, data.ChangePercent);
			renderInfo(myStock);
		}

	}).fail(function(){
		alert("error");
	});
}


function renderInfo(stock) {
	$('#name').text(stock.name);
	$('#current-price').text(stock.currentPrice);
	$('#change').text(stock.change.toPrecision(3));
	$('#high-price').text(stock.high);
	$('#low-price').text(stock.low);
	console.log(stock);
}


$('#submit-btn').click(function() {
	var stockSymbol = $('#stock-name').val();
	getStockInfo(stockSymbol);

});

//TODO: style html
//		spacing on stock info
//		create graph
// 		error handling




