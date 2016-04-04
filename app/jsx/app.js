import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './chart';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            ghcid: this.props.ghcid,
            config: this.props.config
        };
        this._createChart = this._createChart.bind(this);
    }

    _createChart(_data){
        this.setState({
            data: _data
        });
    }

    render(){
        return  (
            <div>
              <Chart config={this.state.config} ghcid={this.state.ghcid} data={this.state.data} onUpdate={this._createChart} />
            </div>
        );
    }
}

var uptimeConfig = {
    "slider" : {
      "init" : {
        "x0" : 0,
        "x1" : 60
      },
      "range" : {
        "min" : 0,
        "max" : 600
      },
      "step" : 5
    },
    "lineChart" : {
      "main" : {
        "margin" : {
          "width" : 950,
          "height" : 250,
          "top" : 50,
          "bottom" : 20,
          "right" : 40,
          "left" : 40
        },
        "yAxis" : {
          "right" : "judge"
        },
        "type" : "cardinal",
        "range" : 30
      },
      "mini" : {
        "margin" : {
          "width" : 870,
          "height" : 40,
          "top" : 0,
          "bottom" : 20,
          "right" : 0,
          "left" : 0
        },
        "type" : "monotone"
      },
      "combo" : {
        "id" : "gmetrices",
        "init" : "*"
      }
    },
    "histogram" : {
      "margin" : {
        "width" : 950,
        "height" : 175,
        "top" : 130,
        "bottom" : 0,
        "right" : 40,
        "left" : 40
      },
      "max_bar" : 20
    },
    "stackedChart" : {
      "type" : "line",
      "margin" : {
        "width" : 950,
        "height" : 250,
        "top" : 50,
        "bottom" : 25,
        "right" : 40,
        "left" : 40
      }
    },
    "gauge" : {
      "size" : 160,
      "clipWidth" : 160,
      "clipHeight" : 160,
      "ringWidth" : 60,
      "maxValue" : 300,
      "transitionMs" : 2000
    },
    "map" : {
      "margin" : {
        "width" : 950,
        "height" : 400,
        "top" : 200,
        "left" : 390
      },
      "circle_scale" : 0.5,
      "circle" : {
        "#81bc00" : 5,
        "#236093" : 10,
        "#dc291e" : 50
      },
      "scale" : 135,
      "tooltip" : {
        "x" : 2,
        "y" : 2
      },
      "combo" : {
        "id" : "locs",
        "init" : "*"
      }
    },
    "gmap" : {
      "height" : 300,
      "width" : 950,
      "circle_scale" : 1,
      "scale" : 150,
      "tooltip" : {
        "x" : 20,
        "y" : 160
      },
      "combo" : {
        "id" : "glocs",
        "init" : "*"
      }
    },
    "legend" : {
      "x" : 9,
      "y" : -3,
      "width" : 18,
      "height" : 18
    },
    "mapping" : {
      "nsl_ms" : "DNS", // DNS Lookup #81bc00
      "con_ms" : "Connect", // Time To Connect #7e7f74
      "tfb_ms" : "Wait", // Time To 1st Byte #ffa400
      "tot_ms" : "Response", // Roundtrip Time #7D602B
      "time_ms" : "Response", // Roundtrip Time
      "rt_min" : "RT MIN", // Roundtrip Time Minimum (ms)
      "rt_max" : "RT MAX", // Roundtrip Time Maximum (ms)
      "rt_avg" : "RT AVG", // Roundtrip Time Average (ms)
      "rt_std" : "RT STD", // Roundtrip Time Standard (ms)
      "loss_" : "LOSS", // Loss Percentage (%)
      "state" : "SVC",
      "aggregate" : "AGG",
      "judge" : "Up/Down"
    },
    "format" : {
      "full_date" : "DD/MM/YYYY HH:mm:ss"
    }
  }

App.defaultProps = {
    ghcid: 1,
    config: uptimeConfig
};

ReactDOM.render(<App/>, document.getElementById('app'));
