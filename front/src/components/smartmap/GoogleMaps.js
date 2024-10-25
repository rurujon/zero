import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px"
};

const buttonStyle = {
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  backgroundColor: "#fff",
  border: "2px solid #007bff",
  borderRadius: "5px",
  padding: "5px",
  cursor: "pointer",
  zIndex: 1,
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const dropdownStyle = {
  position: "absolute",
  top: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  zIndex: 1,
};

const mapOptions = {
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    }
  ],
};

const GoogleMaps = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedGu, setSelectedGu] = useState('전체'); // 기본적으로 전체 선택
  const mapRef = useRef(null);

  useEffect(() => {
    // 전체 상점 데이터를 가져오는 API 호출
    fetch('/api/smartMap/load')
      .then(response => response.json())
      .then(data => setStores(data))
      .catch(error => console.error('Error fetching data:', error));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    }
  }, []);

  const handleGuChange = (event) => {
    setSelectedGu(event.target.value);
  };

  const filteredStores = selectedGu === '전체'
    ? stores
    : stores.filter(store => store.guName === selectedGu);

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
  };

  const handlePanToCurrentLocation = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.panTo(currentLocation);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAXBLeEgcEIgMJkKLamUtOFbfsEqtvHgYA">
      <div style={{ position: "relative" }}>
        {/* 드롭다운 메뉴를 맵의 위쪽 중앙에 배치 */}
        <select value={selectedGu} onChange={handleGuChange} style={dropdownStyle}>
            <option value="전체">전체</option>
            <option value="강남구">강남구</option>
            <option value="강동구">강동구</option>
            <option value="강서구">강서구</option>
            <option value="관악구">관악구</option>
            <option value="광진구">광진구</option>
            <option value="구로구">구로구</option>
            <option value="금천구">금천구</option>
            <option value="노원구">노원구</option>
            <option value="도봉구">도봉구</option>
            <option value="동대문구">동대문구</option>
            <option value="동작구">동작구</option>
            <option value="마포구">마포구</option>
            <option value="서대문구">서대문구</option>
            <option value="서초구">서초구</option>
            <option value="성동구">성동구</option>
            <option value="성북구">성북구</option>
            <option value="송파구">송파구</option>
            <option value="양천구">양천구</option>
            <option value="영등포구">영등포구</option>
            <option value="용산구">용산구</option>
            <option value="은평구">은평구</option>
            <option value="종로구">종로구</option>
            <option value="중구">중구</option>
            <option value="중랑구">중랑구</option>
        </select>
        
        <GoogleMap
          options={mapOptions}
          mapContainerStyle={containerStyle}
          center={currentLocation || { lat: 37.5665, lng: 126.9780 }}
          zoom={12}
          onLoad={map => mapRef.current = map}
        >
          {filteredStores.map((store, index) => {
            const lat = parseFloat(store.coordY);
            const lng = parseFloat(store.coordX);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  title={store.name}
                  onClick={() => handleMarkerClick(store)}
                />
              );
            }
            return null;
          })}

          {currentLocation && (
            <Marker
              position={currentLocation}
              title="현재 위치"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "blue",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "white"
              }}
            />
          )}

          {selectedStore && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedStore.coordY),
                lng: parseFloat(selectedStore.coordX)
              }}
              onCloseClick={() => setSelectedStore(null)}
            >
              <div>
                <h2>{selectedStore.name}</h2>
                <p>전화번호: {selectedStore.telNo}</p>
                <p>주소: {selectedStore.addrNew}</p>
                <p>운영시간: {selectedStore.openingHours}</p>
                <p>판매물품: {selectedStore.sales}</p>
                <p>홈페이지: {selectedStore.link}</p>
                <p>인스타: {selectedStore.instaUrl}</p>
              </div>
            </InfoWindow>
          )}

          <button style={buttonStyle} onClick={handlePanToCurrentLocation}>
            홈
          </button>
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMaps;
