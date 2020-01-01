// from data.js
var tableData = data;

// function that will display UFO sightings
function tableDisplay(ufosightings) {
  var tbody = d3.select("tbody");
  ufosightings.forEach((ufoRecord) => {
    var row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
};

// function that will clear the table data for new data
function deleteTbody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};
  
// Initial display of all UFO sightings
console.log(tableData);
tableDisplay(tableData);

//Here the filter button is created
var button = d3.select("#filter-btn");

//Filtering the database and displaying the content

button.on("click", function(event) {
  
  d3.event.preventDefault();
  deleteTbody();
  
  var filteredData = tableData;
  var inputId = document.getElementsByClassName("form-control");
  
  // iterate through all the input fields
  for (var i = 0; i < inputId.length; i++) {
	
	var idName = inputId[i].id;
	var field = d3.select("#" + idName).property("value");
	
	// treat empty or space-only fields as a search for ALL for that field
	if (field.trim() !== "") {
	  var filteredData = filteredData.filter(ufosighting =>
	    // match as case insensitive
		ufosighting[idName].toUpperCase().trim() ===
		field.toUpperCase().trim());
	};
  };
 
    ///Here we will display a message that will advise if no record can be found
    if (filteredData.length == 0) {
        d3.select("tbody")
        .append("tr")
        .append("td")
            .attr("colspan", 7)
            .html("<h3>Sorry, No Records could be Found</h3>");
    };
    
    // display the database
    console.log(filteredData);
    tableDisplay(filteredData);
});