import React from 'react';
import Utils from './utils';

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

    createChart() {
      if(!this.props.data || this.props.data.length < 1) {
        return;
      }
      var ghcid = this.props.ghcid;
      
      var _super = this;

      if (ghcid) {
        _super.ghcid = ghcid;
        _super.ajaxMessage('clear', null);
      } else {
        var ghcid = _super.ghcid;
        if (!ghcid) {
          console.log('ghcid null!');
        }
      }

      console.time("query response time");
      $("#nodata").hide();
      $("#loading_data").show();
      $("#frame").hide();
      $("#result").hide();

      var gmetric = $("#gmetrices").val();
      var locs = $("#locs").val();

      var from = $("#from").val();
      var until = $("#until").val();

      if (!ghcid) {
        console.log('ghcid null!');
        var ghcid = '';
      }
      // make request url
      var req_url = '/statsdata/health_uptime?hc_id=' + ghcid;
      if (gmetric) {
        req_url += '&metric=' + gmetric;
      }
      if (locs) {
        req_url += '&loc=' + locs;
      }
      if (from) {
        req_url += '&from=' + from;
      } else {
        req_url += '&from=' + $("#from").val();
      }
      if (until) {
        req_url += '&until=' + until;
      } else {
        req_url += '&until=' + $("#until").val();
      }
      $.get(
          req_url,
          function(rawJsonData) {
            if (rawJsonData.indexOf('>{') > -1) {
              rawJsonData = rawJsonData.substring(rawJsonData.indexOf('>{') + 1,
                  rawJsonData.length);
            }
            var json = jQuery.parseJSON(rawJsonData);
            $("#csv_export")[0].target = req_url;
            if (json.data.metric.length == 0) {
              _super.showChart(false);
              $('.tot_ms_view').css({
                'height' : '100px'
              });
              console.timeEnd("query response time");
              return;
            }
            $('.tot_ms_view').css({
              'height' : '450px'
            });
            _super.selectView(null, json);
            _super.showChart(true);
            console.timeEnd("query response time");
          }).error(
          function(XMLHttpRequest, textStatus, errorThrown) {
            try {
              var tmp = $P.json_decode(XMLHttpRequest.responseText);
              var msg = (tmp && $P.property_exists(tmp, 'message')) ? tmp.message
                  : XMLHttpRequest.responseText;
              _super.ajaxMessage('error', 'Unable to load data: ' + msg);
              _super.showChart(false);
            } catch (e) {
              _super.ajaxMessage('error', 'Unable to load data from server!');
              from = from.substring(1, from.length) + '.json';
              d3.json(from, function(error, json) {
                // d3.json('data.json', function(error, json) {
                if (!json) {
                  d3.json('data.json', function(error, json) {
                    _super.selectView(null, json);
                    _super.showChart(true);
                    console.timeEnd("query response time");
                  });
                } else {
                  setTimeout(function() {
                    _super.selectView(null, json);
                    _super.showChart(true);
                  }, 1000);
                }
              });
            }
          });
      
    }
    
    render(){
        this.createChart();
        return (
            <div>
                <h1>Health Check Id: { this.props.ghcid }</h1>
                <button onClick={this._update}>Update</button>
            </div>
        );
    }
}

Chart.propTypes = {
    ghcid: React.PropTypes.number,
    data: React.PropTypes.array
};

export default Chart;
