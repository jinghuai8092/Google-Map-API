12  var x=document.getElementById("demo");
13 function getLocation()
14   {
15   if (navigator.geolocation)
16     {
17     navigator.geolocation.getCurrentPosition(showPosition,showError);
18     }
19   else{x.innerHTML="Geolocation is not supported by this browser.";}
20   }
21 
22 function showPosition(position)
23   {
24   lat=position.coords.latitude;
25   lon=position.coords.longitude;
26   latlon=new google.maps.LatLng(lat, lon)
27   mapholder=document.getElementById('mapholder')
28   mapholder.style.height='500px';
29   mapholder.style.width='100%';
30 
31   var myOptions={
32   center:latlon,zoom:14,
33   mapTypeId:google.maps.MapTypeId.ROADMAP,
34   mapTypeControl:false,
35   navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
36   };
37   var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
38   var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
39   }
40 
41 function showError(error)
42   {
43   switch(error.code) 
44     {
45     case error.PERMISSION_DENIED:
46       x.innerHTML="User denied the request for Geolocation."
47       break;
48     case error.POSITION_UNAVAILABLE:
49       x.innerHTML="Location information is unavailable."
50       break;
51     case error.TIMEOUT:
52       x.innerHTML="The request to get user location timed out."
53       break;
54     case error.UNKNOWN_ERROR:
55       x.innerHTML="An unknown error occurred."
56       break;
57     }
58   }