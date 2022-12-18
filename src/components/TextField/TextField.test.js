import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom';

import TextField from "./index";

describe("Компонент TextField", () => {
    describe("Корректность отображения", () => {
        it("Label", () => {
            const {getByText} = render(<TextField
                label="Текстовое поле"
                name="fieldName"
                id="fieldId"
            />);
            const label = getByText("Текстовое поле");
            expect(label).toBeInTheDocument();
            expect(label).toHaveClass("text-field__label");
            expect(label).toHaveAttribute("for", "fieldId");
        })

        it("Input", () => {
            const {container} = render(<TextField
                label=""
                name="fieldName"
                id="fieldId"
                value="Пример"
                placeholder="Placeholder"
                helperText="Введите имя"
                onChange={() => {}}
            />);
            const input = container.querySelector(".text-field__input");
            expect(input).toBeTruthy();
            expect(input).toHaveAttribute("id", "fieldId");
            expect(input).toHaveAttribute("name", "fieldName");
            expect(input).toHaveAttribute("value", "Пример");
            expect(input).toHaveAttribute("placeholder", "Placeholder");
            expect(input).toHaveAttribute("type", "text");
        })

        it("Helper", () => {
            const {getByText} = render(<TextField
                label=""
                name="fieldName"
                id="fieldId"
                helperText="Введите имя"
            />);
            const helper = getByText("Введите имя");
            expect(helper).toBeInTheDocument();
            expect(helper).toHaveClass("text-field__helper");
        })
    })

    it("Выделяется при ошибке", () => {
        const {container} = render(<TextField error id="field" name="field" label=""/>);
        const field = container.querySelector(".text-field");

        expect(field).toBeTruthy();
        expect(field).toHaveClass("text-field_invalid");
    })

    it("Изменяется тип поля", () => {
        const {container} = render(<TextField type="password" id="field" name="field" label=""/>);
        const field = container.querySelector(".text-field__input");

        expect(field).toBeTruthy();
        expect(field).toHaveAttribute("type", "password");
    })

    it("Вызывается событие изменения значения", () => {
        const changeHandle = jest.fn();
        const {container} = render(<TextField
            label=""
            name="fieldName"
            id="fieldId"
            value="Пример"
            onChange={changeHandle}
        />);

        expect(changeHandle.mock.calls.length).toBe(0);

        const input = container.querySelector(".text-field__input")
        fireEvent.change(
            input,{target: {value: "input value"}}
        );

        expect(changeHandle.mock.calls.length).toBe(1);
    })
})