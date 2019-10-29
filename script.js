let seriesOptions = [];
let AMZNdata = [];
let GOOGLdata = [];
let DISdata = [];
let counter = 0;

function createChart() {

    chart = Highcharts.stockChart('container', {

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

        series: seriesOptions,
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
    if(counter === 3) {
        Highcharts.setOptions(darkTheme);
        createChart();
    }
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


//Changing the chart theme

let darkBtn = document.getElementById('darktheme-btn');
let lightBtn = document.getElementById('lighttheme-btn');

darkBtn.addEventListener('click', ()=>{
    chart.destroy();
    Highcharts.setOptions(darkTheme);
    createChart();
})

lightBtn.addEventListener('click', ()=>{
    chart.destroy();
    Highcharts.setOptions(lightTheme);
    createChart();
})

const darkTheme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },
    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },
    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    }
};

const lightTheme = {
    colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
        '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: 'Signika, serif'
        }
    },
    title: {
        style: {
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    },
    subtitle: {
        style: {
            color: 'black'
        }
    },
    tooltip: {
        borderWidth: 0
    },
    labels: {
        style: {
            color: '#6e6e70'
        }
    },
    legend: {
        backgroundColor: '#E0E0E8',
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    yAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#404048'
        },
        map: {
            shadow: false
        }
    },
    // Highstock specific
    navigator: {
        xAxis: {
            gridLineColor: '#D0D0D8'
        }
    },
    rangeSelector: {
        buttonTheme: {
            fill: 'white',
            stroke: '#C0C0C8',
            'stroke-width': 1,
            states: {
                select: {
                    fill: '#D0D0D8'
                }
            }
        }
    },
    scrollbar: {
        trackBorderColor: '#C0C0C8'
    }
  };