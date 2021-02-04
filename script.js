//constants
const INITIAL_STATE = 1600;
const CHANGE_AMOUNT = 0.03;
const CHANGE_RATE = 0.01;
const CHANGE_TIMEOUT = 3000;

//layout
const container = document.getElementById('container');
const elements = [];
let lastE = 0;

//lookup
r_register(container);

//observers
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
    duration: lastE,
    triggerElement: container,
    triggerHook: 0
})
    .setPin(container)
    .addTo(controller)

//initiate
if (controller.scrollPos() === 0)
    controller.scrollTo(INITIAL_STATE)

//events
let target = INITIAL_STATE
let current = INITIAL_STATE
let worker = 0;
scene.on('update', e => {
    target = e.scrollPos
    if (!worker) {
        worker = setInterval(r_refresh, CHANGE_RATE);
        setTimeout(r_sleep, CHANGE_TIMEOUT);
    }
})

//functions
function r_register(node) {
    console.log("registered " + node)
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i]

        if (!child.hasAttribute("ignore")) {
            const p = Number.parseInt(child.getAttribute('p') || 100);
            const d = Number.parseInt(child.getAttribute('d') || 0);
            const f = Number.parseInt(child.getAttribute('f') || 3);

            const s = lastE + p;
            const e = s + d;

            lastE = e;

            elements.push({
                n: child,
                d: child.style.display,
                s: s,
                e: e,
                l: d,
                f: d / f,
            })
        }
        if (child.hasAttribute('recursive'))
            register(child);
    }
}

function r_refresh() {
    const pos = current += Math.round((target - current) * CHANGE_AMOUNT);

    elements.forEach(element => {
        if (pos < element.s || pos > element.e) {
            element.n.style.opacity = 0;
            element.n.style.display = 'none';
        } else {
            const x = pos - element.s;

            element.n.style.display = element.d;
            element.n.style.opacity =
                x < element.f ? x / element.f :
                    x > element.f ? (element.l - x) / element.f :
                        1;
        }
    });
}

function r_sleep() {
    clearInterval(worker);
    worker = 0;
}
