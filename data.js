const BASE_API_URL = `https://data.gov.sg/api/action/datastore_search`;
const ID_YEAR_12_14 = "83b2fc37-ce8c-4df4-968b-370fd818138b";
const ID_YEAR_15_16 = "1b702208-44bf-4829-b620-4615ee19b57c";
const ID_YEAR_17_22 = "f1765b54-a209-4718-8d38-a39237f502b3";
const CSV_YEAR_12_14 = "year12to14data.csv";
const CSV_YEAR_15_16 = "year15to16data.csv";
const CSV_YEAR_17_22 = "year17to22data.csv";
let townNameArr = ["ANG MO KIO", "BEDOK","BISHAN", "BUKIT BATOK", "BUKIT MERAH","BUKIT PANJANG","BUKIT TIMAH"
,"CENTRAL AREA", "CHOA CHU KANG", "CLEMENTI", "GEYLANG", "HOUGANG", "JURONG EAST", "JURONG WEST", "KALLANG/WHAMPOA"
,"MARINE PARADE", "PASIR RIS", "PUNGGOL", "QUEENSTOWN", "SEMBAWANG","SENGKANG","SERANGOON", "TAMPINES","TOA PAYOH"
,"WOODLANDS", "YISHUN"];

let years = ['2012','2013','2014','2015','2016','2017', '2018', '2019', '2020', '2021', '2022'];


async function loadData(csvFileName){
    //get the CSV file via axios
    const response = await axios.get(csvFileName);
    //cobert raw CSV file into asn array of JSON objects
    const json = await csv().fromString(response.data);
    //console.log(json);
    return json;
}

//function under development 
async function loadData2(){
    let responseArr = [];
    let townName = "JURONG EAST"
    let p = {
        'resource_id': ID_YEAR_12_14,
        'q': townName
    }

    let q = {
        'resource_id': ID_YEAR_15_16,
        'q': townName
    }

    let r = {
        'resource_id': ID_YEAR_17_22,
        'q': townName
    }
    let req1 = axios.get(BASE_API_URL, {'params' : p});
    let req2 = axios.get(BASE_API_URL, {'params' : q});
    let req3 = axios.get(BASE_API_URL, {'params' : r});

    let res1 = await req1;
    let res2 = await req2;
    let res3 = await req3;
    let resNew1 = res1.data.result.records
    let resNew2 = res2.data.result.records
    let resNew3 = res3.data.result.records
    // console.log(resNew1);
    // console.log(resNew2);
    // console.log(resNew3);

    responseArr.push(resNew1);
    responseArr.push(resNew2);
    responseArr.push(resNew3);
    //console.log(responseArr[2]);
    //const json = await csv().fromString(response.data);
    //return response.data;
}

function transformData(rawData){
    let map1 = new Map();
    let transformData = [];
    let keyVal = 0;
    for(let d of rawData)
    {
        if(keyVal != parseInt(d.month.slice(0.4)))
        {
            keyVal = d.month.slice(0,4);
            transformData = []
        }
        
        transformData.push({
            'Year': d.month.slice(0,4),
            'month': d.month.slice(5,7),
            'town': d.town,
            'price': d.resale_price
        })


        map1.set(keyVal, transformData)
    }
    return map1;
}
//combine all year records: from 2012 to 2017
function combineAll(data1, data2, data3)
{
    let sumData = [];
    for(let i = 0; i<data1.length; i++)
    {
        sumData.push(data1[i]);
    }

    for(let i = 0; i<data2.length; i++)
    {
        sumData.push(data2[i]);
    }    

    for(let i = 0; i<data3.length; i++)
    {
        sumData.push(data3[i]);
    }

    return sumData;
}

//To find all the graph result base on 
//location, average price and year 
function findByTown(data){
    let map1 = new Map();
    let transformData = [];
    let objTransfrom = [];
    console.log()
    //loop through all the townName
    for(let townName of townNameArr)
    {
        //loop through all years
        transformData = [];

        for(let y of years)
        {
            let sum = 0;
            let count = 0;
            //loop through all data array
            for(let i = 0; i<data.length; i++)
            {
                //if curr not equal to townName 
                if(data[i].town !== townName)
                {
                    continue;
                }
                else
                {
                    //compare curr year with year 
                    let num = data[i].month.slice(0,4)
                    if(parseInt(num) === parseInt(y))
                    {
                        count++;
                        sum += parseInt(data[i].resale_price);
                    }
                }
            }
            let avg = sum/count;
            transformData.push(avg.toFixed(0));
            
        }

        objTransfrom.push({
            'name': townName,
            'data': transformData
        });
    }

    return objTransfrom;

}

function findByYear(data){


}

function findByFlatType(data){


}

