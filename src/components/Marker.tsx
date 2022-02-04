import {useEffect, useState} from "react";

export interface CustomMarkerType extends google.maps.MarkerOptions {
  onClick: CallableFunction;
  id: string;
}

function Marker(options: CustomMarkerType) {
  const [marker, setMarker] = useState<google.maps.Marker>();


  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker])

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      if(options.onClick){
        marker.addListener("click", () => options.onClick(marker));
      }
    }
  }, [marker, options]);

  return null;
}

export default Marker