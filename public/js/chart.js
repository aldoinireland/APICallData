var chart = c3.generate({
    bindto: '#chart',
    zoom: {
        enabled: true
    },
    padding: {
      bottom: 20
    },
    data: {
        axis: {
            x: {
                label: 'Last 60 Minutes per Minute',
                position: 'outer-center'
            },
            y: {
                show: true
            }
        },
        selection: {
            draggable: true
        },
        colors: {
            'Calls Taken' : '#586949'
        },
        x : 'x',
        columns: [
            ['x', '0'],
            ['Calls Taken', 0],
        ],
        type: 'bar'
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

var aht = c3.generate({
    bindto: '#aht',
    zoom: {
        enabled: true
    },
    padding: {
      bottom: 20
    },
    data: {
        selection: {
            draggable: true
        },
        colors: {
            'Total Seconds' : '#162252'
        },
        x : 'x',
        columns: [
            ['x', '0'],
            ['Total Seconds', 0],
        ]
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

var avg = c3.generate({
    bindto: '#avg',
    padding: {
      bottom: 20
    },
    zoom: {
        enabled: true
    },
    data: {
        selection: {
            draggable: true
        },
        colors: {
            'Average Seconds' : '#330000'
        },
        x : 'x',
        columns: [
            ['x', '0'],
            ['Average Seconds', 0],
        ],        
        types: {
            'Average Seconds' : 'area-spline'
        }
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

var updateGraphs = function() {
    $.ajax({
      url: '/api/calls', 
      dataType: 'json', 
    })
    .done(function(data) { 
            console.log(data[0].minute);
            chart.load({
            columns: [
                ['x', data[0].minute, data[1].minute, data[2].minute, data[3].minute,data[4].minute,data[5].minute,data[6].minute,data[7].minute,data[8].minute,data[9].minute,data[10].minute,data[11].minute,data[12].minute,data[13].minute,data[14].minute,data[15].minute,data[16].minute,data[17].minute,data[18].minute,data[19].minute,data[20].minute,data[21].minute,data[22].minute,data[23].minute,data[24].minute,data[25].minute,data[26].minute,data[27].minute,data[28].minute,data[29].minute,data[30].minute,data[31].minute,data[32].minute,data[33].minute,data[34].minute,data[35].minute,data[36].minute,data[37].minute,data[38].minute,data[39].minute,data[40].minute,data[41].minute,data[42].minute,data[43].minute,data[44].minute,data[45].minute,data[46].minute,data[47].minute,data[48].minute,data[49].minute,data[50].minute,data[51].minute,data[52].minute,data[53].minute,data[54].minute,data[55].minute,data[56].minute,data[57].minute,data[58].minute,data[59].minute],
                ['Calls Taken', data[0].calls,data[1].calls,data[2].calls,data[3].calls,data[4].calls,data[5].calls,data[6].calls,data[7].calls,data[8].calls,data[9].calls,data[10].calls,data[11].calls,data[12].calls,data[13].calls,data[14].calls,data[15].calls,data[16].calls,data[17].calls,data[18].calls,data[19].calls,data[20].calls,data[21].calls,data[22].calls,data[23].calls,data[24].calls,data[25].calls,data[26].calls,data[27].calls,data[28].calls,data[29].calls,data[30].calls,data[31].calls,data[32].calls,data[33].calls,data[34].calls,data[35].calls,data[36].calls,data[37].calls,data[38].calls,data[39].calls,data[40].calls,data[41].calls,data[42].calls,data[43].calls,data[44].calls,data[45].calls,data[46].calls,data[47].calls,data[48].calls,data[49].calls,data[50].calls,data[51].calls,data[52].calls,data[53].calls,data[54].calls,data[55].calls,data[56].calls,data[57].calls,data[58].calls]
            ]
        });
    });
    
    $.ajax({
      url: '/api/aht', 
      dataType: 'json', 
    })
    .done(function(data) { 
            aht.load({
            columns: [
                ['x', data[0].minute, data[1].minute, data[2].minute, data[3].minute,data[4].minute,data[5].minute,data[6].minute,data[7].minute,data[8].minute,data[9].minute,data[10].minute,data[11].minute,data[12].minute,data[13].minute,data[14].minute,data[15].minute,data[16].minute,data[17].minute,data[18].minute,data[19].minute,data[20].minute,data[21].minute,data[22].minute,data[23].minute,data[24].minute,data[25].minute,data[26].minute,data[27].minute,data[28].minute,data[29].minute,data[30].minute,data[31].minute,data[32].minute,data[33].minute,data[34].minute,data[35].minute,data[36].minute,data[37].minute,data[38].minute,data[39].minute,data[40].minute,data[41].minute,data[42].minute,data[43].minute,data[44].minute,data[45].minute,data[46].minute,data[47].minute,data[48].minute,data[49].minute,data[50].minute,data[51].minute,data[52].minute,data[53].minute,data[54].minute,data[55].minute,data[56].minute,data[57].minute,data[58].minute,data[59].minute],
                ['Total Seconds', data[0].totalseconds,data[1].totalseconds,data[2].totalseconds,data[3].totalseconds,data[4].totalseconds,data[5].totalseconds,data[6].totalseconds,data[7].totalseconds,data[8].totalseconds,data[9].totalseconds,data[10].totalseconds,data[11].totalseconds,data[12].totalseconds,data[13].totalseconds,data[14].totalseconds,data[15].totalseconds,data[16].totalseconds,data[17].totalseconds,data[18].totalseconds,data[19].totalseconds,data[20].totalseconds,data[21].totalseconds,data[22].totalseconds,data[23].totalseconds,data[24].totalseconds,data[25].totalseconds,data[26].totalseconds,data[27].totalseconds,data[28].totalseconds,data[29].totalseconds,data[30].totalseconds,data[31].totalseconds,data[32].totalseconds,data[33].totalseconds,data[34].totalseconds,data[35].totalseconds,data[36].totalseconds,data[37].totalseconds,data[38].totalseconds,data[39].totalseconds,data[40].totalseconds,data[41].totalseconds,data[42].totalseconds,data[43].totalseconds,data[44].totalseconds,data[45].totalseconds,data[46].totalseconds,data[47].totalseconds,data[48].totalseconds,data[49].totalseconds,data[50].totalseconds,data[51].totalseconds,data[52].totalseconds,data[53].totalseconds,data[54].totalseconds,data[55].totalseconds,data[56].totalseconds,data[57].totalseconds,data[58].totalseconds]
            ]
        });
    });
    
    $.ajax({
      url: '/api/avg', 
      dataType: 'json', 
    })
    .done(function(data) { 
            avg.load({
            columns: [
                ['x', data[0].minute, data[1].minute, data[2].minute, data[3].minute,data[4].minute,data[5].minute,data[6].minute,data[7].minute,data[8].minute,data[9].minute,data[10].minute,data[11].minute,data[12].minute,data[13].minute,data[14].minute,data[15].minute,data[16].minute,data[17].minute,data[18].minute,data[19].minute,data[20].minute,data[21].minute,data[22].minute,data[23].minute,data[24].minute,data[25].minute,data[26].minute,data[27].minute,data[28].minute,data[29].minute,data[30].minute,data[31].minute,data[32].minute,data[33].minute,data[34].minute,data[35].minute,data[36].minute,data[37].minute,data[38].minute,data[39].minute,data[40].minute,data[41].minute,data[42].minute,data[43].minute,data[44].minute,data[45].minute,data[46].minute,data[47].minute,data[48].minute,data[49].minute,data[50].minute,data[51].minute,data[52].minute,data[53].minute,data[54].minute,data[55].minute,data[56].minute,data[57].minute,data[58].minute,data[59].minute],
                ['Average Seconds', data[0].avgseconds,data[1].avgseconds,data[2].avgseconds,data[3].avgseconds,data[4].avgseconds,data[5].avgseconds,data[6].avgseconds,data[7].avgseconds,data[8].avgseconds,data[9].avgseconds,data[10].avgseconds,data[11].avgseconds,data[12].avgseconds,data[13].avgseconds,data[14].avgseconds,data[15].avgseconds,data[16].avgseconds,data[17].avgseconds,data[18].avgseconds,data[19].avgseconds,data[20].avgseconds,data[21].avgseconds,data[22].avgseconds,data[23].avgseconds,data[24].avgseconds,data[25].avgseconds,data[26].avgseconds,data[27].avgseconds,data[28].avgseconds,data[29].avgseconds,data[30].avgseconds,data[31].avgseconds,data[32].avgseconds,data[33].avgseconds,data[34].avgseconds,data[35].avgseconds,data[36].avgseconds,data[37].avgseconds,data[38].avgseconds,data[39].avgseconds,data[40].avgseconds,data[41].avgseconds,data[42].avgseconds,data[43].avgseconds,data[44].avgseconds,data[45].avgseconds,data[46].avgseconds,data[47].avgseconds,data[48].avgseconds,data[49].avgseconds,data[50].avgseconds,data[51].avgseconds,data[52].avgseconds,data[53].avgseconds,data[54].avgseconds,data[55].avgseconds,data[56].avgseconds,data[57].avgseconds,data[58].avgseconds]
            ]
        });
    });
};


updateGraphs();

setInterval(function(){
    updateGraphs();
}, 30000);

var AppViewModel = function() {
    self.callsnow = ko.observable();

    var CurrentCalls = function() {
    $.ajax({
          url: '/api/now', 
          dataType: 'json', 
        })
        .done(function(data) { 
            self.callsnow(data[0].current);
        });
    };
    
    CurrentCalls();
    
    setInterval(function(){
        CurrentCalls();
    }, 5000);
}

ko.applyBindings(new AppViewModel());


