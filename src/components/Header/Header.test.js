import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom';
import * as hooks from "../../utils/AuthProvider";

import Header, {links} from "./index";

describe("Компонент Header", () => {
    it("отрисовываются все ссылки", () => {
        const { container } = render(<Header onNavigate={() => {}} currentPage=""/>);

        expect(container.getElementsByClassName("header__nav")[0].children.length).toBe(links.length + 1);
    })

    it("Обрабатываются нажатия на ссылки", () => {
        const navigate = jest.fn();
        const { container } = render(<Header onNavigate={navigate} currentPage=""/>);

        fireEvent.click(container.getElementsByClassName("header__nav")[0].firstChild);

        expect(navigate.mock.calls.length).toBe(1);
        expect(navigate.mock.calls[0][0]).toBe(links[0].page);
    })

    it("Работает выход", () => {
        const logout = jest.fn();
        jest.spyOn(hooks, 'useAuth').mockImplementation(() => ({
            logout
        }));
        const { getByText } = render(<Header onNavigate={() => {}} currentPage=""/>);

        expect(logout.mock.calls.length).toBe(0);

        fireEvent.click(getByText("Выйти"));

        expect(logout.mock.calls.length).toBe(1);
    })

    it("Корректно проставляется признак активности", () => {
        const { container } = render(<Header onNavigate={() => {}} currentPage={links[0].page}/>);

        const nav = container.querySelector(".header__nav");

        expect(nav.firstChild).toHaveClass("nav-link_active");

        links.forEach((link, index) => {
            expect(nav.children[index + 1].classList.contains("nav-link_active")).toBeFalsy();
        })
    })
})