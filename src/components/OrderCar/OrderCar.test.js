import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom'

import OrderCar from "./index";


describe("Компонент OrderCar", () => {
    it("Вся информация отображается", () => {
        const { container } = render(<OrderCar cost={123} image="http://imagesrc/" name="Название" />);

        expect(container.querySelector(".order-car_active")).toBeFalsy();
        expect(container.querySelector(".order-car__name").innerHTML).toBe("Название");
        expect(container.querySelector(".order-car__cost").innerHTML).toBe("123 ₽");
        expect(container.querySelector(".order-car__image").src).toBe("http://imagesrc/");
    })

    it("Клик работает", () => {
        const clickHandle = jest.fn();

        const { container } = render(<OrderCar cost={123} image="http://imagesrc/" name="Название" onClick={clickHandle} />);

        expect(clickHandle.mock.calls.length).toBe(0);

        fireEvent.click(container.querySelector(".order-car"));

        expect(clickHandle.mock.calls.length).toBe(1);
    })

    it("Активность применяется", () => {
        const { container } = render(<OrderCar cost={123} image="http://imagesrc/" name="Название" active />);

        expect(container.querySelector(".order-car_active")).toBeInTheDocument();
    })
})