
function Stock(name, currentPrice, high, low, change, percentChange) {
	this.name = name;
	this.currentPrice = currentPrice;
	this.high = high;
	this.low = low;
	this.change = change;
	this.percentChange = percentChange;
}


function getStockInfo(stockRequest) {
	var params = {
		parameters: JSON.stringify(stockRequest)
	};
	
	$.ajax({
		data: params,
		url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
		dataType: "jsonp"
	
	}).done(function(data) {
		if (data.hasOwnProperty('message'))
			alert("enter a vailid stock name");
		else {
			//var myStock = new Stock(data.Name, data.LastPrice, data.High, data.Low, data.Change, data.ChangePercent);
			//renderInfo(myStock);
			renderGraph(data);
			
		}

	}).fail(function() {
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


function getParams(symbol) {
	return {  
        Normalized: false,
        NumberOfDays: days,
        DataPeriod: "Day",
        Elements: [
            {
                Symbol: symbol,
                Type: "price",
                Params: ["ohlc"] //ohlc, c = close only
            },
            {
                Symbol: symbol,
                Type: "volume"
            }
        ]
    }
}


var days = 30; //number of days default set to 30

//code for selecting date range first arg sets default values
//second arg is a callback for when user selects date range
$('input[name="daterange"]')
	.daterangepicker({startDate: moment().subtract(30, 'days'), 
						endDate: moment()}, 
						
						function(start, end, label) {
							
							days = Math.round((end - start) / (1000*60*60*24));
							console.log(days);
							
										
						});


$('#submit-btn').click(function() {
	var stockSymbol = $('#stock-name').val();

	var request = getParams(stockSymbol);
	getStockInfo(request);

});

//TODO: style html
//		get number of days after user has selected range
// 		add range to paramters for ajax request
//		error handling
//		display basic data in stock info
//		spacing on stock info



