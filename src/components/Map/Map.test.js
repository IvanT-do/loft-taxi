import {render} from "@testing-library/react";
import mapboxgl from "mapbox-gl";
import '@testing-library/jest-dom'

import Map from "./index";

jest.mock("axios", () => ({
    defaults: {}
}));

jest.mock("../../store/orderSlice", () => ({
    getTargetCoordinates: () => []
}))
jest.mock("react-redux", () => ({
    useSelector: (fn) => fn()
}))


jest.mock("mapbox-gl");
const removeHandle = jest.fn();
const mapImplement = jest.fn(() => ({
    on: jest.fn(),
    remove: removeHandle
}))
mapboxgl.Map.mockImplementation(mapImplement);

describe("Компонент Map", () => {

    it("Корректно отображается", () => {
        const { container } = render(<Map />);

        expect(container.getElementsByClassName("map-wrapper").length).toBeTruthy();
        expect(container.getElementsByClassName("map-container").length).toBeTruthy();
        expect(container.getElementsByClassName("map-page-content").length).toBeTruthy();
    })

    it("Отображает дочерние элементы", () => {
        const { getByText } = render(<Map><div>Page</div></Map>);

        expect(getByText("Page")).toBeInTheDocument();
    })
})