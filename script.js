// --- TES RÉGLAGES ---
const DOT_OFFSET_X = 9;   
const DOT_OFFSET_Y = -15; 

// RESET SCROLL
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// --- LOGIQUE DE DÉMARRAGE ULTRA-RAPIDE (ANTI-FLASH) ---
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

// --- BASE DE DONNÉES GAGA XXL (REFERENCEMENT MASSIF) ---
const carDB = {
    citadine: [
        // RENAULT / DACIA / ALPINE
        'clio', 'clio 1', 'clio 2', 'clio 3', 'clio 4', 'clio 5', 'twingo', 'twingo 1', 'twingo 2', 'twingo 3', 'zoe', 'modus', 'grand modus', 'wind', 'r5', 'super 5', 'sandero', 'sandero stepway', 'spring', 'logan', 'a110',
        // PEUGEOT / CITROEN / DS
        '208', 'e-208', '207', '207 cc', '207 sw', '206', '206 cc', '206+', '108', '107', '106', '1007', '205', 'ion', 'c3', 'c3 pluriel', 'c2', 'c1', 'ds3', 'ds 3', 'ami', 'saxo', 'ax', 'c-zero', 'e-mehari',
        // VW GROUP (VW, SEAT, SKODA, AUDI)
        'polo', 'up', 'e-up', 'lupo', 'fox', 'fabia', 'citigo', 'felicia', 'ibiza', 'mii', 'arosa', 'a1', 'a2', 's1',
        // FIAT / ALFA / LANCIA / ABARTH
        '500', 'fiat 500', '500e', '500c', 'panda', 'punto', 'grande punto', 'punto evo', 'tipo', 'bravo', 'brava', 'stilo', 'mito', 'ypsilon', 'seicento', 'cinquecento', 'abarth 500', 'abarth 595', 'abarth 695',
        // FORD / OPEL
        'fiesta', 'ka', 'ka+', 'streetka', 'corsa', 'corsa-e', 'adam', 'karl', 'agila', 'tigra', 'tigra twintop',
        // TOYOTA / ASIATIQUES
        'yaris', 'yaris gr', 'aygo', 'aygo x', 'iq', 'starlet', 'micra', 'pixo', 'cube', 'swift', 'swift sport', 'ignis', 'alto', 'celerio', 'splash', 'baleno', 'picanto', 'rio', 'i10', 'i20', 'getz', 'atos', 'jazz', 'honda e', 'logo', 'colt', 'space star', 'mazda 2', 'demio', 'sirion', 'trevis', 'cuore',
        // PREMIUM / AUTRES
        'mini', 'mini cooper', 'mini one', 'mini cabrio', 'smart', 'fortwo', 'forfour', 'roadster'
    ],
    berline: [
        // RENAULT / DACIA
        'megane', 'megane e-tech', 'talisman', 'laguna', 'fluence', 'latitude', 'safrane', 'vel satis', 'logan mcv',
        // PEUGEOT / CITROEN / DS
        '308', 'e-308', '307', '307 cc', '306', '408', '508', '508 pse', '407', '407 coupé', '406', '406 coupé', '607', 'c4', 'e-c4', 'c4 x', 'c5', 'c5 x', 'ds4', 'ds 4', 'ds5', 'ds 5', 'ds 9', 'xsara', 'xantia', 'xm', 'c6', 'c-elysee',
        // VW GROUP
        'golf', 'golf gte', 'golf gti', 'golf r', 'passat', 'passat cc', 'arteon', 'jetta', 'bora', 'eos', 'scirocco', 'beetle', 'new beetle', 'coccinelle', 'id.3', 'id.4', 'id.5', 'id.7', 'leon', 'cupra leon', 'toledo', 'exeo', 'cordoba', 'octavia', 'superb', 'rapid', 'scala', 'a3', 'rs3', 's3', 'a4', 'rs4', 's4', 'a5', 'rs5', 's5', 'a6', 'rs6', 's6', 'a7', 'rs7', 's7', 'a8', 's8', 'tt', 'tts', 'ttrs', 'r8',
        // BMW / MERCEDES
        'serie 1', 'm1', 'serie 2', 'm2', 'serie 3', 'm3', 'serie 4', 'm4', 'serie 5', 'm5', 'serie 6', 'm6', 'serie 7', 'serie 8', 'm8', 'i3', 'i4', 'i5', 'i7', 'z3', 'z4', 'classe a', 'a35', 'a45', 'classe c', 'c43', 'c63', 'classe e', 'e53', 'e63', 'classe s', 'cla', 'cls', 'clk', 'slk', 'slc', 'sl', 'classe b', 'eqe', 'eqs',
        // FORD / OPEL
        'focus', 'focus st', 'focus rs', 'mondeo', 'astra', 'insignia', 'vectra', 'omega', 'calibra', 'gt', 'mustang', 'mach-e',
        // TOYOTA / ASIATIQUES
        'corolla', 'auris', 'prius', 'avensis', 'camry', 'mirai', 'supra', 'gt86', 'gr86', 'celica', 'mr2', 'civic', 'type r', 'accord', 'cr-z', 'insight', 'mazda 3', 'mazda 6', 'mx-5', 'rx-8', 'impreza', 'wrx', 'wrx sti', 'levorg', 'brz', 'legacy', 'outback', 'forester', 'ceed', 'proced', 'stinger', 'optima', 'ev6', 'i30', 'i30 n', 'ioniq', 'ioniq 5', 'ioniq 6', 'elantra', 'i40', 'genesis', 'pulsar', 'leaf', '350z', '370z', 'gtr', 'primera', 'almera',
        // TESLA / LUXE / AUTRES
        'model 3', 'model s', 'roadster', 'giulia', '147', '156', '159', 'brera', 'gt', 'giulietta', '4c', '8c', 'delta', 'thema', 'lybra', 'xe', 'xf', 'xj', 'f-type', 'xk', 'ghibli', 'quattroporte', 'taycan', 'panamera', 's60', 's90', 'v40', 'v60', 'v90', 'c30', 'c70', 'polestar 2'
    ],
    suv: [
        // RENAULT / DACIA / ALPINE
        'captur', 'arkana', 'austral', 'rafale', 'symbioz', 'kadjar', 'koleos', 'scenic', 'grand scenic', 'espace', 'kangoo', 'traffic', 'duster', 'jogger', 'lodgy', 'dokker',
        // PEUGEOT / CITROEN / DS
        '2008', 'e-2008', '3008', 'e-3008', '5008', 'e-5008', '4008', 'rifter', 'partner', 'traveller', 'expert', 'berlingo', 'spacetourer', 'jumpy', 'c3 aircross', 'c4 aircross', 'c5 aircross', 'c4 cactus', 'picasso', 'c3 picasso', 'c4 picasso', 'grand c4 picasso', 'xsara picasso', 'c8', 'nemo', 'bipper', 'ds7', 'ds3 crossback', 'ds 3 crossback', 'ds 7', 'ds 7 crossback',
        // VW GROUP
        'tiguan', 'tiguan allspace', 't-roc', 't-cross', 'touareg', 'taigo', 'touran', 'sharan', 'caddy', 'multivan', 'transporter', 'california', 'amarok', 'q2', 'sq2', 'q3', 'rsq3', 'q3 sportback', 'q4', 'q4 e-tron', 'q5', 'sq5', 'q5 sportback', 'q7', 'sq7', 'q8', 'sq8', 'rsq8', 'e-tron', 'q8 e-tron', 'ateca', 'cupra ateca', 'arona', 'tarraco', 'formentor', 'cupra formentor', 'born', 'tavascan', 'karoq', 'kodiaq', 'kamiq', 'yeti', 'enyaq', 'roomster', 'macan', 'cayenne', 'cayenne coupé', 'urus', 'bentayga',
        // BMW / MERCEDES
        'x1', 'ix1', 'x2', 'ix2', 'x3', 'ix3', 'x4', 'x5', 'x6', 'x7', 'xm', 'gla', 'eqa', 'glb', 'eqb', 'glc', 'glc coupé', 'eqc', 'gle', 'gle coupé', 'eqe suv', 'gls', 'eqs suv', 'glk', 'ml', 'g-class', 'classe g', 'vito', 'classe v', 'viano', 'citan',
        // FORD / OPEL
        'kuga', 'puma', 'ecosport', 'edge', 'explorer', 'ranger', 'raptor', 'bronco', 'c-max', 'grand c-max', 's-max', 'galaxy', 'tourneo', 'mokka', 'mokka x', 'mokka-e', 'crossland', 'crossland x', 'grandland', 'grandland x', 'zafira', 'zafira tourer', 'zafira life', 'meriva', 'antara', 'vivaro', 'combo', 'frontera',
        // TOYOTA / ASIATIQUES
        'yaris cross', 'c-hr', 'rav4', 'highlander', 'land cruiser', 'hilux', 'bz4x', 'corolla cross', 'verso', 'proace', 'qashqai', 'juke', 'x-trail', 'aria', 'pathfinder', 'navara', 'murano', 'tucson', 'kona', 'santa fe', 'bayon', 'nexo', 'staria', 'sportage', 'niro', 'sorento', 'stonic', 'xceed', 'soul', 'ev9', 'cx-3', 'cx-30', 'cx-5', 'cx-60', 'cx-80', 'mx-30', 'cr-v', 'hr-v', 'zr-v', 'e:ny1', 'vitara', 's-cross', 'jimny', 'ignis suv', 'across', 'swace', 'korando', 'rexton', 'tivoli', 'musso',
        // TESLA / LUXE / AUTRES
        'model y', 'model x', 'cybertruck', '500x', '500l', '600', '600e', 'doblo', 'qubo', 'freemont', 'multipla', 'ulysse', 'renegade', 'compass', 'cherokee', 'grand cherokee', 'wrangler', 'gladiator', 'avenger', 'evoque', 'velar', 'range rover', 'range rover sport', 'discovery', 'discovery sport', 'defender', 'f-pace', 'e-pace', 'i-pace', 'stelvio', 'tonale', 'levante', 'grecale', 'xc40', 'xc60', 'xc90', 'c40', 'ex30', 'ex90', 'v90 cross country', 'dbx', 'purosangue', 'cullinan'
    ]
};

