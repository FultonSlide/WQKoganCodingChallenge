const button = document.querySelector('button');

let tl = gsap.timeline({});
let tlCalc = gsap.timeline({repeat:-1});
let tl2 = gsap.timeline({repeat: -1});
let master = gsap.timeline();

const beginning = () => {
    tl.from('#Ground', {x: '-400', duration: 1, opacity: 0, ease: "power2.out", delay: 0.8})
      .from('#BackCircle1', {x: '800', duration: .4, opacity: 0, ease: "power2.out"}, "-=.7")
      .from('#BackCircle2', {x: '-800', druation: .2, opacity: 0, ease: "power2.out"}, "-=.5")
      .from('#Parcel', {y: '-800', duration: 0.8, opacity: 0, rotation: -20, transformOrigin: '50% 50%', ease: "bounce.out"})
      .from('#LidRight', {rotation: -195, duration: 0.8, transformOrigin: "0% 0%", opacity: 1, ease: "elastic.out(1, 0.75)"})
      .from('#LidLeft', {rotation: 200, duration: 0.8, transformOrigin: "100% 0%", opacity: 1, ease: "elastic.out(1, 0.75)"}, "-=.7")
      .to('#Items', {autoAlpha: 1, duration: 0.8, ease: "power1.out"})
      .to('.item', {autoAlpha: 1, duration: 0.8, ease: "power1.out"});
}

const middle = () => {
    tlCalc.to("#Calc", {duration: 0.8, autoAlpha: 1, ease: "none"})
          .to("#Calc", {duration: 0.8, autoAlpha: 0, ease: "none"});
}

const end = () => {
    tl2.set(".item", {y: (i) => i*350})
   .to(".item", {
        duration: 4,
        ease: "none",
        y: "+=1500",
        modifiers: {
            y: gsap.utils.unitize(y => parseFloat(y) % 1500)
        }
    });
}

master.add(beginning())
      .add(middle(), "+=5")
      .add(end(), ">");

getProducts()
    .then(() => {
        endTimeline();
    })
    .catch(err => console.log(err));

button.addEventListener('click', e => {
    endTimeline();
});

const endTimeline = () => {
    tl.to('#Items', {autoAlpha: 0, duration: 0.8, ease: "power1.out"})
      .to('.item', {autoAlpha: 0, duration: 0.8, ease: "power1.out", onComplete: closeBox});
}

const closeBox = () => {
    master.remove(tl2);
    tl.to('#LidRight', {rotation: -215, duration: 0.8, transformOrigin: "0% 0%", opacity: 1, ease: "bounce.out"})
      .to('#LidLeft', {rotation: 215, duration: 0.8, transformOrigin: "100% 0%", opacity: 1, ease: "bounce.out"}, "-=.7")
      .to('.msg', {duration: 0.7, autoAlpha: 0, ease: "power2.out"});

    tlCalc.to("#Calc", {duration: 0.8, autoAlpha: 0, ease: "none"}).repeat(0);

    gsap.to("#avCubicWeight", {duration: 1.5, autoAlpha: 1, scaleX: 1.2, scaleY: 1.2, ease: "elastic.out(1, 0.75)", delay: 1});
}


