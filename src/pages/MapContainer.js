import React, { useEffect, useState } from 'react';
import './MapContainer.scss';

const { kakao } = window

const MapContainer=({ searchPlace })=>{

  useEffect(()=>{
    var container = document.getElementById('myMap');
    var options = {
      center: new kakao.maps.LatLng(37.5465770572176, 126.96458430932942),
      level: 5
    };

    var map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(searchPlace, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        var infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width: 150px;text-align:center;padding:6px 0;">나의 직장</div>'
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
      }
    })
  }, [searchPlace])
  {console.log(searchPlace)}


    return (
        <div id="myMap" 
        style={{
          width: '50%',
          height: '550px',
          position: 'absolute',
          left: '570px',
          right: '100px',
          top: '130px'          
        }}></div>
    )
}

export default MapContainer;