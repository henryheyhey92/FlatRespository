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

    /*chart 1: find average resale flat pricing by location */
    let res = findByTown(resaleDataOA);
    updateTownChartFuncV1(res);

    /* chart 2: find the popular flat type */
    let popularFlatType = findByFlatType(filteredData, baseCaseLocation);
    dropDownMeun(filteredData);
    updateTownChartByFlatTypeV1(popularFlatType);


    
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

function updateTownChartFuncV1(data)
{
    townChartV1.updateSeries(data);
}

function updateTownChartByFlatTypeV1(data)
{
    flatTypeChart.updateSeries(data);
}

//const to create instance of ApexCharts
const townChartV1 = new ApexCharts(document.querySelector('#townChartV1'), optionsV1);
const flatTypeChart = new ApexCharts(document.querySelector('#flatTypeChart'), optionsV1);

//render fucntion
townChartV1.render();
flatTypeChart.render();