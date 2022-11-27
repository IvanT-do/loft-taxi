import Header from "../components/Header";
import Map from "../components/Map";
import PropTypes from "prop-types";

export default function Template({onNavigate, currentPage, children}){
    return (
        <div className="page page_vert">
            <Header onNavigate={onNavigate} currentPage={currentPage} />
            <Map>
                { children }
            </Map>
        </div>
    );
}

Template.propTypes = {
    onNavigate: PropTypes.func,
    currentPage: PropTypes.string,
    children: PropTypes.element
}