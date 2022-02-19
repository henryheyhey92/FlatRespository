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
    noData: {
        text:"Loading..."
    }
}
function reducer(prev, curr){

}

window.document.addEventListener('DOMContentLoaded', async function(){
    let year = ['2017', '2018', '2019', '2020', '2021', '2022'];
    let avgPricePerYear = [];
    let sum = 0;
    let data = await loadData();
    let resData = transformData(data);
    for(let p of year)
    {
            let priceArr = resData.get(p);
            let len = parseInt(priceArr.length)
            for(let i = 0; i<len; i++)
            {
                sum += parseInt(priceArr[i].price);
            }
            let avg = sum / len;
            avgPricePerYear.push(avg);
        
    }
    console.log(avgPricePerYear);
    chart.updateSeries([{
            'name': 'Average Price',
            'data': avgPricePerYear 
    }])
    // console.log(data[0].month);
    // console.log(data[0].town);


})

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();