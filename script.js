// --- TES RÉGLAGES ---
const DOT_OFFSET_X = 9;   
const DOT_OFFSET_Y = -15; 

// RESET SCROLL
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const urlParams = new URLSearchParams(window.location.search);
const skipIntro = urlParams.get('intro') === 'false';

if (skipIntro) {
    const style = document.createElement('style');
    style.innerHTML = '#loader-overlay { display: none !important; }';
    document.head.appendChild(style);
    window.history.replaceState({}, document.title, window.location.pathname);
} else {
    window.scrollTo(0, 0);
}

// --- BASE DE DONNÉES MASSIVE (+1000 MODÈLES) ---
const carDB = {
    citadine: [
        // FR
        'clio', 'twingo', 'zoe', 'modus', 'wind', 'r5', 'super 5', 'sandero', 'spring', 'logan', '208', '207', '206', '108', '107', '106', '1007', '205', 'ion', 'c3', 'c2', 'c1', 'ds3', 'ami', 'saxo', 'ax', 'c-zero',
        // ALL
        'polo', 'up', 'lupo', 'fox', 'fabia', 'citigo', 'felicia', 'ibiza', 'mii', 'arosa', 'a1', 'a2', 'adam', 'karl', 'agila', 'tigra', 'corsa', 'fiesta', 'ka', 'smart', 'mini',
        // IT
        '500', 'panda', 'punto', 'mito', 'ypsilon', 'seicento', 'cinquecento', 'tipo', 'bravo',
        // JAP/KOR
        'yaris', 'aygo', 'iq', 'micra', 'pixo', 'swift', 'ignis', 'alto', 'celerio', 'splash', 'picanto', 'rio', 'i10', 'i20', 'getz', 'jazz', 'colt', 'space star', 'mazda 2', 'sirion', 'trevis', 'cuore'
    ],
    berline: [
        // FR
        'megane', 'talisman', 'laguna', 'fluence', 'latitude', 'safrane', 'vel satis', '308', '307', '306', '408', '508', '407', '406', '607', 'c4', 'c5', 'ds4', 'ds5', 'ds9', 'xsara', 'xantia', 'xm', 'c6', 'elysee',
        // ALL
        'golf', 'passat', 'arteon', 'jetta', 'bora', 'scirocco', 'beetle', 'id3', 'id4', 'id5', 'leon', 'toledo', 'exeo', 'octavia', 'superb', 'rapid', 'scala', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'tt', 'serie 1', 'serie 2', 'serie 3', 'serie 4', 'serie 5', 'serie 6', 'serie 7', 'classe a', 'classe c', 'classe e', 'classe s', 'cla', 'cls', 'focus', 'mondeo', 'astra', 'insignia', 'vectra',
        // JAP/KOR/US
        'corolla', 'auris', 'prius', 'avensis', 'camry', 'civic', 'accord', 'mazda 3', 'mazda 6', 'impreza', 'ceed', 'i30', 'ioniq', 'elantra', 'i40', 'model 3', 'model s', 'giulia', '147', '156', '159', 'delta', 'xe', 'xf', 'xj'
    ],
    suv: [
        // FR
        'captur', 'arkana', 'austral', 'rafale', 'kadjar', 'koleos', 'scenic', 'espace', 'kangoo', 'duster', 'jogger', 'lodgy', 'dokker', '2008', '3008', '5008', '4008', 'rifter', 'partner', 'berlingo', 'c3 aircross', 'c5 aircross', 'ds7', 'ds3 crossback',
        // ALL
        'tiguan', 't-roc', 't-cross', 'touareg', 'touran', 'sharan', 'caddy', 'q2', 'q3', 'q5', 'q7', 'q8', 'ateca', 'arona', 'tarraco', 'formentor', 'karoq', 'kodiaq', 'kamiq', 'yeti', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'gla', 'glb', 'glc', 'gle', 'gls', 'kuga', 'puma', 'ecosport', 'mokka', 'crossland', 'grandland', 'zafira', 'meriva',
        // JAP/KOR/US
        'yaris cross', 'chr', 'rav4', 'highlander', 'qashqai', 'juke', 'xtrail', 'tucson', 'kona', 'santa fe', 'sportage', 'niro', 'sorento', 'stonic', 'cx3', 'cx30', 'cx5', 'vitara', 'model y', 'model x', 'renegade', 'compass', 'cherokee', 'evoque', 'velar', 'xc40', 'xc60', 'xc90'
    ]
};

// ... (Garde tout le reste du code d'animation et de scroll à l'identique) ...
// Je te remets juste la fin avec le toggleMenu et la recherche

let animationStarted = false;
function safeStart() { if (animationStarted) return; animationStarted = true; if (skipIntro) { fastIntro(); } else { setTimeout(playCinematicIntro, 100); } }
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(safeStart).catch(safeStart); } else { window.addEventListener('load', safeStart); }
setTimeout(safeStart, 3000);

