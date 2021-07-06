var search = document.getElementById('search');
var searchBtn=document.getElementById('searchBtn');
var getLocation = document.getElementById('getLocation');
var mapShow = document.getElementById('mapShow');


check();
//autoComplete
let autoComplete;
function initMap() {
    autoComplete = new google.maps.places.Autocomplete(
        search);
    autoComplete.addListener('place_changed', onPlaceChanged);

}
function onPlaceChanged() {
    var place = Autocomplete.getPlace();

    if (!place.geometry) {
        search.placeholder = "Enter a place";
    }
    else {
        document.getElementById('details').innerHTML = place.name;
    }
}

// input and show
var map
searchBtn.onclick=function(){
    navigator.geolocation.getCurrentPosition(
        function (position) {  
            var longitude = position.coords.longitude;  
            var latitude = position.coords.latitude;  
            console.log(longitude)
            console.log(latitude)
            }
    )
    latlon = new google.maps.LatLng(longitude, latitude)

    var myOptions = {
        center: latlon,
        zoom: 14,

    }
    map = new google.maps.Map(mapShow)
    var searchBox = new google.maps.places.SearchBox(search);
    
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
    
        if (places.length == 0)
            return;
    
        markers.forEach(function (m) { m.setMap(null); });
        markers = [];
    
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (p) {
            if (!p.geometry)
                return;
    
            markers.push(new google.maps.Marker({
                map: map,
                title: p.name,
                position: p.geometry.location
            }));
    
            if (p.geometry.viewport)
                bounds.union(p.geometry.viewport);
            else
                bounds.extend(p.geometry.location);
        });
    
        map.fitBounds(bounds);
    });
}

function check(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        alert('Geolocation is not support! Get your current Position failure! Please try type in search box.');
    }
}

//get your location
getLocation.onclick = function () {
    check();
}

var lat=0;lon=0;

function showPosition(Position) {
    lat = Position.coords.latitude;
    lon = Position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon)
    mapShow.style.height = '500px';
    mapShow.style.width = '100%';

    var myOptions = {
        center: latlon,
        zoom: 14,

    }
    var map = new google.maps.Map(mapShow, myOptions);
    var marker = new google.maps.Marker({ Position: latlon, map: map, title: "You are here!" })

}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}