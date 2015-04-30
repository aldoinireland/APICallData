//Setup Environment
var AppViewModel = function() {
    self.callsnow = ko.observable();
    self.nowwtfrd = ko.observable();
    self.nowwex = ko.observable();
    self.nowcvn = ko.observable();
    self.callsgraph = ko.observable("bar");
    self.btnall = ko.observable(true);
    self.btnwtfrd = ko.observable(false);
    self.btnwex = ko.observable(false);
    self.btncvn = ko.observable(false);
    self.sumgraph = ko.observable("spline");
    self.btnallsum = ko.observable(true);
    self.btnwtfrdsum = ko.observable(false);
    self.btnwexsum = ko.observable(false);
    self.btncvnsum = ko.observable(false);
    self.avggraph = ko.observable("area-spline");
    self.btnallavg = ko.observable(true);
    self.btnwtfrdavg = ko.observable(false);
    self.btnwexavg = ko.observable(false);
    self.btncvnavg = ko.observable(false);
    //Retrieval of Current Calls per SIte
    var CurrentCalls = function() {
        
    $.ajax({
          url: '/api/now', 
          dataType: 'json', 
        })
        .done(function(data) { 
            self.callsnow(data[0].current);
        });
        
        $.ajax({
          url: '/api/nowwtfrd', 
          dataType: 'json', 
        })
        .done(function(data) { 
            self.nowwtfrd(data[0].current);
        });
        
        $.ajax({
          url: '/api/nowwex', 
          dataType: 'json', 
        })
        .done(function(data) { 
            self.nowwex(data[0].current);
        });
        
        $.ajax({
          url: '/api/nowcvn', 
          dataType: 'json', 
        })
        .done(function(data) { 
            self.nowcvn(data[0].current);
        });
        
    };
    
    //Inital Current Call Population
    CurrentCalls();
    
    //Setting up Current Calls Polling
    setInterval(function(){
        CurrentCalls();
    }, 5000);
    
    //Subscriptions
    self.btnall.subscribe(function(btnall) {
        chart.toggle(['Calls Taken Craigavon', 'Calls Taken Wexford', 'Calls Taken Waterford']);
    }.bind(self));
    self.btnwtfrd.subscribe(function(btnwtfrd) {
        chart.toggle(['Calls Taken Waterford']);
    }.bind(self));
    self.btnwex.subscribe(function(btnwex) {
        chart.toggle(['Calls Taken Wexford']);
    }.bind(self));
    self.btncvn.subscribe(function(btncvn) {
        chart.toggle(['Calls Taken Craigavon']);
    }.bind(self));
    self.btnallsum.subscribe(function(btnallsum) {
        aht.toggle(['Total Seconds Craigavon', 'Total Seconds Wexford', 'Total Seconds Waterford']);
    }.bind(self));
    self.btnwtfrdsum.subscribe(function(btnwtfrdsum) {
        aht.toggle(['Total Seconds Waterford']);
    }.bind(self));
    self.btnwexsum.subscribe(function(btnwexsum) {
        aht.toggle(['Total Seconds Wexford']);
    }.bind(self));
    self.btncvnsum.subscribe(function(btncvnsum) {
        aht.toggle(['Total Seconds Craigavon']);
    }.bind(self));
    self.btnallavg.subscribe(function(btnallavg) {
        avg.toggle(['Average Seconds Craigavon', 'Average Seconds Wexford', 'Average Seconds Waterford']);
    }.bind(self));
    self.btnwtfrdavg.subscribe(function(btnwtfrdavg) {
        avg.toggle(['Average Seconds Waterford']);
    }.bind(self));
    self.btnwexavg.subscribe(function(btnwexsumavg) {
        avg.toggle(['Average Seconds Wexford']);
    }.bind(self));
    self.btncvnavg.subscribe(function(btncvnavg) {
        avg.toggle(['Average Seconds Craigavon']);
    }.bind(self));
};

ko.applyBindings(new AppViewModel());

