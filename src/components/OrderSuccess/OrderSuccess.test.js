import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom';

import OrderSuccess from "./index";

describe("Компонент OrderSuccess", () => {
    it("Компонент отображается", () => {
        const { getByText } = render(<OrderSuccess onClose={jest.fn()} />);

        expect(getByText("Заказ размещен")).toBeInTheDocument();
        expect(getByText("Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.")).toBeInTheDocument();
        expect(getByText("Сделать новый заказ")).toBeInTheDocument();
    })

    it("Реагирует на onClose", () => {
        const closeHandle = jest.fn();
        const { getByText } = render(<OrderSuccess onClose={closeHandle} />);

        expect(closeHandle.mock.calls.length).toBe(0);

        fireEvent.click(getByText("Сделать новый заказ"));

        expect(closeHandle.mock.calls.length).toBe(1);
    })
})