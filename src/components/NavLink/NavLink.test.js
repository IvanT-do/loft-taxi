import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom'

import NavLink from "./index";

describe("Компонент NavLink", () => {
    it("Корректно отображается", () => {
        const { container, getByText } = render(<NavLink label="Выйти" />);

        expect(getByText("Выйти")).toBeInTheDocument();
        expect(container.firstChild).toHaveClass("nav-link");
        expect(container.firstChild.classList.contains("nav-link_active")).toBeFalsy();
    })

    it("Обрабатывает нажатия", () => {
        const clickHandle = jest.fn();
        const { getByText } = render(<NavLink onClick={clickHandle} label="Выйти" />);

        expect(clickHandle.mock.calls.length).toBe(0);
        fireEvent.click(getByText("Выйти"))
        expect(clickHandle.mock.calls.length).toBe(1);
    })

    it("Оображает активность", () => {
        const { container } = render(<NavLink active label="Выйти" />);

        expect(container.firstChild).toHaveClass("nav-link_active");
    })
})