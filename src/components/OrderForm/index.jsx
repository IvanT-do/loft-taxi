import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRouteAsync, getAddresses} from "../../store/orderSlice";
import Select from "../Select";
import OrderCar from "../OrderCar";
import Button from "../Button";
import {getClass} from "../../utils/main";

import "./style.css";

import standard from "./assets/standard.jpg";
import premium from "./assets/premium.jpg";
import business from "./assets/business.png";

const carsContent = [
    {
        name: "Стандарт",
        cost: 150,
        image: standard,
        type: "standard",
    },
    {
        name: "Премиум",
        cost: 250,
        image: premium,
        type: "premium",
    },
    {
        name: "Бизнес",
        cost: 300,
        image: business,
        type: "business",
    }
]

export default function OrderForm({ onSubmit }){
    const addresses = useSelector(getAddresses);
    const dispatch = useDispatch();

    const [currentTariff, setCurrentTariff] = React.useState(carsContent[0].type);
    const [from, setFrom] = React.useState(null);
    const [to, setTo] = React.useState(null);

    const tariffChangeHandle = (type) => () => {
        setCurrentTariff(type);
    }

    const handleFromChange = (e, newVal) => {
        setFrom(newVal?.value || null);
    }

    const handleToChange = (e, newVal) => {
        setTo(newVal?.value || null);
    }

    const submitOrderHandle = () => {
        if(onSubmit){
            onSubmit({
                from,
                to,
                tariff: currentTariff
            });
        }
    }

    useEffect(() => {
        if(!!from && !!to){
            dispatch(fetchRouteAsync({from, to}));
        }
    }, [from, to])

    return (
        <div className="map-card order">
            <div className={getClass("order__address", {"order__address_minimal": !from || !to})}>
                <Select
                    sx={{
                        borderBottom: "solid 1px #E0E0E0"
                    }}
                    id="fromAddr"
                    value={from}
                    onChange={handleFromChange}
                    label="Откуда..."
                    startAdornment={(
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7" cy="7" r="7" fill="black"/>
                        </svg>
                    )}
                    options={addresses.filter(item => item !== to)}
                />
                <Select
                    id="toAddr"
                    value={to}
                    onChange={handleToChange}
                    label="Куда..."
                    startAdornment={(
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_1_300" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                <path d="M15.7272 0.0350297L0.373266 5.69174C0.130027 5.78306 -0.0243204 6.02791 0.0031552 6.28812C0.0298227 6.54914 0.230232 6.75763 0.489633 6.79399L8.55045 7.94554L9.702 16.0064C9.73836 16.2658 9.94766 16.467 10.2071 16.4936C10.3832 16.513 10.5529 16.4484 10.6717 16.3296C10.7291 16.2722 10.7744 16.2027 10.8034 16.1235L16.4601 0.769594C16.5377 0.559488 16.486 0.325138 16.3284 0.167559C16.1709 0.00997888 15.9365 -0.0417397 15.7272 0.0350297Z" fill="#FDBF5A"/>
                            </mask>
                            <g mask="url(#mask0_1_300)">
                                <path d="M15.7272 0.0350297L0.373266 5.69174C0.130027 5.78306 -0.0243204 6.02791 0.0031552 6.28812C0.0298227 6.54914 0.230232 6.75763 0.489633 6.79399L8.55045 7.94554L9.702 16.0064C9.73836 16.2658 9.94766 16.467 10.2071 16.4936C10.3832 16.513 10.5529 16.4484 10.6717 16.3296C10.7291 16.2722 10.7744 16.2027 10.8034 16.1235L16.4601 0.769594C16.5377 0.559488 16.486 0.325138 16.3284 0.167559C16.1709 0.00997888 15.9365 -0.0417397 15.7272 0.0350297Z" fill="#FDBF5A"/>
                                <path d="M17.3583 -0.77063L8.35828 8.22937C8.85828 11.5627 9.85828 18.3294 9.85828 18.7294C9.85828 19.1294 13.8583 18.896 15.8583 18.7294L17.3583 -0.77063Z" fill="#E5AB4C"/>
                            </g>
                        </svg>
                    )}
                    options={addresses.filter(item => item !== from)}
                />
            </div>
            {
                !!from &&  !!to && (
                    <div className="order__tariff">
                        <div className="order__tariff-cars">
                            {
                                carsContent.map(({type, ...item}) => (
                                    <OrderCar
                                        key={item.name}
                                        active={currentTariff === type}
                                        onClick={tariffChangeHandle(type)}
                                        {...item}
                                    />
                                ))
                            }
                        </div>
                        <Button onClick={submitOrderHandle}>
                            Заказать
                        </Button>
                    </div>
                )
            }
        </div>
    );
}