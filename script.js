//constants
const CHANGE_AMOUNT = 0.03;
const CHANGE_RATE = 0.01;

//layout
const container = document.getElementById('container')

//cache
const elements = [];
let lastE = 0
for (let i = 0; i < container.children.length; i++) {
    const node = container.children[i]
    const p = Number.parseInt(node.getAttribute('p') || 100);
    const d = Number.parseInt(node.getAttribute('d') || 0);
    const f = Number.parseInt(node.getAttribute('f') || 3);

    const s = lastE + p;
    const e = s + d;

    lastE = e;

    elements.push({
        n: node,
        s: s,
        e: e,
        l: d,
        f: d / f,
    })
}

//observers
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
    duration: lastE,
    triggerElement: container,
    triggerHook: 0
})
    .setPin(container)
    .addTo(controller)

//events
let target = 0
let current = 0
scene.on('update', e => {
    target = e.scrollPos
})
setInterval(() => {
    const pos = current += Math.round((target - current) * CHANGE_AMOUNT);

    elements.forEach(element => {
        if (pos < element.s || pos > element.e)
            element.n.style.opacity = 0;
        else {
            const x = pos - element.s;

            element.n.style.opacity =
                x < element.f ? x / element.f :
                    x > element.f ? (element.l - x) / element.f :
                        1;
        }
    });
}, CHANGE_RATE);
