import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom'

import Button from "./index";

describe("Компонент Button", () => {
    it("Корректно отображается", () => {
        const { getByText, container } = render(<Button>Нажать</Button>)

        expect(getByText("Нажать")).toBeInTheDocument();
        expect(container.firstChild).toHaveAttribute("type", "button");
        expect(container.firstChild).toHaveClass("button");
        expect(container.firstChild.classList.contains("button_disabled")).toBeFalsy();
        expect(container.firstChild).toBeEnabled();
    })

    it("Реагирует на нажатия", () => {
        const clickCallback = jest.fn();

        const { container } = render(<Button onClick={clickCallback}>Нажать</Button>);

        expect( clickCallback.mock.calls.length).toBe(0);

        fireEvent.click(container.firstChild);

        expect( clickCallback.mock.calls.length).toBe(1);
    })

    it("Становится неактивной", () => {
        const { container } = render(<Button disabled>Нажать</Button>);

        expect(container.firstChild).toHaveClass('button_disabled');
        expect(container.firstChild).toBeDisabled();
    })
})