//Call Volume Click Events
$("#totalgraph").change(function() {
    if($('#totalgraph :selected').text() == "Bar"){
      self.callsgraph("bar");
    }
    if($('#totalgraph :selected').text() == "Line"){
      self.callsgraph("line");
    }
    if($('#totalgraph :selected').text() == "Area"){
      self.callsgraph("area");
    }
    if($('#totalgraph :selected').text() == "Area Spline"){
      self.callsgraph("area-spline");
    }
    if($('#totalgraph :selected').text() == "Step"){
      self.callsgraph("step");
    }
    if($('#totalgraph :selected').text() == "Step Area"){
      self.callsgraph("area-step");
    }
    if($('#totalgraph :selected').text() == "Spline"){
      self.callsgraph("spline");
    }
    if($('#totalgraph :selected').text() == "Scatter"){
      self.callsgraph("scatter");
    }
    
    chart.transform(self.callsgraph());
});
$("#sumgraph").change(function() {
    if($('#sumgraph :selected').text() == "Bar"){
      self.sumgraph("bar");
    }
    if($('#sumgraph :selected').text() == "Line"){
      self.sumgraph("line");
    }
    if($('#sumgraph :selected').text() == "Area"){
      self.sumgraph("area");
    }
    if($('#sumgraph :selected').text() == "Area Spline"){
      self.sumgraph("area-spline");
    }
    if($('#sumgraph :selected').text() == "Step"){
      self.sumgraph("step");
    }
    if($('#sumgraph :selected').text() == "Step Area"){
      self.sumgraph("area-step");
    }
    if($('#sumgraph :selected').text() == "Spline"){
      self.sumgraph("spline");
    }
    if($('#sumgraph :selected').text() == "Scatter"){
      self.sumgraph("scatter");
    }
    
    aht.transform(self.sumgraph());
});
$("#avggraph").change(function() {
    if($('#avggraph :selected').text() == "Bar"){
      self.avggraph("bar");
    }
    if($('#avggraph :selected').text() == "Line"){
      self.avggraph("line");
    }
    if($('#avggraph :selected').text() == "Area"){
      self.avggraph("area");
    }
    if($('#avggraph :selected').text() == "Area Spline"){
      self.avggraph("area-spline");
    }
    if($('#avggraph :selected').text() == "Step"){
      self.avggraph("step");
    }
    if($('#avggraph :selected').text() == "Step Area"){
      self.avggraph("area-step");
    }
    if($('#avggraph :selected').text() == "Spline"){
      self.avggraph("spline");
    }
    if($('#avggraph :selected').text() == "Scatter"){
      self.avggraph("scatter");
    }
    
    avg.transform(self.avggraph());
});
$("#btnall").click(function(){
    if(!self.btnall()){
        self.btnall(true);
        self.btnwtfrd(false);
        self.btnwex(false);
        self.btncvn(false);
    }
});
$("#btnwtfrd").click(function(){
    if(self.btnwtfrd()){
        self.btnwtfrd(false);
    } else {
        self.btnwtfrd(true);
        if(self.btnall){
            self.btnall(false);
        }
    }
});
$("#btnwex").click(function(){
    if(self.btnwex()){
        self.btnwex(false);
    } else {
        self.btnwex(true);
        if(self.btnall){
            self.btnall(false);
        }
    }
});
$("#btncvn").click(function(){
    if(self.btncvn()){
        self.btncvn(false);
    } else {
        self.btncvn(true);
        if(self.btnall){
            self.btnall(false);
        }
    }
});
$("#btnallsum").click(function(){
    if(!self.btnallsum()){
        self.btnallsum(true);
        self.btnwtfrdsum(false);
        self.btnwexsum(false);
        self.btncvnsum(false);
    }
});
$("#btnwtfrdsum").click(function(){
    if(self.btnwtfrdsum()){
        self.btnwtfrdsum(false);
    } else {
        self.btnwtfrdsum(true);
        if(self.btnallsum){
            self.btnallsum(false);
        }
    }
});
$("#btnwexsum").click(function(){
    if(self.btnwexsum()){
        self.btnwexsum(false);
    } else {
        self.btnwexsum(true);
        if(self.btnallsum){
            self.btnallsum(false);
        }
    }
});
$("#btncvnsum").click(function(){
    if(self.btncvnsum()){
        self.btncvnsum(false);
    } else {
        self.btncvnsum(true);
        if(self.btnallsum){
            self.btnallsum(false);
        }
    }
});
$("#btnallavg").click(function(){
    if(!self.btnallavg()){
        self.btnallavg(true);
        self.btnwtfrdavg(false);
        self.btnwexavg(false);
        self.btncvnavg(false);
    }
});
$("#btnwtfrdavg").click(function(){
    if(self.btnwtfrdavg()){
        self.btnwtfrdavg(false);
    } else {
        self.btnwtfrdavg(true);
        if(self.btnallavg){
            self.btnallavg(false);
        }
    }
});
$("#btnwexavg").click(function(){
    if(self.btnwexavg()){
        self.btnwexavg(false);
    } else {
        self.btnwexavg(true);
        if(self.btnallavg){
            self.btnallavg(false);
        }
    }
});
$("#btncvnavg").click(function(){
    if(self.btncvnavg()){
        self.btncvnavg(false);
    } else {
        self.btncvnavg(true);
        if(self.btnallavg){
            self.btnallavg(false);
        }
    }
});

