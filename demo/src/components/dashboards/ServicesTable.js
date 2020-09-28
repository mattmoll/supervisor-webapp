import React, { Component } from 'react'

export default class ServicesTable extends Component {
  state = {
    colorsVisibility : {
      "Rojos": true,
      "Amarillos": true,
      "Verdes" : true,
      "Traslados": true,
      "Eventos": true,
      "Otros": true
    },
    windowWidth: 1200
  }

  colors = {
    "Rojos": "#DC6967",
    "Amarillos": "#DCD267",
    "Verdes" : "#67DC75",
    "Traslados": "#4472C4",
    "Eventos": "#FFE699",
    "Otros": "#D9D9D9",
  }

  componentDidMount(){
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = e => {
    const windowWidth = window.innerWidth;
    this.setState(prevState => {
      return {
        ...prevState,
        windowWidth: windowWidth
      };
    });
  };


  toggleColumn = (color, event) =>{
    event.preventDefault();
    let colorsVisibilityUpdt = this.state.colorsVisibility;
    colorsVisibilityUpdt[color] = !colorsVisibilityUpdt[color];
    this.setState({ ...this.state, colorsVisibilityUpdt })
  }

  isVisible = (color) =>{
    return this.state.colorsVisibility[color];
  }

  showFullColorName = () => {
    return this.state.windowWidth > 790;
  }

  showSummary = () => {
    return this.state.windowWidth <= 580;
  }

  getServicesPerColor = (servicesPerStatusAndColor) => {
    if (this.showSummary()){
      return servicesPerStatusAndColor.serviciosPorColor.filter(servicesPerColor => ["Rojos", "Amarillos", "Verdes"].includes(servicesPerColor.color));
    }else{
      return servicesPerStatusAndColor.serviciosPorColor;
    }
  }


  render() {
    const {servicesPerStatusAndColor} = this.props;
    return (
      <div className="container-services-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{backgroundColor:"#9abcd6"}}>Estado</th>
              {
                this.getServicesPerColor(servicesPerStatusAndColor[0]).map((srvXColor, index) => 
                  this.isVisible(srvXColor.color) &&
                  (
                    <th key={index}  scope="col" 
                        style={{backgroundColor:this.colors[srvXColor.color], cursor:"pointer"}}>
                        {(this.showFullColorName()) ? srvXColor.color : srvXColor.color[0]} 
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
                {this.getServicesPerColor(srvXStateColor).map((srvXColor, index) => this.isVisible(srvXColor.color) &&
                (<th key={index}>{srvXColor.cantidad}</th>)
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="togglers-container">
        {
          this.getServicesPerColor(servicesPerStatusAndColor[0]).map((srvXColor, index) => 
          (
            <a className={"button-service-home btn m-1 " + (this.isVisible(srvXColor.color) ? "btn-info" : "btn-secondary")}
            key={index} href="!#" onClick={this.toggleColumn.bind(this, srvXColor.color)}>{srvXColor.color}</a>
          )
          )
        }
        </div>
      </div>
    )
  }
}
