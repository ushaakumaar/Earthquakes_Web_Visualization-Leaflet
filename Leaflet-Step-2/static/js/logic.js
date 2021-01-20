/*******************************
 * USER DEFINED FUNCTIONS
 *******************************/

// Returns color based on magtitude
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
    url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    // URL to get the GeoJSON information for Faultline
    faultline_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

    // Retrieve earthquake and faultline data
    d3.json(url, function(earthquakeData) {
        d3.json(faultline_url, function(faultlineData) {
            // Sending earthquakes and faultline data to the createMap function
            createMap(earthquakeData.features, faultlineData.features);
        });
    });
}