import withAuth from "../../utils/withAuth";
import OrderForm from "../../components/OrderForm";
import React, {useEffect} from "react";
import {fetchAddressesIfNotLoaded, setOrderAsync} from "../../store/orderSlice";
import {fetchProfileIfNotLoaded} from "../../store/mainSlice";
import {useDispatch} from "react-redux";
import OrderSuccess from "../../components/OrderSuccess";

function Home(){
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);
    const [orderSuccess, setOrderSuccess] = React.useState(false);

    useEffect(() => {
        dispatch(fetchAddressesIfNotLoaded());
        dispatch(fetchProfileIfNotLoaded())
            .then(card => {
                if(card){
                    setLoading(false);
                }
            })
    }, []);

    const formSubmitHandle = (data) => {
        setLoading(true);
        dispatch(setOrderAsync(data))
            .unwrap()
            .then(() => {
                setLoading(false);
                setOrderSuccess(true);
            })
    }

    const successCloseHandle = () => {
        setOrderSuccess(false);
    }

    if(loading){
        return (
            <div className="map-card map-card__loader">
                <h2>Загрузка...</h2>
            </div>
        );
    }

    if(orderSuccess){
        return <OrderSuccess onClose={successCloseHandle} />
    }

    return (
        <OrderForm onSubmit={formSubmitHandle} />
    );
}

export default withAuth(Home)