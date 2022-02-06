import "./App.css";

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
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [zoom, setZoom] = useState(2); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [users, setUsers] = useState<Array<UserType>>([]);

  const fetchAndSetUsers = async () => {
    const [responseOk, responseData] = await getUsers();
    if (responseOk) {
      setUsers(responseData.response);
    }
  }

  const createNewUser = async () => {
    const [responseOk, responseData] = await createUser();
    if (responseOk) {
      await fetchAndSetUsers();
    }
  }

  const deleteUserFunc = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser.id);
    await fetchAndSetUsers()
    setSelectedUser(null)
  }

  useEffect(() => {
    fetchAndSetUsers();
  }, [])


  const onMarkerClick = (marker: CustomMarkerType) => {
    const user = getUserWithId(marker.id, users);
    if (!user) return;
    setSelectedUser(user);
  }

  return (
    <div className="flex flex-row w-[100vw] h-[100vh]">
      <Wrapper apiKey={"AIzaSyDfeRyZG3CgJ6145NeXjPrpC7TbxQvc54I"} render={render}>
        <CustomMap
          center={center}
          zoom={zoom}
          style={{flexGrow: "1", height: "100%"}}
        >
          {
            users.map((user, i) => (
              <Marker
                key={i}
                position={user.coordinates}
                onClick={onMarkerClick}
                id={user.id}
                // animation={user.id === selectedUser?.id ? Animation.BOUNCE : null}
              />
            ))
          }
        </CustomMap>
      </Wrapper>
      <div className="bg-gray-600 w-4/12">
        <h1 className="text-5xl text-center mt-2 font-bold mb-10 text-cyan-600">Users on map</h1>
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
