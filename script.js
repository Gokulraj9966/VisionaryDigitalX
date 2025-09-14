document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu (Hamburger) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- AI Typing Effect ---
    const typingElement = document.querySelector(".ai-typing");
    if (typingElement) {
        const words = ["Your Vision.", "Our Process.", "Digital Reality."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            typingElement.textContent = currentWord.substring(0, charIndex);

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 150);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 100);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1200);
            }
        }
        type();
    }


    // --- Fade-in on Scroll Animation ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- Particles.js Initialization ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    }

    // --- CHATBOT LOGIC ---
    const chatWidget = document.querySelector('.chat-widget');
    const chatWindow = document.querySelector('.chat-window');
    const closeChatBtn = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatLog = document.querySelector('.chat-log');

    let conversationState = 'idle';
    let leadData = { name: '', phone: '', product: '' };

    // Automatically open chat window and add initial bot message
    setTimeout(() => {
        chatWindow.classList.add('active');
        addMessageToLog('bot', "Hello! I'm here to help. You can ask me about our services, process, or ask for a quote.");
    }, 2500);

    chatWidget.addEventListener('click', () => chatWindow.classList.toggle('active'));
    closeChatBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

    const sendMessage = () => {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;
        addMessageToLog('user', userMessage);
        chatInput.value = "";
        setTimeout(() => getBotResponse(userMessage), 1000);
    };

    const addMessageToLog = (sender, message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatLog.appendChild(messageElement);
        chatLog.parentElement.scrollTop = chatLog.parentElement.scrollHeight;
    };

    const getBotResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();
        let botMessage = "";

        // State-driven conversation flow for lead collection
        if (conversationState !== 'idle') {
            switch (conversationState) {
                case 'asking_name':
                    leadData.name = userInput;
                    botMessage = `Thanks, ${leadData.name}! What is a good phone number we can use to contact you?`;
                    conversationState = 'asking_phone';
                    break;
                case 'asking_phone':
                    leadData.phone = userInput;
                    botMessage = `Perfect. And which of our services are you most interested in? (e.g., AI Videos, Websites, etc.)`;
                    conversationState = 'asking_product';
                    break;
                case 'asking_product':
                    leadData.product = userInput;
                    botMessage = `Excellent! Just to confirm: <br>- Name: ${leadData.name}<br>- Phone: ${leadData.phone}<br>- Interest: ${leadData.product}<br>Our team will be in touch with you shortly. Thank you!`;
                    console.log("Lead Collected:", leadData);
                    conversationState = 'completed';
                    break;
                case 'completed':
                    botMessage = "I've passed your details along to our team. They'll be in touch soon. Is there anything else I can help you with today?";
                    conversationState = 'idle'; // Reset state after completion
                    break;
            }
            addMessageToLog('bot', botMessage);
            return;
        }

        // --- ENHANCED KNOWLEDGE BASE ---
        const knowledge = {
            greetings: { keywords: ["hello", "hi", "hey"], response: "Hello there! How can I assist you today? You can ask about our services, process, or request a quote." },
            services: { keywords: ["service", "what do you do", "offer"], response: "We specialize in a range of digital solutions: Digital Marketing, Engaging Digital Experiences, Responsive Websites, Mobile Apps, Custom Software, AI-Driven Photos, AI Videos, and Digital Posters. Is there one you'd like to know more about?" },
            quote: { keywords: ["quote", "pricing", "cost", "how much"], response: () => { conversationState = 'asking_name'; return "Of course! Our projects are custom-quoted to fit your needs. To get started, could I get your name, please?"; } },
            process: { keywords: ["process", "how do you work"], response: "We follow a four-phase process: 1. Discovery & Strategy, 2. Design & Prototyping, 3. Development & Building, and 4. Launch & Growth. This ensures a smooth journey from idea to a successful digital product." },
            location: { keywords: ["where", "location", "address"], response: "We are proudly based in Salem, Tamil Nadu, India, but we work with clients from all over the world!" },
            timeline: { keywords: ["long", "timeline", "duration"], response: "Project timelines can vary. A standard website might take a few weeks, while a custom app could take a few months. Once we understand your project scope, we can give you a precise timeline." },
            who_are_you: { keywords: ["who are you", "what is visionary"], response: "We are VisionaryDigitalX, a digital agency dedicated to transforming innovative ideas into reality through technology and creativity." },
            portfolio: { keywords: ["work", "portfolio", "examples", "projects"], response: "Absolutely! You can see some of our recent projects on the main page under the 'Our Blueprint for Innovation' section. If you'd like to see something specific, let me know!" },
            support: { keywords: ["support", "maintenance", "after launch"], response: "We offer ongoing support and maintenance packages to ensure your digital product remains secure, up-to-date, and performs optimally long after it has launched." },
            technology: { keywords: ["tech", "stack", "frameworks", "languages"], response: "Our team is proficient in a wide range of modern technologies, including React, Node.js, and Python for web and AI development. We always choose the best tools for the job to ensure your project is scalable and robust." },
            clients: { keywords: ["who do you work with", "clients"], response: "We partner with a diverse range of clients, from innovative startups to established businesses looking to enhance their digital presence. We're passionate about helping anyone with a great idea." },
            ai_services: { keywords: ["ai photo", "ai video", "ai-driven"], response: "Our AI services use cutting-edge generative models to create stunning, unique photos and videos for marketing campaigns, product showcases, and more. It's a great way to stand out!"},
            thanks: { keywords: ["thanks", "thank you", "bye"], response: "You're very welcome! If you need anything else, just let me know. Have a great day!" }
        };

        let responseFound = false;
        for (const key in knowledge) {
            if (knowledge[key].keywords.some(keyword => lowerCaseInput.includes(keyword))) {
                const response = knowledge[key].response;
                botMessage = typeof response === 'function' ? response() : response;
                responseFound = true;
                break;
            }
        }

        if (!responseFound) {
            botMessage = "That's a great question. I'm not equipped to answer that just yet, but one of our human experts can. To connect you, I'll need to collect a few details. Would that be okay?";
            conversationState = 'asking_name';
        }

        addMessageToLog('bot', botMessage);
    };

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    // --- SECURITY RESTRICTIONS ---
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) {
            e.preventDefault();
        }
    });
});

