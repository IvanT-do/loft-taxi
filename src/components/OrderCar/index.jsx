import {getClass} from "../../utils/main";

import "./style.css";

export default function OrderCar({name, cost, image, active, onClick}){
    return (
        <div
            className={getClass(["order-car", {"order-car_active": active}])}
            onClick={onClick}
        >
            <div className="order-car__name">
                {name}
            </div>
            <div className="order-car__cost-title">Стоимость</div>
            <div className="order-car__cost">{cost} ₽</div>
            <img
                src={image}
                alt=""
                className="order-car__image"
            />
        </div>
    )
}