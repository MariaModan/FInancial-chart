let seriesOptions = [];
let AMZNdata = [];
let GOOGLdata = [];
let DISdata = [];
let counter = 0;

function createChart() {

    Highcharts.stockChart('container', {

        rangeSelector: {
            enabled: true,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1m'
            },{                
                type: 'all',
                text: 'All'
            }],
            inputEnabled: true
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
                compare: 'value',
                compareStart:true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 3,
            split: true
        },

        series: seriesOptions
    });
}



function dateToTimestamp (date){
    return (Date.parse(date));
}

//aranging the data in the correct format, a nested array with dates in Unix timestamp and the stock price at clsoe for each of the 100 days
function loadDataInArray (arr, data){
    if(data.hasOwnProperty('Note')){
        alert('The API can make only 5 calls a minute, please try again in 1 minute')
    };
    let obj = data["Time Series (Daily)"];
    Object.keys(obj).forEach( key => {
        arr.push([dateToTimestamp(key), parseFloat(obj[key]['4. close'])])  
    });
    return arr;
}

//the createChart function will run only when we have all 3 pieces of data
function loadChart() {
    return counter === 3 ? createChart() : null;
}

//get stock data for Amazon for the past 100 days
fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMZN&outputsize=compact&apikey=9E0Z7UEECE50GTB5')
.then(response => response.json())
.then(data => {
    AMZNdata = loadDataInArray(AMZNdata, data).reverse();
    seriesOptions.push({name: 'AMAZN', data:AMZNdata});
    counter++;
    loadChart();
})
.catch(err => console.log(err))

//get stock data for Google for the past 100 days
fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&outputsize=compact&apikey=9E0Z7UEECE50GTB5')
.then(response => response.json())
.then(data => {
    GOOGLdata = loadDataInArray(GOOGLdata, data).reverse();
    seriesOptions.push({name: 'GOOGL', data:GOOGLdata})
    counter++;
    loadChart();
})
.catch(err => console.log(err))

//get stock data for Disney for the past 100 days
fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DIS&outputsize=compact&apikey=9E0Z7UEECE50GTB5')
.then(response => response.json())
.then(data => {
    DISata = loadDataInArray(DISdata, data).reverse();
    seriesOptions.push({name: 'DIS', data:DISdata});
    counter++;
    loadChart();
})
.catch(err => console.log(err))


