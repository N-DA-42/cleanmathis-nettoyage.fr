// --- TES RÉGLAGES ---
const DOT_OFFSET_X = 9;   
const DOT_OFFSET_Y = -15; 

// RESET SCROLL
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// --- DÉMARRAGE ---
let animationStarted = false;

function safeStart() {
    if (animationStarted) return; 
    animationStarted = true;
    setTimeout(playCinematicIntro, 100);
}

if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(safeStart).catch(safeStart);
} else {
    window.addEventListener('load', safeStart);
}
setTimeout(safeStart, 3000);


// --- GPS ---
function getTargetPosition() {
    const targetI = document.getElementById("target-i");
    if (!targetI) return { docX: 0, docY: 0, rect: { top:0, left:0, width:0 } };

    const rect = targetI.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;

    const docX = rect.left + (rect.width / 2) + DOT_OFFSET_X;
    const docY = rect.top + scrollY + DOT_OFFSET_Y;

    return { docX, docY, rect };
}


function playCinematicIntro() {
    window.scrollTo(0, 0);

    const loaderText = document.getElementById("loader-text");
    const loaderCircle = document.getElementById("loader-circle");
    const loaderOverlay = document.getElementById("loader-overlay");
    const titleWrapper = document.getElementById("title-wrapper");
    const mainTitle = document.querySelector(".main-title");

    gsap.delayedCall(2, () => {
        // --- SETUP ---
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
            position: "fixed",
            top: endRectTitle.top, left: endRectTitle.left, width: endRectTitle.width,
            margin: 0, fontSize: window.getComputedStyle(titleWrapper.parentElement).fontSize,
            lineHeight: 1.1, fontWeight: 800, color: "#ffffff",
            zIndex: 10001, className: "clone-element", textAlign: "center",
            transformOrigin: "center center", 
            x: startCenterX - endCenterX, y: startCenterY - endCenterY,
            scale: scaleRatio, textShadow: "0 0 20px #ff6b35, 0 0 40px #ff6b35",
            pointerEvents: "none"
        });

        const startRectCircle = loaderCircle.getBoundingClientRect();
        const cloneCircle = loaderCircle.cloneNode(true);
        document.body.appendChild(cloneCircle);
        
        gsap.set(cloneCircle, {
            position: "fixed",
            top: startRectCircle.top, left: startRectCircle.left,
            width: startRectCircle.width, height: startRectCircle.height,
            margin: 0, zIndex: 10002, className: "clone-element",
            border: "2px solid transparent", borderTopColor: "#ff6b35", borderRightColor: "#ff6b35",
            rotation: 0, pointerEvents: "none"
        });

        loaderText.style.opacity = 0;
        loaderCircle.style.opacity = 0;
        gsap.to(loaderOverlay, { backgroundColor: "transparent", duration: 1 });

        // --- ANIMATION ---
        gsap.to(cloneText, { x: 0, y: 0, scale: 1, duration: 2, ease: "power3.inOut" });
        gsap.to(cloneText, {
            textShadow: "0 0 0px rgba(255, 107, 53, 0)", duration: 1.5, delay: 0.5, ease: "power2.out",
            onComplete: () => {
                titleWrapper.style.color = "#fff";
                document.getElementById("target-i").style.color = "#fff";
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

        // UI
        const nav = document.querySelector("nav");
        const subtitle = document.querySelector(".subtitle-hero");
        const scrollDown = document.querySelector(".scroll-down");
        gsap.to([nav, subtitle, scrollDown], { opacity: 1, y: 0, duration: 1, delay: 1.8, stagger: 0.2 });
        gsap.delayedCall(2.2, () => { loaderOverlay.style.display = 'none'; });
    });
}


// --- SCROLL SYSTEM (Fix Trajectoire) ---
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
            // CORRECTION DE LA COURBE ICI
            // On s'assure que les points de contrôle ne sont pas trop violents
            const sectionServices = document.querySelector('#services');
            const sectionSolution = document.querySelector('#solution');

            // On vérifie si les sections existent (sécurité)
            const s1 = sectionServices ? sectionServices.offsetTop + 200 : height/3;
            const s2 = sectionSolution ? sectionSolution.offsetTop : height/2;
            
            // Calcul d'une force de courbe adaptée à la distance
            const dist = s2 - s1; 
            const curveStrength = Math.min(Math.abs(dist) / 2, 200); // Max 200px de poignée

            // Courbe plus douce : On part du centre (cx), on va à gauche, puis on revient
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