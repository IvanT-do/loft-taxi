import {render, fireEvent, getByTestId} from "@testing-library/react";
import '@testing-library/jest-dom'
import * as orderSlice from "../../store/orderSlice";

import OrderForm, {carsContent} from "./index";

jest.mock("react-redux", () => ({
    useDispatch: () => () => {},
    useSelector: (fn) => fn()
}))

const addresses = ["адрес 1", "адрес 2", "адрес 3"]
jest.mock("../../store/orderSlice", () => ({
    fetchRouteAsync: jest.fn(),
    getAddresses: () => addresses
}))

describe("Компонент OrderForm", () => {
    describe("Компонент отображается", () => {
        const { container, getByPlaceholderText } = render(<OrderForm onSubmit={jest.fn()} />);

        it("Контейнер", () => {
            expect(container.querySelector(".order")).toBeInTheDocument();
            expect(container.querySelector(".order__address")).toBeInTheDocument();
            expect(container.querySelector(".order__address_minimal")).toBeInTheDocument();

            expect(container.querySelector(".order__tariff")).toBeFalsy();
        })

        const from = getByPlaceholderText("Откуда...");
        const to = getByPlaceholderText("Куда...");
        it("Селекты", () => {
            expect(from).toBeTruthy();
            expect(to).toBeTruthy();
        })
    })

    describe("Функционал работает", () => {
        const submitHandle = jest.fn();
        const fetchRoute = jest.spyOn(orderSlice, "fetchRouteAsync");

        const { container, getByText } = render(<OrderForm onSubmit={submitHandle} />);

        describe("Адреса выбираются и отображаются авто", () => {
            const selects = container.querySelectorAll(".MuiAutocomplete-root");

            selects.forEach((select, index) => {
                it("До выбора всех адресов диспатчи не запускаются", () => {
                    expect(fetchRoute.mock.calls.length).toBe(0);
                })

                fireEvent.click(getByTestId(select, "ArrowDropDownIcon"));
                fireEvent.click(getByText(addresses[index]));
            })

            expect(fetchRoute.mock.calls.length).toBe(1);

            const dispatchData = fetchRoute.mock.calls[0][0];

            it("Корректные даты передаются в диспатч", () => {
                expect(dispatchData.from).toBe(addresses[0]);
                expect(dispatchData.to).toBe(addresses[1]);
            })

            const tariffs = container.querySelector(".order__tariff-cars");
            const button = getByText("Заказать");
            it("После выбора адресов отображается список авто и кнопка заказа", () => {
                expect(tariffs).toBeTruthy();
                expect(button).toBeTruthy();
            });

            const cars = container.querySelectorAll(".order-car");

            it("Карточек авто 3", () => {
                expect(cars.length).toBe(3);
            })

            fireEvent.click(cars[1]);

            it("По нажатию на карточку выбор авто изменился", () => {
                expect(cars[0].classList.contains("order-car_active")).toBeFalsy();
                expect(cars[1].classList.contains("order-car_active")).toBeTruthy();
                expect(cars[2].classList.contains("order-car_active")).toBeFalsy();
            })

            fireEvent.click(button);

            const submitCalls = submitHandle.mock.calls;

            it("После нажатия на заказ отправляется submit", () => {
                expect(submitCalls.length).toBe(1);
                const callData = submitCalls[0][0];
                expect(callData.from).toBe(addresses[0]);
                expect(callData.to).toBe(addresses[1]);
                expect(callData.tariff).toBe(carsContent[1].type);
            })
        })
    })
})