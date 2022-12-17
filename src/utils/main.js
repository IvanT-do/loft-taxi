export const getClass = (...data) => {
    return data.map(item => {
        if(item && typeof item === "object")
            return Object.keys(item).filter(key => !!item[key]).join(" ");
        return item || "";
    }).join(" ");
}

export const setMask = (mask, value) => {
    Array.from(value).forEach(char => {
        mask = mask.replace("_", char);
    })
    return mask.replace(/(\d?)\D+$/, "$1");
}

export const validateCardNumber = (value = "") => setMask("____ ____ ____ ____", value.replace(/\D/g, ""));

export const validateExpire = (value = "") => setMask("__/__", value.replace(/\D/g, ""));

export const validateCVC = (value = "") => value.replace(/\D/g, "").substring(0, 3);

let layerId = 0;
export const drawRoute = (map, coordinates) => {
    const getId = () => `route${ layerId }`;

    const id = getId();

    map.flyTo({
        center: coordinates[0],
        zoom: 15
    });

    if(map.getLayer(id)){
        map.removeLayer(id);
    }

    layerId++;

    map.addLayer({
        id: getId(),
        type: "line",
        source: {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates
                }
            }
        },
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#ffc617",
            "line-width": 8
        }
    });
};

export const validateEmail = (value = "") => /^[\w._-]+@.+\..+$/.test(value) ? "" : "Поле имеет неверный формат";

export const validatePassword = (value = "") => value.length > 5 ? "" : "Минимальная длина пароля 6 символов"
