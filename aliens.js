// Reference elements in document
var $tbody = document.querySelector("tbody");
var $dateTimeInput = document.querySelector("#date_time");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $recordCounter = document.querySelector("#recordCounter");
var $pages = document.querySelector("#pages");
var $loadBtn = document.querySelector("#load");
var $nextBtn = document.querySelector("#next");
var $prevBtn = document.querySelector("#prev");

// Add event listeners
$searchBtn.addEventListener("click", searchButtonClick);
$nextBtn.addEventListener("click", nextButtonClick);
$prevBtn.addEventListener("click", prevButtonClick);
$pages.addEventListener("change", pagesChange);

// Initialize global variables
var filteredData = dataSet;
var count = 0;

// Define Event handlers and set up incremental counts
function nextButtonClick() {
    count++;
    renderTable();
}

function prevButtonClick() {
    count--;
    renderTable();
}

// Renders new results on new page
function pagesChange() {
    renderTable();
}

// Search button click loads new data, adds input from non-empty search fields and shows results
function searchButtonClick() {
    var filterDate = $dateTimeInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();

    if (filterDate != "") {
        filteredData = filteredData.filter(function (date) {
        var dataDate = date.datetime;
        return dataDate === filterDate;
    });

    }

    if (filterCity != "") {
        filteredData = filteredData.filter(function (city) {
        var dataCity = city.city;
        return dataCity === filterCity;
    });
    }

    if (filterState != "") {
        filteredData = filteredData.filter(function (state) {
            var dataState = state.state;
            return dataState === filterState;
        });
    }

    if (filterCountry != "") {
        filteredData = filteredData.filter(function (country) {
            var dataCountry = country.country;
            return dataCountry === filterCountry;
        });
    }

    if (filterShape != "") {
        filteredData = filteredData.filter(function (shape) {
            var dataShape = shape.shape;
            return dataShape === filterShape;
        });
    }

    renderTable();
}

// Define renderTable function
function renderTable() {
    // clear previously rendered table
    $tbody.innerHTML = "";

    // Get number of records to be rendered
    var pages = Number(document.getElementById("pages").value);

    // Initialize local variables
    var start = count * pages + 1;
    var end = start + pages - 1;
    var btn;

    // Adjusts records displayed for end of data and state of Next button
    if (end > filteredData.length) {
      end = filteredData.length;
      btn = document.getElementById("next");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("next");
      btn.disabled = false;
    }

    // Adjusts state of Previous button
    if (start == 1) {
      btn = document.getElementById("prev");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("prev");
      btn.disabled = false;
    }

    // Displays record counts and loads records into table
    $recordCounter.innerText = "Showing Records: " + start + " to " + filteredData.length;
    // Outer loop loads specified number of records
    for (var i = 0; i < pages; i++) {
        var item = filteredData[i+(count * pages)];
        var fields = Object.keys(item);
        var $row = $tbody.insertRow(i);
        // Inner loop loads fields in record
        for (var j = 0; j < fields.length; j++) {
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = item[field];
        }
    }
}

// Provides initial render on open
renderTable();