//Clearing Initial Loading Notices
$('#loadingtotal').hide();
$('#loadingsum').hide();
$('#loadingavg').hide();

//Creating Charts
var chart = c3.generate({
    bindto: '#chart',
    zoom: {
        enabled: true
    },
    padding: {
      bottom: 20
    },
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
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
            'Calls Taken Waterford' : '#586949'
        },
        x : 'x',
        columns: [
            ['x', '0'],
            ['Calls Taken Waterford', 0],
            ['Calls Taken Wexford', 0],
            ['Calls Taken Craigavon', 0]
        ],
        type: self.callsgraph(),
        groups: [
            ['Calls Taken Waterford', 'Calls Taken Wexford', 'Calls Taken Craigavon']
        ]
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
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
    data: {
        selection: {
            draggable: true
        },
        colors: {
            'Total Seconds Waterford' : '#586949'
        },
        x : 'x',
        columns: [
            ['x', '0'],
            ['Total Seconds Waterford', 0],
            ['Total Seconds Wexford', 0],
            ['Total Seconds Craigavon', 0]
        ],
        type: self.sumgraph(),
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
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
    zoom: {
        enabled: true
    },
    data: {
        selection: {
            draggable: true
        },
        colors: {
            'Average Seconds Waterford' : '#586949'
        },
        x : 'x',
        columns: [
            ['x', '0'],
            ['Average Seconds Waterford', 0],
            ['Average Seconds Wexford', 0],
            ['Average Seconds Craigavon', 0]
        ],
        type: self.avggraph(),        
        types: {
            'Average Seconds' : 'area-spline'
        }
    },
    axis: {
        x: {
            type: 'category'
        },
        y: {
            min: 100
        }
    }
});

