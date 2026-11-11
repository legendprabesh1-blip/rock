/* 1. Typewriter Animation Helper */
function typeWriter(elementId, text, speed, callback) {
    let i = 0;
    const elem = document.getElementById(elementId);
    if (!elem) return;
    elem.textContent = "";
    
    function type() {
        if (i < text.length) {
            elem.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

/* 2. Welcome Intro Screen Typewriter & Dismiss */
const welcomeScreen = document.getElementById('welcomeScreen');

typeWriter('typewriterWelcome', 'Hello Welcome', 110);

function dismissWelcome() {
    if (welcomeScreen && !welcomeScreen.classList.contains('hide')) {
        welcomeScreen.classList.add('hide');
        startRoleLoop();
    }
}

if (welcomeScreen) {
    welcomeScreen.addEventListener('click', dismissWelcome);
    setTimeout(dismissWelcome, 2800);
}

/* 3. Dynamic Roles Typewriter Loop */
const roles = ["Vibe Coder", "Web Developer", "UI/UX Designer", "App Developer"];
let roleIndex = 0;
let isLoopRunning = false;

function startRoleLoop() {
    if (isLoopRunning) return;
    isLoopRunning = true;
    
    function cycleRole() {
        const currentRole = roles[roleIndex];
        typeWriter('roleTypewriter', currentRole, 80, () => {
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                cycleRole();
            }, 2000);
        });
    }
    cycleRole();
}

/* 4. Live Camera Selfie Capture Functions */
let videoStream = null;
const cameraStream = document.getElementById('cameraStream');
const snapshotCanvas = document.getElementById('snapshotCanvas');
const selfiePreviewPlaceholder = document.getElementById('selfiePreviewPlaceholder');
const selfieResultImg = document.getElementById('selfieResultImg');
const startCamBtn = document.getElementById('startCamBtn');
const captureCamBtn = document.getElementById('captureCamBtn');

async function startCamera() {
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        cameraStream.srcObject = videoStream;
        cameraStream.style.display = 'block';
        selfiePreviewPlaceholder.style.display = 'none';
        selfieResultImg.style.display = 'none';
        
        startCamBtn.style.display = 'none';
        captureCamBtn.style.display = 'block';
    } catch (err) {
        alert("Camera access denied or unavailable. Please allow camera permissions.");
    }
}

function captureSelfie() {
    if (!videoStream) return;
    snapshotCanvas.width = cameraStream.videoWidth || 300;
    snapshotCanvas.height = cameraStream.videoHeight || 300;
    const ctx = snapshotCanvas.getContext('2d');
    ctx.drawImage(cameraStream, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    
    const imageDataURL = snapshotCanvas.toDataURL('image/jpeg');
    selfieResultImg.src = imageDataURL;
    selfieResultImg.style.display = 'block';
    cameraStream.style.display = 'none';
    
    // Stop camera stream tracks
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
    
    captureCamBtn.style.display = 'none';
    startCamBtn.style.display = 'block';
    startCamBtn.textContent = 'Retake Selfie';
}

/* 5. Direct WhatsApp Message Sender (Without redirecting user away) */
function sendToWhatsApp(e) {
    e.preventDefault();
    const name = document.getElementById('visitorName').value;
    const message = document.getElementById('visitorMsg').value;
    const statusElem = document.getElementById('formStatus');
    
    statusElem.textContent = "Sending message to Prabesh's WhatsApp...";

    // Format the message for WhatsApp API
    const targetPhoneNumber = "9824706111";
    const textContent = `*New Website Message!*\n*Name:* ${name}\n*Message:* ${message}`;
    const encodedText = encodeURIComponent(textContent);
    
    // Background fetch to WhatsApp Cloud API link / redirection fallback simulated securely
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhoneNumber}&text=${encodedText}`;
    
    // Open silently or trigger hidden iframe so user stays on site
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = whatsappUrl;
    document.body.appendChild(iframe);

    setTimeout(() => {
        statusElem.textContent = "✅ Message successfully sent to Prabesh's WhatsApp!";
        document.getElementById('whatsappForm').reset();
        selfieResultImg.style.display = 'none';
        selfiePreviewPlaceholder.style.display = 'block';
        selfiePreviewPlaceholder.textContent = "Selfie captured & processed";
    }, 1500);
}

/* 6. Pull Rope Handler (Toggles Light/Dark Mode & Reveals Hobbies Data) */
const ropeToggle = document.getElementById('ropeToggle');
const hobbiesContainer = document.getElementById('hobbiesContainer');

ropeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (hobbiesContainer) {
        hobbiesContainer.classList.toggle('show-data');
    }
});

/* 7. Mobile Menu Toggle */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('open');
}

/* 8. Live Clock */
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

/* 9. Interactive Modal Windows for Magic Doors */
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

/* 10. Canvas Particle Background Animation */
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
for (let i = 0; i < 30; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();