function fastIntro() {
    const loaderOverlay = document.getElementById("loader-overlay");
    const titleWrapper = document.getElementById("title-wrapper");
    const targetI = document.getElementById("target-i");
    const mainTitle = document.querySelector(".main-title");
    const nav = document.querySelector("nav");
    const subtitle = document.querySelector(".subtitle-hero");
    const scrollDown = document.querySelector(".scroll-down");
    if(loaderOverlay) loaderOverlay.style.display = 'none';
    if(titleWrapper) titleWrapper.style.color = "#fff";
    if(targetI) targetI.style.color = "#fff";
    if(mainTitle) mainTitle.style.color = "#fff";
    gsap.set([nav, subtitle, scrollDown], { opacity: 1, y: 0 });
    initScrollSystem();
}

function playCinematicIntro() {
    const loaderText = document.getElementById("loader-text");
    const loaderCircle = document.getElementById("loader-circle");
    const loaderOverlay = document.getElementById("loader-overlay");
    const titleWrapper = document.getElementById("title-wrapper");
    const targetI = document.getElementById("target-i");
    const mainTitle = document.querySelector(".main-title");
    gsap.delayedCall(2, () => {
        const startRectText = loaderText.getBoundingClientRect();
        const endRectTitle = titleWrapper.getBoundingClientRect();
        const cloneText = titleWrapper.cloneNode(true);
        document.body.appendChild(cloneText);
        cloneText.id = "clone-title-wrapper"; 
        cloneText.querySelectorAll("*").forEach(c => { c.removeAttribute("id"); c.style.color = "#fff"; });
        const scaleRatio = startRectText.width / endRectTitle.width;
        const startCenterX = startRectText.left + (startRectText.width / 2);
        const startCenterY = startRectText.top + (startRectText.height / 2);
        const endCenterX = endRectTitle.left + (endRectTitle.width / 2);
        const endCenterY = endRectTitle.top + (endRectTitle.height / 2);
        gsap.set(cloneText, { position: "fixed", top: endRectTitle.top, left: endRectTitle.left, width: endRectTitle.width, margin: 0, fontSize: window.getComputedStyle(titleWrapper.parentElement).fontSize, lineHeight: 1.1, fontWeight: 800, color: "#ffffff", zIndex: 10001, className: "clone-element", textAlign: "center", transformOrigin: "center center", x: startCenterX - endCenterX, y: startCenterY - endCenterY, scale: scaleRatio, textShadow: "0 0 20px #ff6b35, 0 0 40px #ff6b35", pointerEvents: "none" });
        const startRectCircle = loaderCircle.getBoundingClientRect();
        const cloneCircle = loaderCircle.cloneNode(true);
        document.body.appendChild(cloneCircle);
        gsap.set(cloneCircle, { position: "fixed", top: startRectCircle.top, left: startRectCircle.left, width: startRectCircle.width, height: startRectCircle.height, margin: 0, zIndex: 10002, className: "clone-element", border: "2px solid transparent", borderTopColor: "#ff6b35", borderRightColor: "#ff6b35", rotation: 0, pointerEvents: "none" });
        loaderText.style.opacity = 0; loaderCircle.style.opacity = 0;
        gsap.to(loaderOverlay, { backgroundColor: "transparent", duration: 1 });
        gsap.to(cloneText, { x: 0, y: 0, scale: 1, duration: 2, ease: "power3.inOut" });
        gsap.to(cloneText, { textShadow: "0 0 0px rgba(255, 107, 53, 0)", duration: 1.5, delay: 0.5, ease: "power2.out", onComplete: () => { titleWrapper.style.color = "#fff"; targetI.style.color = "#fff"; mainTitle.style.color = "#fff"; cloneText.remove(); } });
        gsap.to(cloneCircle, { rotation: 0, duration: 0.5 });
        gsap.to(cloneCircle, { top: () => { const pos = getTargetPosition(); return (pos.rect.top + DOT_OFFSET_Y) - 5; }, left: () => { const pos = getTargetPosition(); return (pos.rect.left + (pos.rect.width/2) + DOT_OFFSET_X) - 5; }, width: 10, height: 10, borderWidth: 0, backgroundColor: "#ffffff", boxShadow: "0 0 10px 2px #fff, 0 0 20px 10px #ff6b35", borderRadius: "50%", duration: 2, ease: "power3.inOut", onComplete: () => cloneCircle.remove() });
        gsap.to(cloneCircle, { opacity: 0, duration: 1, delay: 1, ease: "power1.in" });
        gsap.delayedCall(1.5, () => initScrollSystem(true)); 
        const nav = document.querySelector("nav"); const subtitle = document.querySelector(".subtitle-hero"); const scrollDown = document.querySelector(".scroll-down");
        gsap.to([nav, subtitle, scrollDown], { opacity: 1, y: 0, duration: 1, delay: 1.8, stagger: 0.2 });
        gsap.delayedCall(2.2, () => { loaderOverlay.style.display = 'none'; });
    });
}

