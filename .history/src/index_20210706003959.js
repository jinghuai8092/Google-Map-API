var search = document.getElementById('search');
var getLocation = document.getElementById('getLocation');
var mapShow = document.getElementById('mapShow');
var details = document.getElementById('details');

var UTCTimestamp;
getUTCTimestamp();
function getUTCTimestamp(){
    var d=new Date();
    UTCTimestamp=Math.floor((d.getTime() + d.getTimezoneOffset()*60*1000)/1000);
    details.innerHTML=`UTC Timestamp is ${UTCTimestamp}`;
    setTimeout(getUTCTimestamp,1000);
}



//autoComplete
let autoComplete;
var map
// function initMap() {
//     autoComplete = new google.maps.places.Autocomplete(
//         search);
//     autoComplete.addListener('place_changed', onPlaceChanged);

// }
// function onPlaceChanged() {
//     var place = autoComplete.getPlace();

//     if (!place.geometry) {
//         search.placeholder = "Enter a place";
//     }
//     else{
//         if(place!=undefined){
//             console.log('a');
//             details.innerHTML=place.name;
//         }
//         else{
//             console.log('b')
//             details.innerHTML='';
//         }

//     }
// }


function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        alert('Geolocation is not support! Get your current Position failure! Please try type in search box.');
    }
    
}

//get your location
getLocation.onclick = function () {
    initMap();

}

var lat = 0; lon = 0;

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

    
      var input = document.getElementById('search');
      var searchBox = new google.maps.places.SearchBox(input);
    
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });
    
      var markers = [];
      
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        //get the utc_offset time
        var name=places.name;
        details.innerHTML=name+'\n';
    
        if (places.length == 0)
          return;
    
        markers.forEach(function (m) { m.setMap(null); });
        markers = [];
    
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(p) {
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