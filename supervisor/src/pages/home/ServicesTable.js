import React from 'react'

export default function ServicesTable({servicesPerStatusAndColor}) {

  const getColorsVisibilityDefault = (colorNamesArray) => {
    const colorsVisibilityDefault = {};
    colorNamesArray.forEach( color => {
      colorsVisibilityDefault[color] = true;
    });
    return colorsVisibilityDefault;
  }

  const colorNamesArray = servicesPerStatusAndColor[0].serviciosPorColor.map(servicePerColor => servicePerColor.color);
  const [colorsVisibility, setColorsVisibility] = React.useState(getColorsVisibilityDefault(colorNamesArray));
  const [windowWidth, setWindowWidth] = React.useState(1200);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const getColorsMap = (colorNamesArray, hexadecimalColors) => {
    const hexaColorsDefault = {};
    for(let index =0; index < colorNamesArray.length; index++){
      hexaColorsDefault[colorNamesArray[index]] = hexadecimalColors[index];
    }
    return hexaColorsDefault;
  }

  const hexadecimalColors = ["#DC6967", "#DCD267", "#67DC75", "#4472C4", "#FFE699", "#D9D9D9"];
  const colors = getColorsMap(colorNamesArray, hexadecimalColors);

  const handleResize = e => {
    setWindowWidth(window.innerWidth);
  };


  const toggleColumn = (event, color) =>{
    event.preventDefault();
    let colorsVisibilityUpdt = colorsVisibility;
    let newColorsVisibility = {...colorsVisibilityUpdt};
    newColorsVisibility[color] = !colorsVisibilityUpdt[color];
    setColorsVisibility(newColorsVisibility);
  }

  const isVisible = (color) =>{
    return colorsVisibility[color];
  }

  const showFullColorName = () => {
    return windowWidth > 790;
  }

  const showSummary = () => {
    return windowWidth <= 580;
  }

  const getServicesPerColor = (servicesPerStatusAndColor) => {
    if (showSummary()){
      return servicesPerStatusAndColor.serviciosPorColor.filter(servicesPerColor => 
                                      ["Rojos", "Amarillos", "Verdes"].includes(servicesPerColor.color));
    } else {
      return servicesPerStatusAndColor.serviciosPorColor;
    }
  }

  if (servicesPerStatusAndColor == null){
    return <h2>Loading Services table...</h2>;
  }
  
  return (
    <div className="container-services-table">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" style={{backgroundColor:"#9abcd6"}}>Estado</th>
            {
              getServicesPerColor(servicesPerStatusAndColor[0]).map((srvXColor, index) => 
                isVisible(srvXColor.color) &&
                (
                  <th key={index}  scope="col" 
                      style={{backgroundColor:colors[srvXColor.color], cursor:"pointer"}}>
                      {(showFullColorName()) ? srvXColor.color : srvXColor.color[0]} 
                  </th>
                ) )
            }
          </tr>
        </thead>
        <tbody>
          {servicesPerStatusAndColor.map((srvXStateColor, index) => 
          (
            <tr  key={index}>
              <th scope="row">{srvXStateColor.descripcion}</th>
              {getServicesPerColor(srvXStateColor).map((srvXColor, index) => isVisible(srvXColor.color) &&
              (<th key={index}>{srvXColor.cantidad}</th>)
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="togglers-container">
      {
        getServicesPerColor(servicesPerStatusAndColor[0]).map((srvXColor, index) => 
        (
          <a className={"button-service-home btn m-1 " + (isVisible(srvXColor.color) ? "btn-info" : "btn-secondary")}
          key={index} href="!#" onClick={(event) => toggleColumn(event, srvXColor.color)}>{srvXColor.color}</a>
        )
        )
      }
      </div>
    </div>
  )
  
}
