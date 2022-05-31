import './App.css';
import { ColorPicker } from './components/ColorPicker/ColorPicker';
import React, { useEffect, useState } from 'react';
import { ColorSwathe } from './components/ColorSwathe/ColorSwathe';



function App() {
  const [colors, setColors] = useState(["N", "N", "N", "N", "N"])
  const [pickedColors, setPickedColors] = useState(["N", "N", "N", "N", "N"])
  const [generatedTheme, setGeneratedTheme] = useState([])
  const [pickers, setPickers] = useState([0])

  // TODO: use below for app loading & error states
  // TODO: break up App component into panes to dynamically render Loading, Error, or App pane based on API responses
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // TODO: break out useEffect into an API directory and abstract it 
  // to make it easier to integrate with other APIs
  useEffect(() => {
    const url = "http://colormind.io/api/";

    const getColors = async () => {
      setLoading(true)
      try {
        const body = JSON.stringify({
          model: 'default',
          input: colors
        })
        const response = await fetch(url, {
          method: 'POST',
          body: body
        })
        const json = await response.json();
        const result = json.result
        const hexResult = result.map(color => color.map(decimal => (decimal.toString(16))).join(""))
        setGeneratedTheme(hexResult)
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
      }
    };

    getColors();
  }, [colors]);

  const handleIncrement = () => {
    setPickers(pickers => [...pickers, pickers.at(-1) + 1])

  }

  const handleColorSelect = (color, index) => {
    const newColors = [...pickedColors]
    newColors[index] = color
    setPickedColors(newColors)
  }

  const formatColors = (colors) => {
    return colors.map((color) => (color.substring(1) ? [parseInt(color.substring(1, 3), 16), parseInt(color.substring(3, 5), 16), parseInt(color.substring(5, 7), 16)] : "N"))
  }

  const handleSubmit = () => {
    setColors(formatColors(pickedColors))
  }

  return (
    <div className='main'>
      <div className="app container-fluid mt-3">
        <div className="card">
          <header className='card-header mx-auto w-100'>
            <h1>Color Theme Generator</h1>
          </header>
          <section className='card-body'>
            <p>select up to three colors to generate a theme</p>
            <div className='d-flex flex-row row m-1 justify-content-evenly'>
              {pickers.map(picker => {
                return (
                  <div className='p-1 border col-sm-12 col-lg-2'>
                    <ColorPicker
                      key={picker}
                      index={picker}
                      onSelect={handleColorSelect}
                    />
                  </div>
                )
              })}</div>
            <div className='d-flex flex-column m-auto w-50'>
              <button
                className='my-2 btn btn-default border'
                disabled={pickers.length >= 3}
                onClick={handleIncrement}
              >+ Add Color Selector</button>
              <button
                className='my-2 btn btn-primary'
                onClick={handleSubmit}
              >Generate Color Theme</button></div>
          </section>
          <section className='card mx-4'>
            <h1 className='card-header'>Generated Color Theme: </h1>
            <div className='card-body'>
              {generatedTheme.map((color, colorIndex) => {
                return (
                  <div key={colorIndex}>
                    <ColorSwathe color={"#" + color}></ColorSwathe>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
