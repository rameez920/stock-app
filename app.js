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
		maxClosePrice: stockData.Elements[0].DataSeries.close.max,
		minClosePrice: stockData.Elements[0].DataSeries.close.min

	};

	$('#stock-info').append('<h2>Symbol: ' + myStock.name + '</h2>');
	
	$('#stock-info').append('<div id=max-price></div>');
	$('#max-price').append('<h4>Max Close Price : $' + myStock.maxClosePrice + '</h4>');

	$('#stock-info').append('<div id=min-price></div>');
	$('#max-price').append('<h4>Min Close Price : $' + myStock.minClosePrice + '</h4>');
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
//		convert date picker to slider
// 		error handling
//		spacing on stock info



