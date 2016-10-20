//TODO: render data series onto chart

function renderGraph(stockData) {
	
	google.charts.load('current', {packages: ['corechart', 'line']});
	
	//callback function which creates graph
	google.charts.setOnLoadCallback(function() {

		var data = new google.visualization.DataTable();
		
		data.addColumn('number', 'close price');
		data.addColumn('number', 'date'); //update this coloumn to handle dates
		
		//TODO: add numbers from ajax request to data
		formatData(stockData);

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
		return Date.parse(day);
	});
	
	var closingPrices = jsonResponse.Elements[0].DataSeries['close'].values;

	var dataSeries = [];

	for (var i = 0; i < dates.length; i++) {
		dataSeries.push([formatedDates[i], closingPrices[i]]);
	}

	console.log(dataSeries);
	return dataSeries;
}


