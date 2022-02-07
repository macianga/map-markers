import "./App.css";

import {useEffect, useState} from "react";
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import CustomMap from "./components/CustomMap";
import Marker, {CustomMarkerType} from "./components/Marker";
import {createUser, deleteUser, getUsers} from "./utils/apiHelpers";
import {findUserWithId} from "./utils/utils";
import {UserType} from "./utils/types";


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
  const [status, setStatus] = useState<{message: string, error: boolean}>({message: "", error: false})
  const [isLoading, setIsLoading] = useState(false);


  const fetchAndSetUsers = async () => {
    setIsLoading(true);
    const [responseOk, responseData] = await getUsers();
    if (responseOk) {
      setUsers(responseData.response);
    }else{
      setStatus({message: "Couldn't load users", error: true});
    }
    setIsLoading(false);
  }

  const createNewUser = async () => {
    setIsLoading(true);
    const [responseOk, responseData] = await createUser();
    if (responseOk) {
      setStatus({message: "Successfully created user", error: false});
      await fetchAndSetUsers();
    }else{
      setStatus({message: "Couldn't create user", error: true});
    }
    setIsLoading(false);
  }

  const deleteUserWrapper = async () => {
    setIsLoading(true);
    if (!selectedUser) return;
    const [responseOk, responseData] = await deleteUser(selectedUser.id);
    if(responseOk)
      setStatus({message: "Successfully deleted user", error: false});
    else
      setStatus({message: "Couldn't delete user", error: true});
    await fetchAndSetUsers()
    setSelectedUser(null)
    setIsLoading(false);
  }

  const onMarkerClick = (marker: CustomMarkerType) => {
    const user = findUserWithId(marker.id, users);
    if (!user) return;
    setSelectedUser(user);
  }

  useEffect(() => {
    fetchAndSetUsers();
  }, [])

  return (
    <div className="flex flex-row w-[100vw] h-[100vh]">
      <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY + ""} render={render}>
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
                animation={user.id === selectedUser?.id ? google.maps.Animation.BOUNCE : null}
              />
            ))
          }
        </CustomMap>
      </Wrapper>
      <div className="bg-gray-600 w-4/12">
        <h1 className="text-5xl text-center mt-2 font-bold mb-3 text-cyan-600">Users on map</h1>
         <span className={`block text-2xl mb-5 text-center ${status.error ? "text-danger" : "text-green-500"}`}>{status.message}</span>
        <div className="flex items-center justify-center">
          <button
            className="p-2 pl-5 pr-5 border-2 border-primary rounded-md text-primary w-fit
            hover:border-primary-hover hover:text-primary-hover  transition-all font-bold text-2xl"
            onClick={createNewUser}
          >CREATE USER
          </button>
        </div>
        {
          isLoading && (
          <div className="flex flex-col items-center mt-5">
            <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"/>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"/>
            </svg>
          </div>
          )
        }
        {selectedUser &&
            <div className="flex flex-col items-center mt-3">
                <hr className="border-blue-500 border-2 w-[90%] mb-2"/>
                <p className="text-left w-[90%] text-xl font-bold" >
                    Name: <span className="font-normal">{selectedUser.firstname}</span>
                </p>
                <p className="text-left w-[90%] text-xl font-bold" >
                    Surname: <span className="font-normal">{selectedUser.lastname}</span>
                </p>
                <p className="text-left w-[90%] text-xl font-bold" >
                    Email: <span className="font-normal">{selectedUser.email}</span>
                </p>
                <button
                    className="p-2 pl-5 pr-5 border-2 border-danger rounded-md text-danger w-fit
                 hover:border-danger-hover hover:text-danger-hover transition-all font-bold text-2xl mt-3"
                    onClick={deleteUserWrapper}
                >DELETE USER
                </button>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