// --- LE RESTE DU CODE (ANIMATIONS & SCROLL) ---
let animationStarted = false;

function safeStart() {
    if (animationStarted) return; 
    animationStarted = true;

    if (skipIntro) {
        fastIntro();
    } else {
        setTimeout(playCinematicIntro, 100);
    }
}

if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(safeStart).catch(safeStart);
} else {
    window.addEventListener('load', safeStart);
}
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

        gsap.set(cloneText, {
            position: "fixed", top: endRectTitle.top, left: endRectTitle.left, width: endRectTitle.width,
            margin: 0, fontSize: window.getComputedStyle(titleWrapper.parentElement).fontSize,
            lineHeight: 1.1, fontWeight: 800, color: "#ffffff",
            zIndex: 10001, className: "clone-element", textAlign: "center",
            transformOrigin: "center center", 
            x: startCenterX - endCenterX, y: startCenterY - endCenterY,
            scale: scaleRatio, textShadow: "0 0 20px #ff6b35, 0 0 40px #ff6b35", pointerEvents: "none"
        });

        const startRectCircle = loaderCircle.getBoundingClientRect();
        const cloneCircle = loaderCircle.cloneNode(true);
        document.body.appendChild(cloneCircle);
        gsap.set(cloneCircle, {
            position: "fixed", top: startRectCircle.top, left: startRectCircle.left,
            width: startRectCircle.width, height: startRectCircle.height,
            margin: 0, zIndex: 10002, className: "clone-element",
            border: "2px solid transparent", borderTopColor: "#ff6b35", borderRightColor: "#ff6b35",
            rotation: 0, pointerEvents: "none"
        });

        loaderText.style.opacity = 0;
        loaderCircle.style.opacity = 0;
        gsap.to(loaderOverlay, { backgroundColor: "transparent", duration: 1 });

        gsap.to(cloneText, { x: 0, y: 0, scale: 1, duration: 2, ease: "power3.inOut" });
        gsap.to(cloneText, {
            textShadow: "0 0 0px rgba(255, 107, 53, 0)", duration: 1.5, delay: 0.5, ease: "power2.out",
            onComplete: () => {
                titleWrapper.style.color = "#fff";
                targetI.style.color = "#fff";
                mainTitle.style.color = "#fff";
                cloneText.remove();
            }
        });

        gsap.to(cloneCircle, { rotation: 0, duration: 0.5 });
        gsap.to(cloneCircle, {
            top: () => {
                const pos = getTargetPosition();
                return (pos.rect.top + DOT_OFFSET_Y) - 5; 
            },
            left: () => {
                const pos = getTargetPosition();
                return (pos.rect.left + (pos.rect.width/2) + DOT_OFFSET_X) - 5;
            },
            width: 10, height: 10, borderWidth: 0, backgroundColor: "#ffffff",
            boxShadow: "0 0 10px 2px #fff, 0 0 20px 10px #ff6b35", borderRadius: "50%",
            duration: 2, ease: "power3.inOut",
            onComplete: () => cloneCircle.remove()
        });

        gsap.to(cloneCircle, { opacity: 0, duration: 1, delay: 1, ease: "power1.in" });
        gsap.delayedCall(1.5, () => initScrollSystem(true)); 

        const nav = document.querySelector("nav");
        const subtitle = document.querySelector(".subtitle-hero");
        const scrollDown = document.querySelector(".scroll-down");
        gsap.to([nav, subtitle, scrollDown], { opacity: 1, y: 0, duration: 1, delay: 1.8, stagger: 0.2 });
        gsap.delayedCall(2.2, () => { loaderOverlay.style.display = 'none'; });
    });
}

