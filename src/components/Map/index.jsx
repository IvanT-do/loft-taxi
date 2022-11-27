import React, {useRef, useEffect} from "react";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import env from "../../env";

import './Map.css';

mapboxgl.accessToken = env.token;

export default function Map({children}) {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = React.useState(44);
    const [lat, setLat] = React.useState(56.32);
    const [zoom, setZoom] = React.useState(11.35);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [lng, lat],
            zoom: zoom
        });

        map.on("move", () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    return (
        <div className="map-wrapper">
            <div className="map-container" ref={mapContainerRef}/>
            <div className="map-page-content">
                {children}
            </div>
        </div>
    );
};

Map.propTypes = {
    children: PropTypes.element
}
