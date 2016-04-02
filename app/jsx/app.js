import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './chart';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title: this.props.title,
            config: this.props.config
        };
        this._updateValue = this._updateValue.bind(this);
    }

    _updateValue(_data){
        this.setState({
            data: _data
        });
    }

    render(){
        return  (
            <div>
              <Chart title={this.state.title} config={this.state.config} data={this.state.data} onUpdate={this._updateValue} />
            </div>
        );
    }
}

var margin = {
    top : 30,
    right : 20,
    bottom : 30,
    left : 50
    }
var width = 600 - margin.left - margin.right;
var height = 270 - margin.top - margin.bottom;

App.defaultProps = {
    title: 'D3 Chart Test',
    config: {
      margin: margin,
      width: width,
      height: height
    }
};

ReactDOM.render(<App/>, document.getElementById('app'));