function getTargetPosition() {
    const targetI = document.getElementById("target-i");
    if (!targetI) return { docX: 0, docY: 0, rect: { top:0, left:0, width:0 } };
    const rect = targetI.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    return { 
        docX: rect.left + (rect.width / 2) + DOT_OFFSET_X, 
        docY: rect.top + scrollY + DOT_OFFSET_Y, 
        rect 
    };
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
        const sx = pos.docX;
        const sy = pos.docY;
        const cx = width / 2;

        let d = `M ${sx} ${sy} `; 
        const dropY = sy + 150;
        d += `C ${sx} ${dropY}, ${cx} ${sy + 50}, ${cx} ${dropY} `;

        if (width > 768) {
            const s1 = document.querySelector('#services') ? document.querySelector('#services').offsetTop + 200 : height/3;
            const s2 = document.querySelector('#solution') ? document.querySelector('#solution').offsetTop : height/2;
            const dist = s2 - s1; 
            const curveStrength = Math.min(Math.abs(dist) / 2, 200);
            d += `C ${cx} ${s1 - curveStrength}, ${width * 0.3} ${s1 - curveStrength}, ${width * 0.3} ${s1} `;
            d += `C ${width * 0.3} ${s1 + curveStrength}, ${cx} ${s2 - curveStrength}, ${cx} ${s2} `;
            d += `L ${cx} ${height} `;
        } else {
            d += `L ${cx} ${height} `;
        }

        guideLine.setAttribute("d", d);
        litLine.setAttribute("d", d);

        gsap.set(orb, { x: sx, y: sy });
        
        if (shouldFadeIn) {
            gsap.set(orb, { opacity: 0 });
            gsap.to(orb, { opacity: 1, duration: 0.8, ease: "power2.out" });
            shouldFadeIn = false; 
        } else {
            gsap.set(orb, { opacity: 1 });
        }

        gsap.to(orb, {
            scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.5 },
            motionPath: { path: "#guide-line", align: "#guide-line", alignOrigin: [0.5, 0.5], autoRotate: false },
            ease: "none"
        });

        const len = litLine.getTotalLength();
        litLine.style.strokeDasharray = len;
        litLine.style.strokeDashoffset = len;
        gsap.to(litLine, {
            scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.5 },
            strokeDashoffset: 0,
            ease: "none"
        });

        document.querySelectorAll('.reveal-text').forEach(text => {
            text.classList.remove('visible'); 
            ScrollTrigger.create({
                trigger: text, start: "top 85%", onEnter: () => text.classList.add('visible')
            });
        });
        
        ScrollTrigger.refresh();
    }

    drawPath();

    if (resizeObserver) resizeObserver.disconnect();
    resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(() => drawPath());
    });
    resizeObserver.observe(document.body);
}

