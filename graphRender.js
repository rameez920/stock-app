//TODO: fix date column to not show entire date


function renderGraph(stockData) {
	
	google.charts.load('current', {packages: ['corechart', 'line']});
	
	//callback function which creates graph
	google.charts.setOnLoadCallback(function() {

		var data = new google.visualization.DataTable();
		
		data.addColumn('date', 'date'); 
		data.addColumn('number', 'close price');
		
		var dataSeries = formatData(stockData);

		data.addRows(dataSeries);

		var options = {
        	hAxis: {
          		title: 'Date'
        	},
        	vAxis: {
          		title: 'Price'
        	}
      	};

      	var lineGraph = new google.visualization.LineChart(document.getElementById('graph'));
      	lineGraph.draw(data, options);

	});
}


//gets the data from json response and creates 
//data series to plotted on the chart
function formatData(jsonResponse) {

	var dates = jsonResponse.Dates;

	var formatedDates = dates.map(function(day) {
		return new Date(Date.parse(day));
	});
	
	var closingPrices = jsonResponse.Elements[0].DataSeries['close'].values;

	var dataSeries = [];

	for (var i = 0; i < dates.length; i++) {
		dataSeries.push([formatedDates[i], closingPrices[i]]);
	}

	return dataSeries;
}


