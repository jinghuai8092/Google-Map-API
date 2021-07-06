const search=document.getElementById('search');
const searchBtn=document.getElementById('searchBtn');
const getLocation=document.getElementById('getLocation');
const mapShow=document.getElementById('mapShow');

let autoComplete;
function initAutoComplete(){
    autoComplete=new google.maps.places.Autocomplete(
        search,{
            types:['establishment'],
            componentRestrictions:{'country':['AU']},
            fields:['place_id','geometry','name']
        }
    );
}



// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition,showError);
// }
// else{
//     alert('Geolocation is not support! Get your current Position failure! Please try type in search box.');
// }

// function showPosition(Position){
//     lat=Position.coords.latitude;
//     lon=Position.coords.longitude;
//     latlon=new google.maps.LatLng(lat,lon)
// }