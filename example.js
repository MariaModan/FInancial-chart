var seriesOptions = [],
    seriesCounter = 0,
    names = ['AMZN', 'AAPL', 'GOOG'];


function createChart() {

    Highcharts.stockChart('container', {

        rangeSelector: {
            enabled: true,
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'grey'
            }]
        },

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },

        series: seriesOptions
    });
}


let AMZNdata = [];
let GOOGLdata = [];
let DISdata = [];


function dateToTimestamp (date){
    return(new Date(date).getTime());
}

function loadDataInArray (arr, data){
    let obj = data["Time Series (Daily)"];
    Object.keys(obj).forEach( key => {
        arr.push([dateToTimestamp(key), parseFloat(obj[key]['4. close'])])  
    });
    return arr;
}

fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMZN&outputsize=compact&apikey=9E0Z7UEECE50GTB5')
.then(response => response.json())
.then(data => {
    AMZNdata = loadDataInArray(AMZNdata, data);
    seriesOptions.push({name: 'AMAZN', data:AMZNdata})
})
.catch(err => console.log(err))


fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&outputsize=compact&apikey=9E0Z7UEECE50GTB5')
.then(response => response.json())
.then(data => {
    GOOGLdata = loadDataInArray(GOOGLdata, data);
    seriesOptions.push({name: 'GOOGL', data:GOOGLdata})
    createChart();
})
.catch(err => console.log(err))

fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DIS&outputsize=compact&apikey=9E0Z7UEECE50GTB5')
.then(response => response.json())
.then(data => {
    DISata = loadDataInArray(DISdata, data);
    seriesOptions.push({name: 'DIS', data:DISdata})
    createChart();
})
.catch(err => console.log(err))





