// async function main(){
//     let response = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=5');
//     console.log(response.data);
// }

const options = {
    chart:{
        'type': 'line',
        'height': '100%'
    },
    series:[
        //no data
    ],
    xaxis:{
        'categories': ['2017', '2018', '2019', '2020', '2021', '2022']
    },
    markers:{
        size:10
    },
    stroke:{
        curve:'smooth'
    },
    noData: {
        text:"Loading..."
    }
}


const optionsV2 = {
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
    markers:{
        size:8
    },
    stroke:{
        curve:'smooth'
    },
    noData: { 
        text:"Loading..."
    }
}

function dropDownMeun(data){
    for(let townName of townNameArr)
    {
        document.querySelector('#towns').innerHTML += '<option class="opt" value="' + townName+ '">' + townName + '</option>';
    }
    let selectedTown = document.querySelector('#towns');
    selectedTown.addEventListener('change', function(){
        console.log(selectedTown)
        let chosenTown = selectedTown.options[selectedTown.selectedIndex].value;
        let popularFlatType = findByFlatType(data, chosenTown); 
        updateTownChartByFlatTypeV1(popularFlatType);
    })

}



window.document.addEventListener('DOMContentLoaded', async function(){
    let baseCaseLocation = "ANG MO KIO";
    //axios get method
    let data = await loadData(CSV_YEAR_17_22);
    let resaleData1516 = await loadData(CSV_YEAR_15_16);
    let resaleData1214 = await loadData(CSV_YEAR_12_14);

    //combine dataset and sort data by town
    let resaleDataOA = combineAll(resaleData1214, resaleData1516, data);
    let filteredData = sortByTown(resaleDataOA);
    //console.log(filteredData.get("ANG MO KIO").length);
    //chart 1: find average resale flat pricing by location
    let res = findByTown(resaleDataOA);
    updateTownChartFuncV2(res);

    // chart 2: find the popular flat type
    let popularFlatType = findByFlatType(filteredData, baseCaseLocation);
    dropDownMeun(filteredData);
    updateTownChartByFlatTypeV1(popularFlatType);
    

    //console.log(filteredData.get("ANG MO KIO").length);
    //console.log(resaleDataOA[0][0].town);
    //console.log(resaleDataOA);

    

})

function updateOverallAvgChart(data){
    chart.updateSeries([{
            'name': 'Average Price',
            'data': data 
    }])
}

function updateTownChartFunc(data)
{
    townChart.updateSeries([{
        'name': 'Average Price',
        'data': data
    }])
}

function updateTownChartFuncV2(data)
{
    townChartV2.updateSeries(data);
}

function updateTownChartByFlatTypeV1(data)
{
    flatTypeChart.updateSeries(data);
}

// const chart = new ApexCharts(document.querySelector('#chart'), options);
// const townChart = new ApexCharts(document.querySelector('#townChart'), options);
const townChartV2 = new ApexCharts(document.querySelector('#townChartV2'), optionsV2);
const flatTypeChart = new ApexCharts(document.querySelector('#flatTypeChart'), optionsV2);
// chart.render();
// townChart.render();
townChartV2.render();
flatTypeChart.render();