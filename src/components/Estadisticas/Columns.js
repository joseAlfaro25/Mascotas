import React from 'react';
//---I am
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import app from '../../services/auth/base';

const Columns = () => {
    const db=app.firestore();
    const [Pacientes, setPacientes] = React.useState([])
    
    const obtenerDatos = async() => {
        const data = await db.collection('datos').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setPacientes(arrayData)
}


   // React.useMemo(() => obtenerDatos(), [Pacientes])

    const lineaEstadistica=()=>{
        /* Imports */
        console.log('--->',Pacientes)

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.XYChart);
chart.scrollbarX = new am4core.Scrollbar();
chart.data = [{
    "country": "Marcos",
    "visits": 9
  }, {
    "country": "Lin",
    "visits": 2
  }];
  
  // Create axes
  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.renderer.labels.template.rotation = 270;
  categoryAxis.tooltip.disabled = true;
  categoryAxis.renderer.minHeight = 110;
  
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.minWidth = 50;
  
  // Create series
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.sequencedInterpolation = true;
  series.dataFields.valueY = "visits";
  series.dataFields.categoryX = "country";
  series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
  series.columns.template.strokeWidth = 0;
  
  series.tooltip.pointerOrientation = "vertical";
  
  series.columns.template.column.cornerRadiusTopLeft = 10;
  series.columns.template.column.cornerRadiusTopRight = 10;
  series.columns.template.column.fillOpacity = 0.8;
  
  // on hover, make corner radiuses bigger
  let hoverState = series.columns.template.column.states.create("hover");
  hoverState.properties.cornerRadiusTopLeft = 0;
  hoverState.properties.cornerRadiusTopRight = 0;
  hoverState.properties.fillOpacity = 1;
  
  series.columns.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  });
  
  // Cursor
  chart.cursor = new am4charts.XYCursor();
        
    }
    React.useLayoutEffect(() => {
      lineaEstadistica() 
     
      
      
    }, [lineaEstadistica])
    

   

    return (
        <React.Fragment>
            <div style={{width:'100%',height:400}}>
             <div id='chartdiv' style={{width:'100%',height:400}}>

             </div>   
            </div>
        </React.Fragment>
    );
}

export default Columns;
