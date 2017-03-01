//Create a single global variable
var MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow;
MAPAPP.pathName = window.location.pathname;

$(document).ready(function() {
    initialize();
    populateMarkers(MAPAPP.pathName);
});

//Initialize our Google Map
function initialize() {
    var center = new google.maps.LatLng(39.9543926,-75.1627432);
    var mapOptions = {
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: center,
        scrollwheel: false
    };
    this.map = new google.maps.Map(document.getElementById('googleMap'),
        mapOptions);
};

// Fill map with markers
function populateMarkers(dataType) {
    //apiLoc = typeof apiLoc !== 'undefined' ? apiLoc : '/data/' + dataType + '.json';
    apiLoc = 'http://localhost:3001/api/stores';
    // jQuery AJAX call for JSON
    var uluru = {lat: -25.363, lng: 131.044};

    $.getJSON(apiLoc, function(data) {
        //For each item in our JSON, add a new map marker

        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
        $.each(data, function(i, ob) {
            var pos = {lat: this.location.coordinates[1], lng: this.location.coordinates[0]};
            console.log("Position: " + JSON.stringify(pos));
            console.log(this.location.coordinates[0]);
            var marker = new google.maps.Marker({
                map: map,
                //position: new google.maps.LatLng(this.location.coordinates[1], this.location.coordinates[0]),
                position: pos,
                shopname: this.name,
                details: '<b>Manager: </b>' + this.manager.first_name + ' ' + this.manager.last_name + '<br>' + this.manager.telephone + '<br>' + this.manager.email,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            // var marker = new google.maps.Marker({
            //     position: pos,
            //     map: map
            // });
    	//Build the content for InfoWindow
            var content = '<h1 class="mt0"><a href="' + marker.shopname + '" target="_blank" title="' + marker.shopname + '">' + marker.shopname + '</a></h1><p>' + marker.details + '</p>';
        	marker.infowindow = new google.maps.InfoWindow({
            	content: content,
            	maxWidth: 400
            });
    	//Add InfoWindow
            google.maps.event.addListener(marker, 'click', function() {
                if (MAPAPP.currentInfoWindow) MAPAPP.currentInfoWindow.close();
                marker.infowindow.open(map, marker);
                MAPAPP.currentInfoWindow = marker.infowindow;
            });
            MAPAPP.markers.push(marker);
        });
    });
};
