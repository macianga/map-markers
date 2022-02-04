import {cloneElement, EffectCallback, isValidElement, useEffect, useRef, useState, Children} from "react";
import {createCustomEqual} from "fast-equals";
import {isLatLngLiteral} from "@googlemaps/typescript-guards";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: any;
}

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);


function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}


function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

function Map(...{onClick, onIdle, children, style, ...options}: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mapElement, setMapElement] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !mapElement) {
      setMapElement(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, mapElement]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (mapElement) {
      mapElement.setOptions(options);
    }
  }, [mapElement, options]);

  useEffect(() => {
    if (mapElement) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(mapElement, eventName)
      );

      if (onClick) {
        mapElement.addListener("click", onClick);
      }

      if (onIdle) {
        mapElement.addListener("idle", () => onIdle(mapElement));
      }
    }
  }, [mapElement, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style}/>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, mapElement);
        }
      })}
    </>
  );
}


export default Map