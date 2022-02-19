async function loadData(){
    //get the CSV file via axios
    const response = await axios.get('year2017data.csv');
    //cobert raw CSV file into asn array of JSON objects
    const json = await csv().fromString(response.data);
    return json;
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