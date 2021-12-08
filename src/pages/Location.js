import React, { useEffect } from 'react';

const { kakao } = window

const Location=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.5465770572176, 126.96458430932942),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(37.5465770572176, 126.96458430932942); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  marker.setMap(map);

    }, [])


    return (
        <div id="map" style={{width:"1000px", height:"400px", marginLeft: "10%", marginTop: "1%", marginRight:"10%"}}></div>
    )
}

export default Location;