// FONCTION RECHERCHE VOITURE (CORRIGÉE POUR LA NOUVELLE DB)
function searchCar() {
    const input = document.getElementById('car-input').value.toLowerCase().trim();
    const feedback = document.getElementById('car-feedback');
    
    if(input.length < 2) {
        feedback.innerHTML = "";
        return;
    }

    let found = null;
    let categoryName = "";

    // On parcourt la grosse base de données
    if(carDB.citadine.some(car => input.includes(car))) { found = 'citadine'; categoryName = "Citadine détectée !"; }
    else if(carDB.berline.some(car => input.includes(car))) { found = 'berline'; categoryName = "Berline détectée !"; }
    else if(carDB.suv.some(car => input.includes(car))) { found = 'suv'; categoryName = "SUV/4x4/Monospace détecté !"; }

    if(found) {
        feedback.innerHTML = `<span style="color:#4caf50; font-weight:bold;">✨ ${categoryName}</span>`;
        if(found === 'citadine') document.getElementById('default-vehicle').click();
        if(found === 'berline') document.getElementById('btn-berline').click();
        if(found === 'suv') document.getElementById('btn-suv').click();
    } else {
        feedback.innerHTML = "<span style='color:#aaa;'>Modèle non reconnu, sélectionnez manuellement ci-dessous.</span>";
    }
}

// FONCTION MENU MOBILE
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active-menu');
}

// Fermer le menu si on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active-menu');
    });
});

