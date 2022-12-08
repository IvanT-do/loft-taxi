import Header from "../components/Header";
import Map from "../components/Map";
import { Outlet } from "react-router-dom";

export default function Template(){
    return (
        <div className="page page_vert">
            <Header />
            <Map>
                <Outlet />
            </Map>
        </div>
    );
}