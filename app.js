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
			renderInfo(data);
			renderGraph(data);
			
		}

	}).fail(function() {
		alert("error");
	});
}


//TODO: Add dates for max and min prices
function renderInfo(stockData) {
	
	//create object from JSON response
	var myStock = {
		name: stockData.Elements[0].Symbol,
		maxOpenPrice: stockData.Elements[0].DataSeries.open.max,
		minOpenPrice: stockData.Elements[0].DataSeries.open.min,
		maxClosePrice: stockData.Elements[0].DataSeries.close.max,
		minClosePrice: stockData.Elements[0].DataSeries.close.min,
		peakPrice: stockData.Elements[0].DataSeries.high.max,
		lowPrice: stockData.Elements[0].DataSeries.low.min
	};
	
	
	$('#symbol').text(myStock.name);
	
	$('#max-open').text('Max: $' + myStock.maxOpenPrice);
	$('#min-open').text('Min: $' + myStock.minOpenPrice);
	
	$('#max-close').text('Max: $' + myStock.maxClosePrice);
	$('#min-close').text('Min: $' + myStock.minClosePrice);

	$('#peak').text('Peak: $' + myStock.peakPrice);
	$('#low').text('low: $' + myStock.lowPrice);
}


function getParams(symbol, numDays) {
	return {  
        Normalized: false,
        NumberOfDays: numDays,
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

$('#submit-btn').click(function() {
	var stockSymbol = $('#stock-name').val();
	  
	var days = parseInt($('#day-input').val());
	
	var request = getParams(stockSymbol, days);
	
	getStockInfo(request);
});

//TODO: style html, 
// 		create table for info
// 		error handling
		



