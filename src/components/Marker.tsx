import {useEffect, useState} from "react";

interface MarkerType extends google.maps.MarkerOptions {
  onClickHandler: CallableFunction;
}

function Marker(options: MarkerType) {
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
      if(options.onClickHandler){
        marker.addListener("click", () => options.onClickHandler(marker));
      }
    }
  }, [marker, options]);

  return null;
}

export default Marker