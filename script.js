function updateTownChartFuncV1(data) {
    townChartV1.updateSeries(data);
    townChartV1.updateOptions({
        title: {
            text: "Average resale flat price"
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

function updateTownChartByFlatTypeV1(data, townName) {
    //console.log(data);
    flatTypeChart.updateSeries(data);
    flatTypeChart.updateOptions({
        title: {
            text: "Average flat type price :"+ townName
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val / 1000 + " K"
                }
            }
        },
        responsive: [{
            breakpoint: 500,
            options: {
              chart:{
                height: '500',
                horizontalAlign: 'center'
              },
              legend: {
                position: 'bottom',
                floating: false,
                offsetY: 0,
                offsetX: 0,
                fontSize: '8px',
                show: true
              },
              title:{
                  style:{
                    fontSize: '10px'
                  }
              }
            }
          }]
    })
}

function updateFlatTypeCountV1(data, region, year, regionName) {
    popularFlatTypeChart.updateSeries(data);
    popularFlatTypeChart.updateOptions({
        xaxis: {
            categories: region
        }
    });
    popularFlatTypeChart.updateOptions({
        title: {
            text: "Region: "+regionName+", year:"+year
        }
    });
}

function updatePieChartV1(pieChart, location){
    popularFlatTypePieChart.updateOptions({
        series: pieChart[0],
        labels: pieChart[1],
        title:{
            text: location,
            margin: 0,
            offsetX: 0,
            offsetY: 0,
            style:{
                fontSize: '10px'
            }
        }
    })
}

function updateProgressChart(data){
    progressChart.updateOptions({
        series:[data]
    })
}

function updateProgressChartV2(data){
    progressChartSec.updateOptions({
        series:[data],
        labels: ["Resale flat price increase"],
        dataLabels: {
            name: {
              offsetY: -10,
              color: "#808080",
              fontSize: "9px"
            },
            value: {
              color: "#fff",
              fontSize: "20px",
              show: true
            }
          }
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
        updateTownChartByFlatTypeV1(popularFlatType, chosenTown);
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
        updatePieChartV1(pieChart, chosenTown);
    })

    selectedYear.addEventListener('change', function(){
        let chosenYear = selectedYear.options[selectedYear.selectedIndex].value;
        let chosenTown = document.querySelector('#pie-town').value;
        let pieChart = getPiechart(filteredData, chosenTown, chosenYear);
        updatePieChartV1(pieChart, chosenTown);
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

    for (let y of years) {
        document.querySelector('#year').innerHTML += '<option class="optYear" value="' + y + '">' + y + '</option>';
    }
    let selectedYear = document.querySelector('#year');
    selectedYear.addEventListener('change', function(){
        let chosenYear = selectedYear.options[selectedYear.selectedIndex].value;
        let chosenTown = document.querySelectorAll('input[name="region"]');
        for(let ct of chosenTown){
            if(ct.checked === true){
                chosenTown = ct.value;
            }
        }
        console.log(chosenTown);
        console.log(chosenYear);
        sr = allRegionMap.get(chosenTown);
        console.log(sr)
        let getChart = regionChart(data, sr, parseInt(chosenYear));
        updateFlatTypeCountV1(getChart, sr, chosenYear, chosenTown);
    })


    document.querySelectorAll('input[name="region"]').forEach((elem) => {
        elem.addEventListener('change', function (event) {
            name = event.target.value;

            sr = allRegionMap.get(name); //to get the region array 

            let selectedYear = document.querySelector('#year').value;
            console.log("when raido :"+selectedYear);
            let getChart = regionChart(data, sr, parseInt(selectedYear));
            updateFlatTypeCountV1(getChart, sr, selectedYear, name);
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
    let baseCaseYear = 2012;
    let baseCaseRegion = "centralRegionOne";
    let allRegionMap = new Map();
    //axios get method
    let data = await loadData(CSV_YEAR_17_22);
    let resaleData1516 = await loadData(CSV_YEAR_15_16);
    let resaleData1214 = await loadData(CSV_YEAR_12_14);
    let newAllRegionMap = setRegionMap(allRegionMap);
    let pageBtn = document.querySelector('.page0-btn');
    pageBtn.style.color = "rgb(57, 131, 180)";
    pageBtn.style.border = "3px solid rgb(105, 139, 153)";
    pageBtn.addEventListener('click', function(){
        if(pageBtn.className === "page0-btn"){
            pageBtn.className += " change";
        }else{
            pageBtn.className = "page0-btn"
        }
    })
    /******************************************
     * form validation 
     ******************************************/
    let formBtn = document.querySelector('#form-btn');
    formBtn.addEventListener('click', function(){
        let nameNotGiven = false;
        let nameShort = false;
        let nameIsNumber = false;
        let emailNotValid = false;
        let errorDiv = document.querySelector('#errors');
        errorDiv.style.display = 'none';

        let formName = document.querySelector('#name').value;
        if(!formName){
            nameNotGiven = true;
        }else if(formName.length < 3){
            nameShort = true;
        }

        if(/\d+$/.test(formName)){
            nameIsNumber = true;
        }

        let formEmail = document.querySelector('#email').value;
        if(!formEmail.includes('.') || !formEmail.includes('@')){
            emailNotValid = true;
        }

        if(nameNotGiven || nameShort || nameIsNumber || emailNotValid){
            errorDiv.innerHTML = '';
            errorDiv.style.display = "block";
            if(nameNotGiven){
                errorDiv.innerHTML += `<p>Please provide name</p>`;
            }

            if(nameShort){
                errorDiv.innerHTML += `<p>Enter name length too short</p>`;
            }

            if(nameIsNumber){
                errorDiv.innerHTML += `<p>The input name should not contain number</p>`
            }

            if(emailNotValid){
                errorDiv.innerHTML += `<p>Your email should contains at least one . and at least one @</p>`
            }
        }else{
            errorDiv.style.display = 'none';
            alert("request for news letter submitted successfully");
        }
    })



    /**********************************************
     * Nav-bar 
     * *******************************************/
   
    
    /********************************************
     * progress bar 
     ********************************************/
    updateProgressChart(50);
    updateProgressChartV2(12.7);

    /************************************************ 
     * fliter /sort data function 
     * 
    *************************************************/
    //combine dataset and sort data by town
    let resaleDataOA = combineAll(resaleData1214, resaleData1516, data);
    let filteredData = await sortByTown(resaleDataOA);
    //console.log(filteredData.get("ANG MO KIO")[0]);
    console.log(filteredData);
    

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
    updateTownChartFuncV1(priceByLocation);
    radiofunc(resaleDataOA, allRegionMap);




    /********************End of char 1****************/


    /* chart 2: find by different flat type avg price*/
    let popularFlatType = findByFlatType(filteredData, baseCaseLocation);
    dropDownMeun(filteredData);
    updateTownChartByFlatTypeV1(popularFlatType, baseCaseLocation);

    /********************End of chart 2***************/



    /* chart 3: find the number of flatType in different area by year */
    //let numberFlatType = findFlatTypeCountByYear();
    let getNumFlatType = regionChart(filteredData, centralRegionOne, 2012);
    //console.log(ans);
    updateFlatTypeCountV1(getNumFlatType, centralRegionOne, baseCaseYear, baseCaseRegion);
    //dropDownYearMenu(filteredData, newAllRegionMap);
    findSelectedRadioBtn(filteredData, newAllRegionMap);



    /********************End of chart 3 ****************/

    /***********chart 4: pie chart *********************/
    let pieChart = getPiechart(filteredData, baseCaseLocation, 2021);
    updatePieChartV1(pieChart, baseCaseLocation);
    dropDownMeunForPieChart(filteredData);

});


//const to create instance of ApexCharts
const progressChart = new ApexCharts(document.querySelector('#progressBarOne'), optionsProgressChartV1);
const progressChartSec = new ApexCharts(document.querySelector('#progressBarSec'), optionsProgressChartV1);
progressChart.render();
progressChartSec.render();


const townChartV1 = new ApexCharts(document.querySelector('#townChartV1'), optionsV1);
const flatTypeChart = new ApexCharts(document.querySelector('#flatTypeChart'), optionsV1);
const popularFlatTypeChart = new ApexCharts(document.querySelector('#countFlatByLocationChart'), optionsByNumOfFlatType);
const popularFlatTypePieChart = new ApexCharts(document.querySelector('#flatTypePieChart'), optionsPieChart);
//render fucntion


townChartV1.render();
flatTypeChart.render();
popularFlatTypeChart.render();
popularFlatTypePieChart.render();