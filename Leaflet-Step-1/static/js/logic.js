/*******************************
 * USER DEFINED FUNCTIONS
 *******************************/

// Returns color based on magnitude 
function getColor(magnitude) {
    return magnitude >= 5 ? '#bd0026' :
        magnitude >= 4 ? '#f03b20' :
        magnitude >= 3 ? '#fd8d3c' :
        magnitude >= 2 ? '#feb24c' :
        magnitude >= 1 ? '#fed976' :
        '#ffffb2';
}

// Returns radius based on magnitude
function getRadius(magnitude) {
    return magnitude * 3;
}

// Retrieves the data and calls the function that creates map
function getEarthquakeData() {

    // URL to get the GeoJSON information for "All Earthquakes in Past 7 Days"
    url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

    // Retrieve earthquake data
    d3.json(url, function(earthquakeData) {
        // Sending our earthquakes data to the createMap function
        createMap(earthquakeData.features);
    });
}