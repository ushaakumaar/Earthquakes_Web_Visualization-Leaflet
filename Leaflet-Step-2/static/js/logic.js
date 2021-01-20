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

// Creates map with earthquake and faultline data
function createMap(earthquakes, faultlineData) {

    // Defining information to be displayed on clicking the markers on the map
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h2>Magnitude:" + feature.properties.mag + "</h2><h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Creating a GeoJSON layer with the retrieved earthquake data
    var earthquakeLayer = L.geoJSON(earthquakes, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.properties.mag),
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        },
        onEachFeature: onEachFeature
    });


    // Creating a GeoJSON layer with the retrieved faultline data
    var faultlineLayer = L.geoJSON(faultlineData, {
        color: "#fba200"
    });

    // Creating base layers

    // satellite Layer
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-streets-v11",
        accessToken: API_KEY
    });

    //outdoor layer
    var outdoormap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v9",
        accessToken: API_KEY
    });

    // grayscale layer
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });


    // Create a baseMaps object
    var baseMaps = {
        "Satellite": satellitemap,
        "Grayscale": darkmap,
        "Outdoors": outdoormap
    };

    // Create an overlay object
    var overlayMaps = {
        "Fault Lines": faultlineLayer,
        "Earthquakes": earthquakeLayer
    };

    // Create a map object
    var myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 2,
        layers: [satellitemap, earthquakeLayer, faultlineLayer]
    });

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // Display legend at bottom right corner of the map
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(myMap) {

        var div = L.DomUtil.create('div', 'info legend'),
            mags = [0, 1, 2, 3, 4, 5];

        // loop through magnitude intervals and generate a label with a colored square for each interval
        for (var i = 0; i < mags.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(mags[i]) + '"></i> ' +
                mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
        }

        return div;
    };
    legend.addTo(myMap);
}