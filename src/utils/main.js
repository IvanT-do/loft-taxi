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