export const ColorSwathe = ({ color }) => {
    const colorStyle = {
        backgroundColor: color
    }
    return (
        <div className="border" style={colorStyle}>
            <p style={{ margin: '1vw 25vw', backgroundColor: "#f6f6f6" }}>
                {color}
            </p>
        </div>
    )
}