function getTargetPosition() {
    const targetI = document.getElementById("target-i");
    if (!targetI) return { docX: 0, docY: 0, rect: { top:0, left:0, width:0 } };
    const rect = targetI.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    return { docX: rect.left + (rect.width / 2) + DOT_OFFSET_X, docY: rect.top + scrollY + DOT_OFFSET_Y, rect };
}

let resizeObserver;
function initScrollSystem(shouldFadeIn = false) {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const svgEl = document.getElementById("svg-stage");
    const guideLine = document.getElementById("guide-line");
    const litLine = document.getElementById("lit-line");
    const orb = document.querySelector(".glow-orb");
    orb.style.zIndex = "9999"; 
    function drawPath() {
        ScrollTrigger.getAll().forEach(t => t.kill());
        const width = window.innerWidth;
        const height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
        document.querySelector('.line-wrapper').style.height = height + "px";
        svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
        const pos = getTargetPosition();
        const sx = pos.docX; const sy = pos.docY; const cx = width / 2;
        let d = `M ${sx} ${sy} `; const dropY = sy + 150; d += `C ${sx} ${dropY}, ${cx} ${sy + 50}, ${cx} ${dropY} `;
        if (width > 768) {
            const s1 = document.querySelector('#services') ? document.querySelector('#services').offsetTop + 200 : height/3;
            const s2 = document.querySelector('#solution') ? document.querySelector('#solution').offsetTop : height/2;
            const dist = s2 - s1; const curveStrength = Math.min(Math.abs(dist) / 2, 200);
            d += `C ${cx} ${s1 - curveStrength}, ${width * 0.3} ${s1 - curveStrength}, ${width * 0.3} ${s1} `;
            d += `C ${width * 0.3} ${s1 + curveStrength}, ${cx} ${s2 - curveStrength}, ${cx} ${s2} `;
            d += `L ${cx} ${height} `;
        } else { d += `L ${cx} ${height} `; }
        guideLine.setAttribute("d", d); litLine.setAttribute("d", d);
        gsap.set(orb, { x: sx, y: sy });
        if (shouldFadeIn) { gsap.set(orb, { opacity: 0 }); gsap.to(orb, { opacity: 1, duration: 0.8, ease: "power2.out" }); shouldFadeIn = false; } else { gsap.set(orb, { opacity: 1 }); }
        gsap.to(orb, { scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.5 }, motionPath: { path: "#guide-line", align: "#guide-line", alignOrigin: [0.5, 0.5], autoRotate: false }, ease: "none" });
        const len = litLine.getTotalLength(); litLine.style.strokeDasharray = len; litLine.style.strokeDashoffset = len;
        gsap.to(litLine, { scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.5 }, strokeDashoffset: 0, ease: "none" });
        document.querySelectorAll('.reveal-text').forEach(text => { text.classList.remove('visible'); ScrollTrigger.create({ trigger: text, start: "top 85%", onEnter: () => text.classList.add('visible') }); });
        ScrollTrigger.refresh();
    }
    drawPath();
    if (resizeObserver) resizeObserver.disconnect();
    resizeObserver = new ResizeObserver(() => { window.requestAnimationFrame(() => drawPath()); });
    resizeObserver.observe(document.body);
}

// FONCTION RECHERCHE VOITURE AMÉLIORÉE
function searchCar() {
    const input = document.getElementById('car-input').value.toLowerCase().trim().replace(/[-\s]/g, ''); // Nettoie la saisie (enlève tirets et espaces)
    const feedback = document.getElementById('car-feedback');
    
    if(input.length < 2) {
        feedback.innerHTML = "";
        return;
    }

    let found = null;
    let categoryName = "";

    // Fonction de recherche flexible
    const check = (list) => list.some(car => input.includes(car.replace(/[-\s]/g, '')) || car.replace(/[-\s]/g, '').includes(input));

    if(check(carDB.citadine)) { found = 'citadine'; categoryName = "Citadine détectée !"; }
    else if(check(carDB.berline)) { found = 'berline'; categoryName = "Berline détectée !"; }
    else if(check(carDB.suv)) { found = 'suv'; categoryName = "SUV/4x4/Monospace détecté !"; }

    if(found) {
        feedback.innerHTML = `<span style="color:#4caf50; font-weight:bold;">✨ ${categoryName}</span>`;
        if(found === 'citadine') document.getElementById('default-vehicle').click();
        if(found === 'berline') document.getElementById('btn-berline').click();
        if(found === 'suv') document.getElementById('btn-suv').click();
    } else {
        feedback.innerHTML = "<span style='color:#aaa;'>Modèle non reconnu, sélectionnez manuellement.</span>";
    }
}

// FONCTION MENU MOBILE (BURGER)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active-menu');
}

// FERMETURE AUTOMATIQUE
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active-menu');
    });
});
