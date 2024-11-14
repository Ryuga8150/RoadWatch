import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken = import.meta.env.MAPBOX_TOKEN;

// console.log(import.meta.env.VITE_MAPBOX_TOKEN);

export default function LocationMap() {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  // console.log(import.meta.env.VITE_MAPBOX_TOKEN);
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  // 28.619081, 77.278333
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  const [lng, setLng] = useState(77.278333);
  const [lat, setLat] = useState(28.619081);
  const [zoom, setZoom] = useState(12);
  // console.log("Map Rendered");
  // console.log(mapContainer);
  // console.log(map);
  // mapbox://styles/ryuga8150/clrtmk1d0007501pde91bcfm3
  // light:  hsl(220, 29%, 86%)
  // dark: hsl(220, 17%, 24%)
  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      // style: "mapbox://styles/ryuga8150/clrtmk1d0007501pde91bcfm3",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: false,
      attributionControl: false,
    });
    // Create marker
    const el = document.createElement("div");

    // coming from our css
    el.className = "marker";
    // console.log(el);

    // Add marker
    // new mapboxgl.Marker({
    //   element: el,
    //   anchor: "bottom",
    // })
    //   .setLngLat([lng, lat])
    //   .addTo(map.current);

    // console.log(marker);
    if (map.current) {
      map.current.on("move", () => {
        if (map.current == null) return;
        setLng(Number(map.current.getCenter().lng.toFixed(4)));
        setLat(Number(map.current.getCenter().lat.toFixed(4)));
        setZoom(Number(map.current.getZoom().toFixed(2)));
      });
    }
    //mapboxgl-ctrl-attrib-inner
    // map.current.on("load", function () {
    //   // console.log(map.current.resize());

    //   // Create marker
    //   const el = document.createElement("div");

    //   // coming from our css
    //   el.className = "marker";
    //   console.log(el);

    //   // Add marker
    //   new mapboxgl.Marker({
    //     element: el,
    //     anchor: "bottom",
    //   })
    //     .setLngLat([lng, lat])
    //     .addTo(map.current);

    // });
  }, [lat, lng, zoom]);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h2 className="text-2xl font-semibold leading-[normal] text-black [font-family:Roboto]">
        Location
      </h2>
      <div
        ref={mapContainer}
        className="flex-grow rounded-lg" // Tailwind classes for styling
      />
    </div>
  );
}
