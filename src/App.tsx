import "./App.css";

import * as React from "react";
import {useEffect, useState} from "react";
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import CustomMap from "./components/CustomMap";
import Marker, {CustomMarkerType} from "./components/Marker";
import {createUser, deleteUser, getUsers, UserType} from "./utils/apiHelpers";
import {getUserWithId} from "./utils/utils";


const render = (status: Status) => {
  return <h1>{status}</h1>;
};

function App() {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [zoom, setZoom] = React.useState(2); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [users, setUsers] = useState<Array<UserType>>([]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const createNewUser = async () => {
    await createUser();
    await setUsers(await getUsers());
  }

  const deleteUserFunc = async () => {
    if(!selectedUser) return;
    await deleteUser(selectedUser.id);
    setUsers(await getUsers());
    setSelectedUser(null)
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

  const onMarkerClick = (marker: CustomMarkerType) => {
    const user = getUserWithId(marker.id, users);
    if (!user) return;
    setSelectedUser(user);
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
                <Marker key={i} position={user.coordinates} onClick={onMarkerClick} id={user.id}/>
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
        {selectedUser &&
            <div className="flex flex-col items-center justify-center mt-3">
                <hr className="border-blue-500 border-2 w-[90%] mb-2"/>
              <p>Name: {selectedUser.firstname}</p>
              <p>Surname: {selectedUser.lastname}</p>
              <p>Email: {selectedUser.email}</p>
              <button
                className="p-2 pl-5 pr-5 border-2 border-danger rounded-md text-danger w-fit
                   hover:border-danger-hover hover:text-danger-hover transition-all font-bold text-2xl mt-3"
                onClick={deleteUserFunc}
              >DELETE USER
              </button>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
