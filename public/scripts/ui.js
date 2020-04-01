const cubicWeight = document.querySelector('#avCubicWeight');

let master = gsap.timeline();
let packingTL = gsap.timeline({});
let calcTL = gsap.timeline({repeat:-1});
let productsTL = gsap.timeline({repeat: -1});
let weight = {val:0};

//Intro animation of shipping package being packaged with coloured shapes
const packing = () => {
    packingTL.from('#Ground', {x: '-400', duration: 1, opacity: 0, ease: "power2.out", delay: 0.8})
      .from('#BackCircle1', {x: '800', duration: .4, opacity: 0, ease: "power2.out"}, "-=.7")
      .from('#BackCircle2', {x: '-800', duration: .2, opacity: 0, ease: "power2.out"}, "-=.5")
      .from('#Parcel', {y: '-800', duration: 0.8, opacity: 0, rotation: -20, transformOrigin: '50% 50%', ease: "bounce.out"})
      .from('#LidRight', {rotation: -195, duration: 0.8, transformOrigin: "0% 0%", opacity: 1, ease: "elastic.out(1, 0.75)"})
      .from('#LidLeft', {rotation: 200, duration: 0.8, transformOrigin: "100% 0%", opacity: 1, ease: "elastic.out(1, 0.75)"}, "-=.7")
      .to('.item', {autoAlpha: 1, duration: 1});
}

//Average cubic weight calculation loading animation loop
const calculating = () => {
    calcTL.to("#Calc", {duration: 0.8, autoAlpha: 1, ease: "none"})
          .to("#Calc", {duration: 0.8, autoAlpha: 0, ease: "none"});
}


//Items filling the package animation loop
const filling = () => {
    productsTL.set(".item", {y: (i) => i*350})
              .to(".item", {
                duration: 4,
                ease: "none",
                y: "+=1500",
                modifiers: {
                    y: gsap.utils.unitize(y => parseFloat(y) % 1500)
                }
              });
}

//Updates the average cubic weight of AC products
const updateHandler = () => {
    cubicWeight.innerHTML = weight.val + 'Kg';
}

//Wraps up the packing animation
const endAnimation = (data) => {
    packingTL.to('.item', {autoAlpha: 0, duration: 0.8, ease: "power1.out", onComplete: displayData, onCompleteParams:[data]});
}

//Wraps up animation and renders the average cubic weight of AC products to the DOM
const displayData = (data) => {
    master.remove(productsTL);
    packingTL.to('#LidRight', {rotation: -215, duration: 0.8, transformOrigin: "0% 0%", opacity: 1, ease: "bounce.out"})
      .to('#LidLeft', {rotation: 215, duration: 0.8, transformOrigin: "100% 0%", opacity: 1, ease: "bounce.out"}, "-=.7")
      .to("#avCubicWeight", {duration: 3, autoAlpha: 1, scaleX: 1.6, scaleY: 1.6, ease: "elastic.out(1, 0.75)"})
      .fromTo('.msg', {autoAlpha: 0, x: -1000}, {duration: 0.8, autoAlpha: 1, x: 0, ease: "power2.out"}, "-=3")
      .to(weight, 2, {val:data, roundProps:"val", onUpdate:updateHandler, ease:Linear.easeNone}, "-=4");

    calcTL.to("#Calc", {duration: 0.8, autoAlpha: 0, ease: "none"}).repeat(0);
}

//Master timeline with the 3 main animations added
master.add(packing())
      .add(calculating(), "+=5")
      .add(filling(), ">");

//Promise that resolves with the average cubic weight of AC products
getWeight.then(data => endAnimation(data))
         .catch(err => console.log(err));


