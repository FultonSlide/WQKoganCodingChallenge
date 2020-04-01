const URI = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';
const proxyurl = "https://pacific-plains-66918.herokuapp.com/";
let query = '/api/products/1';
let acProducts = [];

//Async function that fetchs the pages of products until it reaches the last page
async function getProducts(resolve, reject){
    const response = await fetch(proxyurl + URI + query);
    const data = await response.json();
    query = data.next;
    data.objects.forEach(product => {
        if(product.category === 'Air Conditioners'){
            acProducts.push(product);
        }
    });
    if(data.next){
        getProducts(resolve, reject);
    } else {
        calcWeights(resolve, reject);
    };
};

//Async function that calculates the average cubic weight of all the ac products returned from the API and returns it a resolved promise
async function calcWeights(resolve, reject){
    let totalCubicWeight = 0;

    acProducts.forEach(product => {
        let parcel = product.size;
        let dim = parcel.length/100 * parcel.height/100 * parcel.width/100;
        let cubicWeight = (dim * 250) + product.weight/1000;
        totalCubicWeight += cubicWeight;
    });

    let avCubicWeight = Math.round(totalCubicWeight / acProducts.length);

    console.log('All AC products returned: ', acProducts);
    console.log(`The average cubic weight of all the Air Conditioning products is: ${avCubicWeight}Kg`);

    return resolve(avCubicWeight);
};


//A promise that resolves when its calculated the average Cubic Weight of all the ac products returned from the API
let getWeight = new Promise((resolve, reject) => {
    getProducts(resolve, reject);
});