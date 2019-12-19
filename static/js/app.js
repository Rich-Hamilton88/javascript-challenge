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

//Initial display of all UFO sightings
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
    var dateInput = d3.select("#datetime").property("value");
    

    if (dateInput.trim() === "") {
        //This will display the entire database if the date field has no date
        var filteredData = tableData;

    } else {
        //otherwise will display the filtered dataset
        var filteredData = tableData.filter(ufosightings =>
            ufosightings.datatime === dateInput.trim());
      
    };

    //Here we will display a message that will advise if no record can be found
        if (filteredData.length == 0) {
            d3.select("tbody")
            .append("tr")
            .append("td")
                .attr("colspan", 7)
                .html("<h3>Sorry, No Records could be found.</h3>");
        };


// display the database
    console.log(filteredData);
    tableDisplay(filteredData);
});