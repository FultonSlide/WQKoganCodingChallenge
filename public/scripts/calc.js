const URI = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';
const proxyurl = "https://pacific-plains-66918.herokuapp.com/";
let query = '/api/products/1';
let acProducts = [];
let totalCubicWeight = 0;
let avCubicWeight = 0;

async function getProducts(){
    const response = await fetch(proxyurl + URI + query);
    const data = await response.json();
    query = data.next;
    data.objects.forEach(product => {
        if(product.category === 'Air Conditioners'){
            acProducts.push(product);
        }
    });
    if(data.next){
        getProducts();
    } else {
        calcWeights();
    };
};

async function calcWeights(){
    acProducts.forEach(product => {
        let parcel = product.size;
        let dim = parcel.length/100 * parcel.height/100 * parcel.width/100;
        let cubicWeight = (dim * 250) + product.weight/1000;
        totalCubicWeight += cubicWeight;
    });

    avCubicWeight = Math.floor(totalCubicWeight / acProducts.length);
    console.log(Math.floor(totalCubicWeight), avCubicWeight);
};