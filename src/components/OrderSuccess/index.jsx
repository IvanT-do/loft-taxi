import Button from "../Button";

import  "./style.css";

export default function OrderSuccess({onClose}) {
    return (
        <div className="map-card success-card">
            <h1 className="success-card__header">Заказ размещен</h1>
            <div className="success-card__text">
                Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.
            </div>
            <div className="success-card__action">
                <Button onClick={onClose}>
                    Сделать новый заказ
                </Button>
            </div>
        </div>
    );
}