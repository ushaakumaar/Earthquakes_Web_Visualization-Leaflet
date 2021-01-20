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