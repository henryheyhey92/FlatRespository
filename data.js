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

let years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];

const central = ["BISHAN", "BUKIT MERAH", "CENTRAL AREA", "GEYLANG", "KALLANG/WHAMPOA", "MARINE PARADE", "TOA PAYOH", "QUEENSTOWN"];
const east = ["BEDOK", "PASIR RIS", "TAMPINES"];
const north = ["SEMBAWANG", "YISHUN", "ANG MO KIO", "HOUGANG", "PUNGGOL", "SENGKANG", "SERANGOON", "WOODLANDS"];
const south = ["BUKIT TIMAH"];
const west = ["BUKIT BATOK", "BUKIT PANJANG", "CHOA CHU KANG", "CLEMENTI", "JURONG EAST", "JURONG WEST"];

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
function findByTown(data) {
    let transformData = [];
    let objTransfrom = [];
    console.log()
    //loop through all the townName
    for (let townName of townNameArr) {
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

function groupBy(data) {

}

function findByFlatType(townData, townName) {
    // let townName = "ANG MO KIO";
    let singleTownData = townData.get(townName);
    let len = townData.get(townName).length;
    let flatTypeAvgObj = [];
    let flatAvgPrice = [];

    for (let flat of flatType) {
        let sum = 0;
        let count = 0;
        let avg = 0;
        flatAvgPrice = [];
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
        }
        if(avg == 0 || isNaN(avg))
        {
            continue;
        }
        flatTypeAvgObj.push({
            'name': flat,
            'data': flatAvgPrice
           })

    }
    return flatTypeAvgObj;

}
