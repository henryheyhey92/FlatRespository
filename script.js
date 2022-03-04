function updateTownChartFuncV1(data) {
    townChartV1.updateSeries(data);
    townChartV1.updateOptions({
        title: {
            text: "Average transacted resale flat price by town"
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val / 1000 + " K"
                }
            }
        }
    })
}

function updateTownChartByFlatTypeV1(data) {
    //console.log(data);
    flatTypeChart.updateSeries(data);
    flatTypeChart.updateOptions({
        title: {
            text: "Average Resale flat price base on flat type"
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val / 1000 + " K"
                }
            }
        }
    })
}

function updateFlatTypeCountV1(data, region) {
    popularFlatTypeChart.updateSeries(data);
    popularFlatTypeChart.updateOptions({
        xaxis: {
            categories: region
        }
    });
    popularFlatTypeChart.updateOptions({
        title: {
            text: "Number of resale flats transacted by region in year 2019"
        }
    });
}

function updatePieChartV1(pieChart){
    popularFlatTypePieChart.updateOptions({
        series: pieChart[0],
        labels: pieChart[1]
    })
}

function dropDownMeun(data) {
    for (let townName of townNameArr) {
        document.querySelector('#towns').innerHTML += '<option class="opt" value="' + townName + '">' + townName + '</option>';
    }
    let selectedTown = document.querySelector('#towns');
    selectedTown.addEventListener('change', function () {
        //console.log(selectedTown)
        let chosenTown = selectedTown.options[selectedTown.selectedIndex].value;
        let popularFlatType = findByFlatType(data, chosenTown);
        updateTownChartByFlatTypeV1(popularFlatType);
    })

}

function dropDownMeunForPieChart(filteredData){
    for(let townName of townNameArr){
        document.querySelector('#pie-town').innerHTML +='<option class="opt-pie-town-name" value="' + townName + '">' + townName + '</option>';
    }
    for(let y of years){
        document.querySelector('#pie-year').innerHTML +='<option class="opt-pie-year" value="' + y + '">' + y + '</option>';
    }
    let selectedTown = document.querySelector('#pie-town');
    let selectedYear = document.querySelector('#pie-year');
    selectedTown.addEventListener('change', function(){
        let chosenTown = selectedTown.options[selectedTown.selectedIndex].value;
        let chosenYear = document.querySelector('#pie-year').value;
        let pieChart = getPiechart(filteredData, chosenTown, chosenYear);
        updatePieChartV1(pieChart);
    })

    selectedYear.addEventListener('change', function(){
        let chosenYear = selectedYear.options[selectedYear.selectedIndex].value;
        let chosenTown = document.querySelector('#pie-town').value;
        let pieChart = getPiechart(filteredData, chosenTown, chosenYear);
        updatePieChartV1(pieChart);
    })
}

function dropDownYearMenu(data, selectedRegion) {
    for (let y of years) {
        document.querySelector('#year').innerHTML += '<option class="optYear" value="' + y + '">' + y + '</option>';
    }
    let selectedYear = document.querySelector('#year');
    selectedYear.addEventListener('change', function () {
        let chosenYear = selectedYear.options[selectedYear.selectedIndex].value;
    })
}


function findSelectedRadioBtn(data, allRegionMap) {
    let sr = centralRegionOne;
    let name = null;
    //console.log(allRegionMap);
    document.querySelectorAll('input[name="region"]').forEach((elem) => {
        elem.addEventListener('change', function (event) {
            name = event.target.value;

            sr = allRegionMap.get(name); //to get the region array 

            let selectedYear = document.querySelector('#year');
            let chosenYear = selectedYear.options[selectedYear.selectedIndex].value;
            let getChart = regionChart(data, sr, parseInt(chosenYear));
            updateFlatTypeCountV1(getChart, sr);
        })

    })

}

function radiofunc(resaleDataOA, allRegionMap) {

    // generate the radio groups
    let name = null;
    const group = document.querySelector("#group");
    for (let i = 0; i < region.length; i++) {
        group.innerHTML += (region[i] === "centralRegionOne") ? (`<div>
            <input class="radio-btn" type="radio" name="chartOneRegion" value="${region[i]}" id="${region[i]}" checked>
             <label for="${region[i]}">${regionShort[i]}</label>
        </div>`) : (`<div>
        <input class="radio-btn" type="radio" name="chartOneRegion" value="${region[i]}" id="${region[i]}">
         <label for="${region[i]}">${regionShort[i]}</label>
    </div>`)

    }

    document.querySelectorAll('input[name=chartOneRegion]').forEach((elem) => {
        elem.addEventListener('change', function (event) {
            name = event.target.value;
            name = allRegionMap.get(name);
            let priceByLocation = findByTown(resaleDataOA, name);
            updateTownChartFuncV1(priceByLocation);
        })
    })
}