//Methods for loading Chart Data
var updateVolumes = function() {
    $('#loadingtotal').show();
    $.ajax({
      url: '/api/calls', 
      dataType: 'json', 
    })
    .done(function(data) { 
            chart.load({
                columns: [
                    ['x', data[0].minute, data[1].minute, data[2].minute, data[3].minute,data[4].minute,data[5].minute,data[6].minute,data[7].minute,data[8].minute,data[9].minute,data[10].minute,data[11].minute,data[12].minute,data[13].minute,data[14].minute,data[15].minute,data[16].minute,data[17].minute,data[18].minute,data[19].minute,data[20].minute,data[21].minute,data[22].minute,data[23].minute,data[24].minute,data[25].minute,data[26].minute,data[27].minute,data[28].minute,data[29].minute,data[30].minute,data[31].minute,data[32].minute,data[33].minute,data[34].minute,data[35].minute,data[36].minute,data[37].minute,data[38].minute,data[39].minute,data[40].minute,data[41].minute,data[42].minute,data[43].minute,data[44].minute,data[45].minute,data[46].minute,data[47].minute,data[48].minute,data[49].minute,data[50].minute,data[51].minute,data[52].minute,data[53].minute,data[54].minute,data[55].minute,data[56].minute,data[57].minute,data[58].minute,data[59].minute],
                    ['Calls Taken Waterford', data[0].wtfd,data[1].wtfd,data[2].wtfd,data[3].wtfd,data[4].wtfd,data[5].wtfd,data[6].wtfd,data[7].wtfd,data[8].wtfd,data[9].wtfd,data[10].wtfd,data[11].wtfd,data[12].wtfd,data[13].wtfd,data[14].wtfd,data[15].wtfd,data[16].wtfd,data[17].wtfd,data[18].wtfd,data[19].wtfd,data[20].wtfd,data[21].wtfd,data[22].wtfd,data[23].wtfd,data[24].wtfd,data[25].wtfd,data[26].wtfd,data[27].wtfd,data[28].wtfd,data[29].wtfd,data[30].wtfd,data[31].wtfd,data[32].wtfd,data[33].wtfd,data[34].wtfd,data[35].wtfd,data[36].wtfd,data[37].wtfd,data[38].wtfd,data[39].wtfd,data[40].wtfd,data[41].wtfd,data[42].wtfd,data[43].wtfd,data[44].wtfd,data[45].wtfd,data[46].wtfd,data[47].wtfd,data[48].wtfd,data[49].wtfd,data[50].wtfd,data[51].wtfd,data[52].wtfd,data[53].wtfd,data[54].wtfd,data[55].wtfd,data[56].wtfd,data[57].wtfd,data[58].wtfd],
                    ['Calls Taken Wexford', data[0].wex,data[1].wex,data[2].wex,data[3].wex,data[4].wex,data[5].wex,data[6].wex,data[7].wex,data[8].wex,data[9].wex,data[10].wex,data[11].wex,data[12].wex,data[13].wex,data[14].wex,data[15].wex,data[16].wex,data[17].wex,data[18].wex,data[19].wex,data[20].wex,data[21].wex,data[22].wex,data[23].wex,data[24].wex,data[25].wex,data[26].wex,data[27].wex,data[28].wex,data[29].wex,data[30].wex,data[31].wex,data[32].wex,data[33].wex,data[34].wex,data[35].wex,data[36].wex,data[37].wex,data[38].wex,data[39].wex,data[40].wex,data[41].wex,data[42].wex,data[43].wex,data[44].wex,data[45].wex,data[46].wex,data[47].wex,data[48].wex,data[49].wex,data[50].wex,data[51].wex,data[52].wex,data[53].wex,data[54].wex,data[55].wex,data[56].wex,data[57].wex,data[58].wex],
                    ['Calls Taken Craigavon', data[0].cvn,data[1].cvn,data[2].cvn,data[3].cvn,data[4].cvn,data[5].cvn,data[6].cvn,data[7].cvn,data[8].cvn,data[9].cvn,data[10].cvn,data[11].cvn,data[12].cvn,data[13].cvn,data[14].cvn,data[15].cvn,data[16].cvn,data[17].cvn,data[18].cvn,data[19].cvn,data[20].cvn,data[21].cvn,data[22].cvn,data[23].cvn,data[24].cvn,data[25].cvn,data[26].cvn,data[27].cvn,data[28].cvn,data[29].cvn,data[30].cvn,data[31].cvn,data[32].cvn,data[33].cvn,data[34].cvn,data[35].cvn,data[36].cvn,data[37].cvn,data[38].cvn,data[39].cvn,data[40].cvn,data[41].cvn,data[42].cvn,data[43].cvn,data[44].cvn,data[45].cvn,data[46].cvn,data[47].cvn,data[48].cvn,data[49].cvn,data[50].cvn,data[51].cvn,data[52].cvn,data[53].cvn,data[54].cvn,data[55].cvn,data[56].cvn,data[57].cvn,data[58].cvn]
                ]
            });
    })
    .always(function(){
        $('#loadingtotal').hide();
    });
};
var updateSums = function() {
        $('#loadingsum').show();
    $.ajax({
      url: '/api/sum', 
      dataType: 'json', 
    })
    .done(function(data) { 
        aht.load({
            columns: [
                ['x', data[0].minute, data[1].minute, data[2].minute, data[3].minute,data[4].minute,data[5].minute,data[6].minute,data[7].minute,data[8].minute,data[9].minute,data[10].minute,data[11].minute,data[12].minute,data[13].minute,data[14].minute,data[15].minute,data[16].minute,data[17].minute,data[18].minute,data[19].minute,data[20].minute,data[21].minute,data[22].minute,data[23].minute,data[24].minute,data[25].minute,data[26].minute,data[27].minute,data[28].minute,data[29].minute,data[30].minute,data[31].minute,data[32].minute,data[33].minute,data[34].minute,data[35].minute,data[36].minute,data[37].minute,data[38].minute,data[39].minute,data[40].minute,data[41].minute,data[42].minute,data[43].minute,data[44].minute,data[45].minute,data[46].minute,data[47].minute,data[48].minute,data[49].minute,data[50].minute,data[51].minute,data[52].minute,data[53].minute,data[54].minute,data[55].minute,data[56].minute,data[57].minute,data[58].minute,data[59].minute],
                ['Total Seconds Waterford', data[0].wtfrdsum,data[1].wtfrdsum,data[2].wtfrdsum,data[3].wtfrdsum,data[4].wtfrdsum,data[5].wtfrdsum,data[6].wtfrdsum,data[7].wtfrdsum,data[8].wtfrdsum,data[9].wtfrdsum,data[10].wtfrdsum,data[11].wtfrdsum,data[12].wtfrdsum,data[13].wtfrdsum,data[14].wtfrdsum,data[15].wtfrdsum,data[16].wtfrdsum,data[17].wtfrdsum,data[18].wtfrdsum,data[19].wtfrdsum,data[20].wtfrdsum,data[21].wtfrdsum,data[22].wtfrdsum,data[23].wtfrdsum,data[24].wtfrdsum,data[25].wtfrdsum,data[26].wtfrdsum,data[27].wtfrdsum,data[28].wtfrdsum,data[29].wtfrdsum,data[30].wtfrdsum,data[31].wtfrdsum,data[32].wtfrdsum,data[33].wtfrdsum,data[34].wtfrdsum,data[35].wtfrdsum,data[36].wtfrdsum,data[37].wtfrdsum,data[38].wtfrdsum,data[39].wtfrdsum,data[40].wtfrdsum,data[41].wtfrdsum,data[42].wtfrdsum,data[43].wtfrdsum,data[44].wtfrdsum,data[45].wtfrdsum,data[46].wtfrdsum,data[47].wtfrdsum,data[48].wtfrdsum,data[49].wtfrdsum,data[50].wtfrdsum,data[51].wtfrdsum,data[52].wtfrdsum,data[53].wtfrdsum,data[54].wtfrdsum,data[55].wtfrdsum,data[56].wtfrdsum,data[57].wtfrdsum,data[58].wtfrdsum],
                ['Total Seconds Wexford', data[0].wexsum,data[1].wexsum,data[2].wexsum,data[3].wexsum,data[4].wexsum,data[5].wexsum,data[6].wexsum,data[7].wexsum,data[8].wexsum,data[9].wexsum,data[10].wexsum,data[11].wexsum,data[12].wexsum,data[13].wexsum,data[14].wexsum,data[15].wexsum,data[16].wexsum,data[17].wexsum,data[18].wexsum,data[19].wexsum,data[20].wexsum,data[21].wexsum,data[22].wexsum,data[23].wexsum,data[24].wexsum,data[25].wexsum,data[26].wexsum,data[27].wexsum,data[28].wexsum,data[29].wexsum,data[30].wexsum,data[31].wexsum,data[32].wexsum,data[33].wexsum,data[34].wexsum,data[35].wexsum,data[36].wexsum,data[37].wexsum,data[38].wexsum,data[39].wexsum,data[40].wexsum,data[41].wexsum,data[42].wexsum,data[43].wexsum,data[44].wexsum,data[45].wexsum,data[46].wexsum,data[47].wexsum,data[48].wexsum,data[49].wexsum,data[50].wexsum,data[51].wexsum,data[52].wexsum,data[53].wexsum,data[54].wexsum,data[55].wexsum,data[56].wexsum,data[57].wexsum,data[58].wexsum],
                ['Total Seconds Craigavon', data[0].cvnsum,data[1].cvnsum,data[2].cvnsum,data[3].cvnsum,data[4].cvnsum,data[5].cvnsum,data[6].cvnsum,data[7].cvnsum,data[8].cvnsum,data[9].cvnsum,data[10].cvnsum,data[11].cvnsum,data[12].cvnsum,data[13].cvnsum,data[14].cvnsum,data[15].cvnsum,data[16].cvnsum,data[17].cvnsum,data[18].cvnsum,data[19].cvnsum,data[20].cvnsum,data[21].cvnsum,data[22].cvnsum,data[23].cvnsum,data[24].cvnsum,data[25].cvnsum,data[26].cvnsum,data[27].cvnsum,data[28].cvnsum,data[29].cvnsum,data[30].cvnsum,data[31].cvnsum,data[32].cvnsum,data[33].cvnsum,data[34].cvnsum,data[35].cvnsum,data[36].cvnsum,data[37].cvnsum,data[38].cvnsum,data[39].cvnsum,data[40].cvnsum,data[41].cvnsum,data[42].cvnsum,data[43].cvnsum,data[44].cvnsum,data[45].cvnsum,data[46].cvnsum,data[47].cvnsum,data[48].cvnsum,data[49].cvnsum,data[50].cvnsum,data[51].cvnsum,data[52].cvnsum,data[53].cvnsum,data[54].cvnsum,data[55].cvnsum,data[56].cvnsum,data[57].cvnsum,data[58].cvnsum]
            ]
        });
    })
    .always(function(){
        $('#loadingsum').hide();
    });
}
var updateAvg = function() {
        $('#loadingavg').show();
    $.ajax({
      url: '/api/avg', 
      dataType: 'json', 
    })
    .done(function(data) { 
        avg.load({
            columns: [
                ['x', data[0].minute, data[1].minute, data[2].minute, data[3].minute,data[4].minute,data[5].minute,data[6].minute,data[7].minute,data[8].minute,data[9].minute,data[10].minute,data[11].minute,data[12].minute,data[13].minute,data[14].minute,data[15].minute,data[16].minute,data[17].minute,data[18].minute,data[19].minute,data[20].minute,data[21].minute,data[22].minute,data[23].minute,data[24].minute,data[25].minute,data[26].minute,data[27].minute,data[28].minute,data[29].minute,data[30].minute,data[31].minute,data[32].minute,data[33].minute,data[34].minute,data[35].minute,data[36].minute,data[37].minute,data[38].minute,data[39].minute,data[40].minute,data[41].minute,data[42].minute,data[43].minute,data[44].minute,data[45].minute,data[46].minute,data[47].minute,data[48].minute,data[49].minute,data[50].minute,data[51].minute,data[52].minute,data[53].minute,data[54].minute,data[55].minute,data[56].minute,data[57].minute,data[58].minute,data[59].minute],
                ['Average Seconds Waterford', data[0].wtfrdavg,data[1].wtfrdavg,data[2].wtfrdavg,data[3].wtfrdavg,data[4].wtfrdavg,data[5].wtfrdavg,data[6].wtfrdavg,data[7].wtfrdavg,data[8].wtfrdavg,data[9].wtfrdavg,data[10].wtfrdavg,data[11].wtfrdavg,data[12].wtfrdavg,data[13].wtfrdavg,data[14].wtfrdavg,data[15].wtfrdavg,data[16].wtfrdavg,data[17].wtfrdavg,data[18].wtfrdavg,data[19].wtfrdavg,data[20].wtfrdavg,data[21].wtfrdavg,data[22].wtfrdavg,data[23].wtfrdavg,data[24].wtfrdavg,data[25].wtfrdavg,data[26].wtfrdavg,data[27].wtfrdavg,data[28].wtfrdavg,data[29].wtfrdavg,data[30].wtfrdavg,data[31].wtfrdavg,data[32].wtfrdavg,data[33].wtfrdavg,data[34].wtfrdavg,data[35].wtfrdavg,data[36].wtfrdavg,data[37].wtfrdavg,data[38].wtfrdavg,data[39].wtfrdavg,data[40].wtfrdavg,data[41].wtfrdavg,data[42].wtfrdavg,data[43].wtfrdavg,data[44].wtfrdavg,data[45].wtfrdavg,data[46].wtfrdavg,data[47].wtfrdavg,data[48].wtfrdavg,data[49].wtfrdavg,data[50].wtfrdavg,data[51].wtfrdavg,data[52].wtfrdavg,data[53].wtfrdavg,data[54].wtfrdavg,data[55].wtfrdavg,data[56].wtfrdavg,data[57].wtfrdavg,data[58].wtfrdavg],
                ['Average Seconds Wexford', data[0].wexavg,data[1].wexavg,data[2].wexavg,data[3].wexavg,data[4].wexavg,data[5].wexavg,data[6].wexavg,data[7].wexavg,data[8].wexavg,data[9].wexavg,data[10].wexavg,data[11].wexavg,data[12].wexavg,data[13].wexavg,data[14].wexavg,data[15].wexavg,data[16].wexavg,data[17].wexavg,data[18].wexavg,data[19].wexavg,data[20].wexavg,data[21].wexavg,data[22].wexavg,data[23].wexavg,data[24].wexavg,data[25].wexavg,data[26].wexavg,data[27].wexavg,data[28].wexavg,data[29].wexavg,data[30].wexavg,data[31].wexavg,data[32].wexavg,data[33].wexavg,data[34].wexavg,data[35].wexavg,data[36].wexavg,data[37].wexavg,data[38].wexavg,data[39].wexavg,data[40].wexavg,data[41].wexavg,data[42].wexavg,data[43].wexavg,data[44].wexavg,data[45].wexavg,data[46].wexavg,data[47].wexavg,data[48].wexavg,data[49].wexavg,data[50].wexavg,data[51].wexavg,data[52].wexavg,data[53].wexavg,data[54].wexavg,data[55].wexavg,data[56].wexavg,data[57].wexavg,data[58].wexavg],
                ['Average Seconds Craigavon', data[0].cvnavg,data[1].cvnavg,data[2].cvnavg,data[3].cvnavg,data[4].cvnavg,data[5].cvnavg,data[6].cvnavg,data[7].cvnavg,data[8].cvnavg,data[9].cvnavg,data[10].cvnavg,data[11].cvnavg,data[12].cvnavg,data[13].cvnavg,data[14].cvnavg,data[15].cvnavg,data[16].cvnavg,data[17].cvnavg,data[18].cvnavg,data[19].cvnavg,data[20].cvnavg,data[21].cvnavg,data[22].cvnavg,data[23].cvnavg,data[24].cvnavg,data[25].cvnavg,data[26].cvnavg,data[27].cvnavg,data[28].cvnavg,data[29].cvnavg,data[30].cvnavg,data[31].cvnavg,data[32].cvnavg,data[33].cvnavg,data[34].cvnavg,data[35].cvnavg,data[36].cvnavg,data[37].cvnavg,data[38].cvnavg,data[39].cvnavg,data[40].cvnavg,data[41].cvnavg,data[42].cvnavg,data[43].cvnavg,data[44].cvnavg,data[45].cvnavg,data[46].cvnavg,data[47].cvnavg,data[48].cvnavg,data[49].cvnavg,data[50].cvnavg,data[51].cvnavg,data[52].cvnavg,data[53].cvnavg,data[54].cvnavg,data[55].cvnavg,data[56].cvnavg,data[57].cvnavg,data[58].cvnavg]
            ]
        });
    })
    .always(function(){
        $('#loadingavg').hide();
    });
}

//Initial Population of Graphs
updateVolumes();
updateSums();
updateAvg();

//Setting Up Async Data Pulls
setInterval(function(){
    updateVolumes();
}, 30000);
setInterval(function(){
    updateSums();
}, 30000);
setInterval(function(){
    updateAvg();
}, 30000);



