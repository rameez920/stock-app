
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
		
		var myStock = new Stock(data.Name, data.LastPrice, data.High, data.Low, data.Change, data.ChangePercent);
		console.log(myStock.name);
	});
}

$('#submit-btn').click(function() {
	var stockSymbol = $('#stock-name').text();
	console.log(stockSymbol);
	getStockInfo(stockSymbol);
});