/******************************************
 * Set hashmap to get location array value 
 * 
 *****************************************/
function setRegionMap(allRegionMap) {
    allRegionMap.set("centralRegionOne", centralRegionOne);
    allRegionMap.set("centralRegionTwo", centralRegionTwo);
    allRegionMap.set("eastRegion", eastRegion);
    allRegionMap.set("northRegionOne", northRegionOne);
    allRegionMap.set("northRegionTwo", northRegionTwo);
    allRegionMap.set("southRegion", southRegion);
    allRegionMap.set("westRegionOne", westRegionOne);
    allRegionMap.set("westRegionTwo", westRegionTwo);
    return allRegionMap;
}


window.document.addEventListener('DOMContentLoaded', async function () {
    let baseCaseLocation = "ANG MO KIO";
    let allRegionMap = new Map();
    //axios get method
    let data = await loadData(CSV_YEAR_17_22);
    let resaleData1516 = await loadData(CSV_YEAR_15_16);
    let resaleData1214 = await loadData(CSV_YEAR_12_14);
    let newAllRegionMap = setRegionMap(allRegionMap);


    /**********************************************
     * Nav-bar 
     * *******************************************/
   
    
    
    /************************************************ 
     * fliter /sort data function 
     * 
    *************************************************/
    //combine dataset and sort data by town
    let resaleDataOA = combineAll(resaleData1214, resaleData1516, data);
    let filteredData = await sortByTown(resaleDataOA);
    //console.log(filteredData.get("ANG MO KIO")[0]);
    console.log(filteredData);
    //let filteredDataByYear = groupDataByYear(filteredData);
    //console.log(filteredDataByYear);

    /*************************************************
     * page tab
     * 
     *************************************************/
    let allTab = document.querySelectorAll('#tab-bar button');

    for(let tab of allTab){
        tab.addEventListener('click', function(event){
            let selectedTab = event.target;
            let tabNum = selectedTab.dataset.page;

            let tabs = document.querySelectorAll('.tab');
            for(let t of tabs){
                t.classList.remove('show');
                t.classList.add('hidden');
            }

            let tab = document.querySelector('#chart-'+tabNum);
            tab.classList.remove('hidden');
            tab.classList.add('show');
        })
    }

    /***********************************************
     * Chart function
     * 
     ***********************************************/
    /*chart 1: find average resale flat pricing by location */
    let priceByLocation = findByTown(resaleDataOA, centralRegionOne);
    //console.log(priceByLocation)
    updateTownChartFuncV1(priceByLocation);
    radiofunc(resaleDataOA, allRegionMap);




    /********************End of char 1****************/


    /* chart 2: find by different flat type avg price*/
    let popularFlatType = findByFlatType(filteredData, baseCaseLocation);
    dropDownMeun(filteredData);
    //console.log(popularFlatType);
    updateTownChartByFlatTypeV1(popularFlatType);

    /********************End of chart 2***************/



    /* chart 3: find the number of flatType in different area by year */
    //let numberFlatType = findFlatTypeCountByYear();
    let ans = regionChart(filteredData, centralRegionOne);
    //console.log(ans);
    updateFlatTypeCountV1(ans, centralRegionOne);
    dropDownYearMenu(filteredData, newAllRegionMap);
    findSelectedRadioBtn(filteredData, newAllRegionMap);



    /********************End of chart 3 ****************/

    /***********chart 4: pie chart *********************/
    let pieChart = getPiechart(filteredData, "ANG MO KIO", 2021);
    updatePieChartV1(pieChart);
    dropDownMeunForPieChart(filteredData);

});


//const to create instance of ApexCharts
const townChartV1 = new ApexCharts(document.querySelector('#townChartV1'), optionsV1);
const flatTypeChart = new ApexCharts(document.querySelector('#flatTypeChart'), optionsV1);
const popularFlatTypeChart = new ApexCharts(document.querySelector('#countFlatByLocationChart'), optionsByNumOfFlatType);
const popularFlatTypePieChart = new ApexCharts(document.querySelector('#flatTypePieChart'), optionsPieChart);

//render fucntion
townChartV1.render();
flatTypeChart.render();
popularFlatTypeChart.render();
popularFlatTypePieChart.render();