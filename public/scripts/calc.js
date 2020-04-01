const URI = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';
const proxyurl = "https://pacific-plains-66918.herokuapp.com/";
let query = '/api/products/1';
let acProducts = [];

//Async function that fetchs the pages of products until it reaches the last page
async function getProducts(resolve){
    const response = await fetch(proxyurl + URI + query);
    const data = await response.json();
    query = data.next;
    data.objects.forEach(product => {
        if(product.category === 'Air Conditioners'){
            acProducts.push(product);
        }
    });
    if(data.next){
        getProducts(resolve);
    } else {
        calcWeights(resolve);
    };
};

//Async function that calculates the average cubic weight of all the ac products returned from the API and returns it a resolved promise
const calcWeights = resolve => {
    let allProductsCubicWeight = 0;

    acProducts.forEach(product => {
        let parcel = product.size;
        //I was unsure whether cubic weight of a product was simply dimensions multiplied together then multiplied with conversion of 250 as explained in the brief or if
        //it was dimensions multiplied then multiplied with conversion of 250 then added together with the specific products weight which was returned from the API
        //so here I've followed the brief's explanation and multiplied the products dimensions together then multiplied the result by the conversion factor of 250.
        let dim = parcel.length/100 * parcel.height/100 * parcel.width/100;
        let cubicWeight = (dim * 250); //+ product.weight/1000;
        allProductsCubicWeight += cubicWeight;
    });

    let avCubicWeight = Math.round(allProductsCubicWeight / acProducts.length);

    console.log('All AC products returned: ', acProducts);
    console.log(`The average cubic weight of all the Air Conditioning products is: ${avCubicWeight}Kg`);

    return resolve(avCubicWeight);
};


//A promise that resolves when its calculated the average Cubic Weight of all the ac products returned from the API
let getWeight = new Promise(resolve => {
    getProducts(resolve);
});