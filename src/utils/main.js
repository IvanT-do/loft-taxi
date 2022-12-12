//вычисление классов подобно тому, что используется во vue, довольно удобно
export const getClass = (data) => {
    if(Array.isArray(data)){
        return data.map(item => {
            if(typeof item === "object")
                return getClass(item);
            return item || "";
        }).join(" ");
    }

    if(data && typeof data === "object"){
        return Object.keys(data).filter(key => !!data[key]).join(" ");
    }

    return data || "";
}

export const getFormData = (formFields) => {
    const formData = {};

    [...formFields].forEach(item => {
        if(item.name){
            formData[item.name] = item.value;
        }
    })

    return formData;
}

export const submitFormHandler = (callback) => (event) => {
    callback(event, getFormData(event.target));
}

export const fieldChangeHandle = (callback, modifier = (val) => val) => (event) => {
    callback(event.target.name, modifier(event.target.value));
}

export const setMask = (mask, value) => {
    Array.from(value).forEach(char => {
        mask = mask.replace("_", char);
    })
    return mask.replace(/(\d?)\D+$/, "$1");
}

export const validateCardNumber = (value) => setMask("____ ____ ____ ____", value.replace(/\D/g, ""));

export const validateExpire = (value) => setMask("__/__", value.replace(/\D/g, ""));

export const validateCVC = (value) => value.replace(/\D/g, "").substring(0, 3);

let layerId = 0;
export const drawRoute = (map, coordinates) => {
    const getId = () => `route${ layerId }`;

    let id = getId();

    map.flyTo({
        center: coordinates[0],
        zoom: 15
    });

    if(map.getLayer(id)){
        map.removeLayer(id);
    }

    layerId ++;
    id = getId();

    map.addLayer({
        id,
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