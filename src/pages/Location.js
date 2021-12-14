import React, { useEffect } from 'react';

const { kakao } = window

const Location=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.5465770572176, 126.96458430932942),
      level: 10
    };

    var map = new kakao.maps.Map(container, options);
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    var imageSize = new kakao.maps.Size(24, 35);    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    //직장 임시 좌표값
    var workPosition = new kakao.maps.LatLng(37.5465770572176, 126.96458430932942); 
    var workMarker = new kakao.maps.Marker({
      position: workPosition,
      image : markerImage,
    });
    var infowindow = new kakao.maps.InfoWindow({
      content: '<div style="width: 150px;text-align:center;padding:1px;fontSize: 10px;">나의 직장</div>'
    });
    infowindow.open(map, workMarker);
    map.setCenter(workPosition);

    workMarker.setMap(map);
  

    //추천 결과 장소 임시 좌표값
    var positions = [
      {
        address: '서울특별시 강남구 자곡동',
        latlng: new kakao.maps.LatLng(37.476796,127.100387)
      },
      {
        address: '서울특별시 강동구 길동',
        latlng: new kakao.maps.LatLng(37.539123,127.143163)
      },
      {
        address: "서울특별시 강서구 마곡동",
        latlng: new kakao.maps.LatLng(37.566092,126.830395)
      }
    ];

    for (var i=0; i < positions.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].address,
      })
    }
  }, [])


    return (
        <div id="map" style={{width:"1000px", height:"400px", marginLeft: "10%", marginTop: "1%", marginRight:"10%"}}></div>
    )
}

export default Location;