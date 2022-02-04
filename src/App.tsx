import "./App.css";

import * as React from "react";
import {useEffect, useState} from "react";
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import CustomMap from "./components/CustomMap";
import Marker from "./components/Marker";
import {createUser, getUsers, UserType} from "./utils/apiHelpers";


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

  const [users, setUsers] = useState<Array<UserType>>([]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const createNewUser = async () =>{
    await createUser();
    await setUsers(await getUsers());
  }

  useEffect(()=>{
    const asyncFunc = async ()=>{
      setUsers(await getUsers());
    }

    asyncFunc()
  }, [])

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const onMarkerClick = (e: google.maps.Marker) => {
    console.log("Marker clicked", e)
  }

  return (
    <div className="flex flex-row w-[100vw] h-[100vh]">
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
      <div className="bg-gray-600 w-4/12">
        <h1 className="text-5xl text-center mt-2 font-bold mb-10">Users on map</h1>
        <div className="flex items-center justify-center">
          <button
            className="p-2 pl-5 pr-5 border-2 border-primary rounded-md text-primary w-fit
            hover:border-primary-hover hover:text-primary-hover  transition-all font-bold text-2xl"
            onClick={createNewUser}
          >CREATE USER
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
