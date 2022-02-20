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
        size: 10
    },
    stroke:{
        curve:'smooth'
    },
    noData: {
        text:"Loading..."
    }
}


//find overall avg of resale flat price
function findOverAllAvg(data){
    let year = ['2017', '2018', '2019', '2020', '2021', '2022'];
    let avgPricePerYear = [];
    let sum = 0;
    for(let p of year)
    {
            let priceArr = data.get(p);
            let len = parseInt(priceArr.length)
            for(let i = 0; i<len; i++)
            {
                sum += parseInt(priceArr[i].price);
            }
            let avg = sum / len;
            avgPricePerYear.push(avg.toFixed(0));
        
    }
    return avgPricePerYear;
}

//find avg resale flat price of Ang Mo Kio 
function findTownAvg(data, townName){
    let year = ['2017', '2018', '2019', '2020', '2021', '2022'];
    let townAvg = [];
    //let townNameAndPrice = []
    let sum = 0;
    for(let p of year)
    {
        let priceArr = data.get(p);
        let len = parseInt(priceArr.length);
        for(let i = 0; i<len; i++)
        {
            if(priceArr[i].town !== townName)
            {
                continue;
            }
            else{
                // townNameAndPrice.push({
                //     'location': priceArr[i].town,
                //     'price': priceArr[i].price
                // })
                sum += parseInt(priceArr[i].price);
            }
        }
        let avg = sum / len;
        townAvg.push(avg.toFixed(0));
    }
    //to check correct town has been selected 
    //console.log(townNameAndPrice);
    //console.log(townAvg);
    return townAvg;

}

function dropDown(data){
    let town = ["ANG MO KIO", "JURONG EAST", "BUKIT MERAH", "CHOA CHU KANG"];
    //let opt = document.createElement("option");
    for(let i =0; i< town.length; i++)
    {
        let locationId = town[i].replace(/ /g, "");
        document.querySelector("#towns").innerHTML += '<option id="' + locationId + '"  class="opt"   value="' + town[i] + '">' + town[i] + '</option>';
    }
    

    let test = document.querySelector('#towns')
    test.addEventListener('change', function(){
       //let select = document.querySelectorAll("option.opt")
        let val = test.options[test.selectedIndex].value
        let res = findTownAvg(data, val);
        updateTownChartFunc(res);
    })
    
}



window.document.addEventListener('DOMContentLoaded', async function(){
    let baseCaseLocation = "ANG MO KIO";
    let data = await loadData();
    let testData = await loadData2();
    console.log(testData);
    let resData = transformData(data);
    console.log(resData);
    dropDown(resData);
    let avgPricePerYear = findOverAllAvg(resData);
    let townAvgPerYear = findTownAvg(resData, baseCaseLocation);
    updateOverallAvgChart(avgPricePerYear);
    updateTownChartFunc(townAvgPerYear);

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

const chart = new ApexCharts(document.querySelector('#chart'), options);
const townChart = new ApexCharts(document.querySelector('#townChart'), options);
chart.render();
townChart.render();