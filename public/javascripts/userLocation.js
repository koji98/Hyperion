/* GETS LATTITUDE */

function getLocationLat() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(showPositionLat);
  } else {
    alert('Geolocation is not available');
  }
}

function showPositionLat(position) {
  let x = position.coords.latitude;
  return x;
}

/* GETS LONGITUDE */

function getLocationLong() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPositionLong);
  } else {
    alert('Geolocation is not available');
  }
}

function showPositionLong(position) {
  let y = position.coords.longitude;
  return y;
}

/* SHOWS A MAP WITH CURRENT POSITION */

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

function showPosition(position) {
  var latlon = position.coords.latitude + "," + position.coords.longitude;

  var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon +
    "&zoom=14&size=400x300&sensor=false&key=AIzaSyA3vmH8ASwL2bzekbiyeEtoxgG_Kupgjxg";

   document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

/* GOOGLE MAP */
// var map;
//
// function toggleMapDraggable() {
//   if (map.get("draggable")) {
//     map.set("draggable", false);
//   } else {
//     map.set("draggable", true);
//   }
// }
//
// function initialize() {
//
//
//   map = new google.maps.Map(document.getElementById('map_canvas'), {
//     navigationControl: true,
//     scrollwheel: false,
//     scaleControl: false,
//     draggable: false,
//     zoom: 10,
//     center: new google.maps.LatLng(getLocationLat(), getLocationLong()),
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });
//
//   var infowindow = new google.maps.InfoWindow();
//   var image = 'http://maps.google.com/mapfiles/ms/micons/blue.png';
//
//   var marker, i;
//
//
//   for (i = 0; i < locations.length; i++) {
//     marker = new google.maps.Marker({
//       position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//       map: map,
//       icon: image,
//       zIndex: 10
//     });
//
//     window.google.maps.event.addListener(map , 'drag', function (event) {
//             marker.setPosition( map .getCenter() );
//     });
//
//     google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
//       return function() {
//         infowindow.setContent(locations[i][0]);
//         infowindow.open(map, marker);
//       }
//     })(marker, i));
//   }
// }
// google.maps.event.addDomListener(window, 'load', initialize);
