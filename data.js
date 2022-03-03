async function loadData(csvFileName) {
    //get the CSV file via axios
    const response = await axios.get(csvFileName);
    //cobert raw CSV file into asn array of JSON objects
    const json = await csv().fromString(response.data);
    return json;
}

function transformData(rawData) {
    let map1 = new Map();
    let transformData = [];
    let keyVal = 0;
    for (let d of rawData) {
        if (keyVal != parseInt(d.month.slice(0.4))) {
            keyVal = d.month.slice(0, 4);
            transformData = []
        }

        transformData.push({
            'Year': d.month.slice(0, 4),
            'month': d.month.slice(5, 7),
            'town': d.town,
            'price': d.resale_price
        })


        map1.set(keyVal, transformData)
    }
    return map1;
}
//combine all year records: from 2012 to 2017
function combineAll(data1, data2, data3) {
    let sumData = [];
    for (let i = 0; i < data1.length; i++) {
        sumData.push(data1[i]);
    }

    for (let i = 0; i < data2.length; i++) {
        sumData.push(data2[i]);
    }

    for (let i = 0; i < data3.length; i++) {
        sumData.push(data3[i]);
    }

    return sumData;
}

//To find all the graph result base on 
//location, average price and year 
function findByTown(data, selectedRegion) {
    let transformData = [];
    let objTransfrom = [];
    console.log()
    //loop through all the townName
    for (let townName of selectedRegion) {
        //loop through all years
        transformData = [];

        for (let y of years) {
            let sum = 0;
            let count = 0;
            //loop through all data array
            for (let i = 0; i < data.length; i++) {
                //if curr not equal to townName 
                if (data[i].town !== townName) {
                    continue;
                }
                else {
                    //compare curr year with year 
                    let num = data[i].month.slice(0, 4)
                    if (parseInt(num) === parseInt(y)) {
                        count++;
                        sum += parseInt(data[i].resale_price);
                    }
                }
            }
            let avg = sum / count;
            transformData.push(avg.toFixed(0));

        }

        objTransfrom.push({
            'name': townName,
            'data': transformData
        });
    }

    return objTransfrom;

}


//this return hashmap
function sortByTown(data) {
    let transformData = [];
    let objectTrans = [];
    let map1 = new Map();

    for (let townName of townNameArr) {
        transformData = [];

        for (let y of years) {
            for (let i = 0; i < data.length; i++) {
                let num = data[i].month.slice(0, 4)
                if (data[i].town === townName && (parseInt(num) === parseInt(y))) {
                    transformData.push(data[i]);
                }
                else {
                    continue;
                }
            }
        }
        map1.set(townName, transformData);
    }
    return map1;
}


function findByFlatType(townData, townName) {
    // let townName = "ANG MO KIO";
    let singleTownData = townData.get(townName);
    let len = townData.get(townName).length;
    let flatTypeAvgObj = [];
    let flatAvgPrice = [];
    let countflat = [];

    for (let flat of flatType) {
        let sum = 0;
        let count = 0;
        let avg = 0;
        flatAvgPrice = [];
        countflat = [];
        for (let y of years) {
            for (let i = 0; i<len; i++) {
                if(isNaN(singleTownData[i].resale_price))
                {
                    continue;
                }
                if (parseInt(singleTownData[i].month.slice(0, 4)) !== parseInt(y)) {
                    continue;
                }
                if (singleTownData[i].flat_type !== flat) {
                    continue;
                }
                else {
                    sum += parseInt(singleTownData[i].resale_price);
                    count++;
                }
            }
            avg = sum / count;
            flatAvgPrice.push(avg.toFixed(0));
            countflat.push(count);
        }
        if(avg == 0 || isNaN(avg))
        {
            continue;
        }
        flatTypeAvgObj.push({
            'name': flat,
            'data': flatAvgPrice,
            'count':countflat
           })

    }
    return flatTypeAvgObj;

}

function findFlatTypeCountByYear(townData)
{
    let flatTypeLen = flatType.length;

}

function groupDataByYear(townData)
{   
    let townObj = []
    let monthVal = [];
    let yearMap = new Map();
   for(let y of years){
     townObj = [];
       for(let town of centralRegionOne){
           let getTownInfo = townData.get(town);
           monthVal = [];
           for(let i = 0; i< getTownInfo.length; i++){
                let currYear = getTownInfo[i].month.slice(0,4);
                //console.log(currYear+", "+y)
                if(parseInt(currYear) !== parseInt(y)){
                    continue;
                }else{
                    monthVal.push(getTownInfo[i]);
                }
           }
           townObj.push({
               "town-name":town,
               "value":monthVal
           });
           //console.log(townObj);
       }
       yearMap.set(y, townObj);
   }
   return yearMap;
}


function regionChart(data, selectedRegion, chosenYear){
    let objData = [];
    let year = 2012;
    if(chosenYear !== undefined || chosenYear !== null){
        year = parseInt(chosenYear);
    }
    for(let f of flatType){
        let countFlat = [];
        for(let town of selectedRegion){
            let count = 0;
            let getLocation = data.get(town);
            let len = getLocation.length;
            for(let i = 0; i<len; i++){
                let curr = getLocation[i].month.slice(0,4);
                let getFlatType = getLocation[i].flat_type;

                if(getFlatType !== f){
                    continue;
                }

                if(parseInt(curr) !== 2012){
                    continue;
                }else{
                    count++
                }

            }
            countFlat.push(count);
        }
        objData.push({
            'name':f,
            'data':countFlat
        })
    }
    return objData;
}


function getPiechart(filteredData, townName, year, flatTypeArray){
    let seriesArray = [];
    let labelsArray = [];
   
    let getTownData = filteredData.get(townName);
    for(let flatType of flatTypeArray){
        let count = 0;
        for(let i = 0; i<getTownData.length; i++){
            let getDataYear = getTownData[i].month.slice(0,4);
            if(parseInt(getDataYear) !== parseInt(year)){
                continue;
            }else{
                let getDataflatType = getTownData[i].flat_type;
                if(flatType !== getDataflatType){
                    continue;
                }else{
                    count++;
                }
            }
        }
        seriesArray.push(count);
        labelsArray.push(flatType);
    }
    // let options = {
    //     series: seriesArray,
    //     labels: labelsArray
    // }
    return [seriesArray, labelsArray];
}