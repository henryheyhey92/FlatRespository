function updateTownChartFuncV1(data)
{
    townChartV1.updateSeries(data);
}

function updateTownChartByFlatTypeV1(data)
{
    //console.log(data);
    flatTypeChart.updateSeries(data);
}

function updateFlatTypeCountV1(data, region){
    popularFlatTypeChart.updateSeries(data);
    popularFlatTypeChart.updateOptions({
        xaxis:{
            categories: region
        }
    });
}

function dropDownMeun(data){
    for(let townName of townNameArr)
    {
        document.querySelector('#towns').innerHTML += '<option class="opt" value="' + townName+ '">' + townName + '</option>';
    }
    let selectedTown = document.querySelector('#towns');
    selectedTown.addEventListener('change', function(){
        //console.log(selectedTown)
        let chosenTown = selectedTown.options[selectedTown.selectedIndex].value;
        let popularFlatType = findByFlatType(data, chosenTown); 
        updateTownChartByFlatTypeV1(popularFlatType);
    })

}

function dropDownYearMenu(data, selectedRegion){
    for(let y of years){
        document.querySelector('#year').innerHTML += '<option class="optYear" value="' +y+ '">' + y + '</option>';
    }
    let selectedYear = document.querySelector('#year');
    selectedYear.addEventListener('change', function(){
        let chosenYear = selectedYear.options[selectedYear.selectedIndex].value;
    })
}


function findSelectedRadioBtn(data, allRegionMap){
    let sr = centralRegion;
    let name = null;
    //console.log(allRegionMap);
    document.querySelectorAll('input[name="region"]').forEach((elem) => {
        elem.addEventListener('change', function(event){
            name = event.target.value;
            
            sr = allRegionMap.get(name); //to get the region array 

            let selectedYear = document.querySelector('#year');
            let chosenYear = selectedYear.options[selectedYear.selectedIndex].value;
            let getChart = regionChart(data, sr, parseInt(chosenYear));
            updateFlatTypeCountV1(getChart, sr);
        })
       
    })

}

function setRegionMap(allRegionMap){
    allRegionMap.set("central", centralRegion);
    allRegionMap.set("east", eastRegion);
    allRegionMap.set("north", northRegion);
    allRegionMap.set("south", southRegion);
    allRegionMap.set("west", westRegion);
    return allRegionMap;
}


window.document.addEventListener('DOMContentLoaded', async function(){
    let baseCaseLocation = "ANG MO KIO";
    let allRegionMap = new Map();
    //axios get method
    let data = await loadData(CSV_YEAR_17_22);
    let resaleData1516 = await loadData(CSV_YEAR_15_16);
    let resaleData1214 = await loadData(CSV_YEAR_12_14);
    let newAllRegionMap = setRegionMap(allRegionMap); 
    

    //combine dataset and sort data by town
    let resaleDataOA = combineAll(resaleData1214, resaleData1516, data);
    let filteredData = await sortByTown(resaleDataOA);
    //console.log(filteredData.get("ANG MO KIO")[0]);
    //console.log(filteredData);
    let filteredDataByYear = groupDataByYear(filteredData);
    //console.log(filteredDataByYear.get('2012')[0]);
    //let get2012 = filteredDataByYear.get('2012');


    /*chart 1: find average resale flat pricing by location */
    let priceByLocation = findByTown(resaleDataOA);
    //console.log(priceByLocation)
    updateTownChartFuncV1(priceByLocation);

    /* chart 2: find by different flat type avg price*/
    let popularFlatType = findByFlatType(filteredData, baseCaseLocation);
    dropDownMeun(filteredData);
    //console.log(popularFlatType);
    updateTownChartByFlatTypeV1(popularFlatType);


    /* chart 3: find the number of flatType in different area by year */
    //let numberFlatType = findFlatTypeCountByYear();
    let ans = regionChart(filteredData, centralRegion);
    updateFlatTypeCountV1(ans, centralRegion);
    dropDownYearMenu(filteredData, newAllRegionMap);
    findSelectedRadioBtn(filteredData, newAllRegionMap);

});


//const to create instance of ApexCharts
const townChartV1 = new ApexCharts(document.querySelector('#townChartV1'), optionsV1);
const flatTypeChart = new ApexCharts(document.querySelector('#flatTypeChart'), optionsV1);
const popularFlatTypeChart = new ApexCharts(document.querySelector('#countFlatByLocationChart'), optionsByNumOfFlatType);

//render fucntion
townChartV1.render();
flatTypeChart.render();
popularFlatTypeChart.render();