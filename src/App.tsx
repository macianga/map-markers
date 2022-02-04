import "./App.css";

import * as React from "react";
import {useState} from "react";
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import CustomMap from "./components/CustomMap";
import Marker from "./components/Marker";
import {getUsers} from "./utils/apiHelpers";


const render = (status: Status) => {
  return <h1>{status}</h1>;
};

function App() {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [users, setUsers] = useState(getUsers());

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const onMarkerClick = (e: google.maps.Marker) => {
    console.log("Marker clicked", e)
  }

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Wrapper apiKey={"AIzaSyAs4sGiB3YkSahsM4jG6fcgDXLruJYXMHs"} render={render}>
        <CustomMap
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{flexGrow: "1", height: "100%"}}
        >
          {
            users.map((user, i) => (
              <Marker key={i} position={user.coordinates} onClickHandler={onMarkerClick}/>
            ))
          }
        </CustomMap>
      </Wrapper>
      {form}
    </div>
  );
}

export default App;
