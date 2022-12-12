import React, {useRef, useEffect} from "react";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import env from "../../env";

import './Map.css';
import {useSelector} from "react-redux";
import {getTargetCoordinates} from "../../store/orderSlice";
import {drawRoute} from "../../utils/main";

mapboxgl.accessToken = env.token;

export default function Map({children}) {
    const mapContainerRef = useRef(null);

    const [map, setMap] = React.useState(null);
    const coordinates = useSelector(getTargetCoordinates);

    const [lng, setLng] = React.useState(30.3104);
    const [lat, setLat] = React.useState(59.9367);
    const [zoom, setZoom] = React.useState(11.35);

    useEffect(() => {
        if(map){
            try{
                drawRoute(map, coordinates);
            }
            catch{}
        }
    }, [map, coordinates])

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

        setMap(map);

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
