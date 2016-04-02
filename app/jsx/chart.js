import React from 'react';

class Chart extends React.Component {
    constructor(props){
        super(props);
        this._update = this._update.bind(this);
    }

    _update(){
      var _super = this;
      d3.csv("data/data.csv", function(error, data) {
        _super.props.onUpdate(data);
      }); 
    }

    drawChart() {
      if(!this.props.data || this.props.data.length < 1) {
        return;
      }
      
      var margin = this.props.config.margin;
      var width = this.props.config.width;
      var height = this.props.config.height;
      
      var data = this.props.data;
      var parseDate = d3.time.format("%d-%b-%y").parse;

      // Set the ranges
      var x = d3.time.scale().range([ 0, width ]);
      var y = d3.scale.linear().range([ height, 0 ]);

      // Define the axes
      var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);

      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

      // Define the line
      var valueline = d3.svg.line().x(function(d) {
        return x(d.date);
      }).y(function(d) {
        return y(d.close);
      });

      // Adds the svg canvas
      var svg = d3.select("body").append("svg").attr("width",
          width + margin.left + margin.right).attr("height",
          height + margin.top + margin.bottom).append("g").attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      // Get the data
      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) {
        return d.date;
      }));
      y.domain([ 0, d3.max(data, function(d) {
        return d.close;
      }) ]);

      // Add the valueline path.
      svg.append("path").attr("class", "line").attr("d", valueline(data));

      // Add the X Axis
      svg.append("g").attr("class", "x axis").attr("transform",
          "translate(0," + height + ")").call(xAxis);

      // Add the Y Axis
      svg.append("g").attr("class", "y axis").call(yAxis);
    }
    
    render(){
        this.drawChart();
        return (
            <div>
                <h1>Title: { this.props.title }</h1>
                <button onClick={this._update}>Update</button>
            </div>
        );
    }
}

Chart.propTypes = {
    title: React.PropTypes.string,
    data: React.PropTypes.array
};

export default Chart;
