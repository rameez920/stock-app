//TODO: get data from request and format for chart

function renderGraph() {
	
	google.charts.load('current', {packages: ['corechart', 'line']});
	
	//callback function which creates graph
	google.charts.setOnLoadCallback(function() {

		var data = new google.visualization.DataTable();
		
		data.addColumn('number', 'close price');
		data.addColumn('number', 'date');
		
		//TODO: add numbers from ajax request to data


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


