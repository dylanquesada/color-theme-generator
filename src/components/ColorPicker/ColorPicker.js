import { useState } from "react"

export const ColorPicker = ({ onSelect, index }) => {

    const [color, setColor] = useState("N")

    const handleChange = (event) => {
        setColor(event.target.value)
        onSelect(color, index)
    }

    return (
        <div className="container-fluid d-flex flex-column flex-wrap">
            <label
                className="form-label"
                htmlFor="color">{color === "N" ? "Select a color" : color} </label>
            <input
                type="color"
                id="color"
                name="color"
                className="form-control form-control-color m-auto"
                onChange={handleChange}
                value={color} />
            <button
                className="button btn-sm btn-danger m-2"
                onClick={() => { setColor("N") }}>Clear Selection</button>
        </div>
    )
}