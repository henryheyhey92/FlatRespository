const BASE_API_URL = `https://data.gov.sg/api/action/datastore_search`;
const ID_YEAR_12_14 = "83b2fc37-ce8c-4df4-968b-370fd818138b";
const ID_YEAR_15_16 = "1b702208-44bf-4829-b620-4615ee19b57c";
const ID_YEAR_17_22 = "f1765b54-a209-4718-8d38-a39237f502b3";
const CSV_YEAR_12_14 = "year12to14data.csv";
const CSV_YEAR_15_16 = "year15to16data.csv";
const CSV_YEAR_17_22 = "year17to22data.csv";
const townNameArr = ["ANG MO KIO", "BEDOK", "BISHAN", "BUKIT BATOK", "BUKIT MERAH", "BUKIT PANJANG", "BUKIT TIMAH"
    , "CENTRAL AREA", "CHOA CHU KANG", "CLEMENTI", "GEYLANG", "HOUGANG", "JURONG EAST", "JURONG WEST", "KALLANG/WHAMPOA"
    , "MARINE PARADE", "PASIR RIS", "PUNGGOL", "QUEENSTOWN", "SEMBAWANG", "SENGKANG", "SERANGOON", "TAMPINES", "TOA PAYOH"
    , "WOODLANDS", "YISHUN"];

const flatType = ["3 ROOM", "4 ROOM", "5 ROOM", "2 ROOM", "EXECUTIVE", "1 ROOM", "MULTI-GENERATION"];

const years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
const pastThreeYears = ['2019', '2020', '2021', '2022'];

const centralRegionOne = ["BISHAN", "BUKIT MERAH", "CENTRAL AREA", "GEYLANG"];
const centralRegionTwo = ["KALLANG/WHAMPOA", "MARINE PARADE", "TOA PAYOH", "QUEENSTOWN"];
const eastRegion = ["BEDOK", "PASIR RIS", "TAMPINES"];
const northRegionOne = ["SEMBAWANG", "YISHUN", "ANG MO KIO", "HOUGANG"];
const northRegionTwo = ["PUNGGOL", "SENGKANG", "SERANGOON", "WOODLANDS"];
const southRegion = ["BUKIT TIMAH"];
const westRegionOne = ["BUKIT BATOK", "BUKIT PANJANG", "CHOA CHU KANG"];
const westRegionTwo = ["CLEMENTI", "JURONG EAST", "JURONG WEST"];
const region = ["centralRegionOne", "centralRegionTwo", "eastRegion", "northRegionOne", "northRegionTwo", "southRegion", "westRegionOne", "westRegionTwo"];
const regionShort = ["central-1", "central-2", "east", "north-1", "north-2", "south", "west-1", "west-2"];




const optionsV1 = {
    chart:{
        'type': 'line',
        'height': '100%'
    },
    series:[
        //no data
    ],
    xaxis:{
        'categories': ['2012','2013','2014','2015','2016','2017', '2018', '2019', '2020', '2021', '2022']
    },
    yaxis:{
        labels: {
            formatter: function (value) {
              return "$ "+value/1000 + " k";
            }
          }
    },
    markers:{
        size:8
    },
    stroke:{
        curve:'smooth'
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: true,
        offsetY: 0,
        offsetX: 0
      },
    noData: { 
        text:"Loading..."
    }
}

const optionsByNumOfFlatType = {
    series: [

    ],
    chart:{
        type:'bar',
        height: '100%'
    },
    plotOptions:{
        bar:{
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
            dataLabels:{
                position:'top',
            },
        }
    },
    dataLabels: {
        enabled: false,
        style:{
            fontSize: '12px',
            colors:['#fff']
        }
    },
    stroke:{
        show:true,
        width: 2,
        colors: ['transparent']
    },
    xaxis:{
        categories: centralRegionOne
    },
    yaxis: {
        title:{
            text:'(number of transacted flats)'
        }
    },
    fill:{
        opacity:1
    },
    tooltip:{
       y:{
           formatter: function(val){
               return val
           }
       }
    },
    title:{
        text: "Testing 123",
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        }
    },legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: true,
        offsetY: 0,
        offsetX: 0
      },
    noData: { 
        text:"Loading..."
    }

};

const optionsPieChart = {
    chart:{
        type: 'donut',
        height:'300',
        width: '300',
        offsetX: 10,
        offsetY: 0,
        horizontalAlign: 'center'
    },
    series:[

    ],
    labels:[

    ],legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: true,
        offsetY: 0,
        offsetX: 0
      },
      responsive: [{
        breakpoint: 400,
        options: {
          chart: {
            width: 200,
            height: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
    noData:{
        text:"Loading..."
    }
}

let optionsProgressChartV1 = {
    chart: {
      height: 150,
      width: 150,
      type: "radialBar",
    },
  
    series: [],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "60%",
          background: "#293450"
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15
          }
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "9px"
          },
          value: {
            color: "#fff",
            fontSize: "20px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Flats handed"]
  };