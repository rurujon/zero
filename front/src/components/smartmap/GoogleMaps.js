import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px"
};

const GoogleMaps = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // 오라클 DB에서 상점 데이터를 가져오는 API 호출
    fetch('/api/smartMap/load')
      .then(response => response.json())
      .then(data => setStores(data));
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCxw3SZNQNJT4PF_MK6zItAM4O0EfGw8t8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 37.5665, lng: 126.9780 }}  // 지도 초기 위치 (서울)
        zoom={12}
      >
        {stores.map((store, index) => (
          <Marker
            key={index}
            position={{ lat: store.coordy, lng: store.coordx }}  // X좌표가 lng, Y좌표가 lat
            title={store.name}  // 마커에 상점명 표시
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;