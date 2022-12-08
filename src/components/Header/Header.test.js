import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom';

import Header, {links} from "./index";

import * as routeData from "react-router-dom";
import * as slice from "../../store/mainSlice";

jest.mock("axios", () => ({
    defaults: {}
}));

jest.mock('react-router-dom', () => {
    return {
        __esModule: true,
        useNavigate: () => () => {},
        useLocation: () => ({pathname: "/"}),
        matchPath: (val, val2) => val === val2
    };
})

jest.mock("react-redux", () => ({
    useDispatch: () => (val) => val
}));

describe("Компонент Header", () => {
    it("отрисовываются все ссылки", () => {
        const { container } = render(<Header />);

        expect(container.getElementsByClassName("header__nav")[0].children.length).toBe(links.length + 1);
    })

    it("Обрабатываются нажатия на ссылки", () => {
        const navigate = jest.fn();
        jest.spyOn(routeData, 'useNavigate').mockReturnValue(navigate);

        const { container } = render(<Header />);

        fireEvent.click(container.querySelector(".header__nav").firstChild);

        expect(navigate.mock.calls.length).toBe(1);
        expect(navigate.mock.calls[0][0]).toBe(links[0].page);
    })

    it("Работает выход", () => {
        const logout = jest.fn();
        jest.spyOn(slice, 'logout').mockImplementation(logout);
        const { getByText } = render(<Header onNavigate={() => {}} currentPage=""/>);

        expect(logout.mock.calls.length).toBe(0);

        fireEvent.click(getByText("Выйти"));

        expect(logout.mock.calls.length).toBe(1);
    })

    it("Корректно проставляется признак активности", () => {
        const { container } = render(<Header />);

        const nav = container.querySelector(".header__nav");

        expect(nav.firstChild).toHaveClass("nav-link_active");

        links.forEach((link, index) => {
            expect(nav.children[index + 1].classList.contains("nav-link_active")).toBeFalsy();
        })
    })
})