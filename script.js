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

    // -- State management for conversation --
    let conversationState = 'idle'; // States: idle, asking_name, asking_phone, asking_product, completed
    let leadData = { name: '', phone: '', product: '' };

    // Automatically open chat window after a delay
    setTimeout(() => {
        chatWindow.classList.add('active');
    }, 2500); // Chatbot pops up after 2.5 seconds

    // Toggle chat window visibility on widget click
    chatWidget.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    // Close chat window
    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Function to handle sending a message
    const sendMessage = () => {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        addMessageToLog('user', userMessage);
        chatInput.value = "";

        setTimeout(getBotResponse, 1000, userMessage);
    };

    // Add message to the chat log UI
    const addMessageToLog = (sender, message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatLog.appendChild(messageElement);
        chatLog.parentElement.scrollTop = chatLog.parentElement.scrollHeight;
    };

    // **UPDATED** - Bot response logic with lead collection
    const getBotResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();
        let botMessage;

        // State-driven conversation flow
        switch (conversationState) {
            case 'asking_name':
                leadData.name = userInput;
                botMessage = `Thanks, ${leadData.name}! What is a good phone number to reach you at?`;
                conversationState = 'asking_phone';
                break;

            case 'asking_phone':
                leadData.phone = userInput;
                botMessage = `Perfect. And which of our services are you most interested in today? (e.g., AI Videos, Websites, etc.)`;
                conversationState = 'asking_product';
                break;

            case 'asking_product':
                leadData.product = userInput;
                botMessage = `Excellent! Just to confirm: <br>
                    - Name: ${leadData.name}<br>
                    - Phone: ${leadData.phone}<br>
                    - Interest: ${leadData.product}<br>
                    Our team will be in touch with you shortly. Thanks!`;
                console.log("Lead Collected:", leadData); // In a real app, you would send this data to a server
                conversationState = 'completed';
                break;

            case 'completed':
                botMessage = "I've collected your information, and a team member will reach out soon. Is there anything else I can help you with?";
                break;

            // Default 'idle' state
            default:
                if (lowerCaseInput.includes("service") || lowerCaseInput.includes("what do you do") || lowerCaseInput.includes("quote") || lowerCaseInput.includes("pricing") || lowerCaseInput.includes("cost")) {
                    botMessage = "I can help with that! To get you the right information, I just need to ask a few questions. What is your name?";
                    conversationState = 'asking_name';
                } else if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi")) {
                    botMessage = "Hello there! Are you interested in learning about our services or getting a quote?";
                } else if (lowerCaseInput.includes("process")) {
                    botMessage = "Our process involves four key phases: Discovery, Design, Development, and Launch. This ensures your idea is transformed into a high-quality digital product.";
                } else if (lowerCaseInput.includes("bye") || lowerCaseInput.includes("thanks")) {
                    botMessage = "You're welcome! Have a great day.";
                } else {
                    botMessage = "I'm not sure how to answer that. You can ask about our 'services', 'process', or ask for a 'quote' to get started.";
                }
                break;
        }
        
        addMessageToLog('bot', botMessage);
    };

    // Event listeners for sending message
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // --- SECURITY RESTRICTIONS ---
    // Disable right-click
   document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', (e) => {
     if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
      (e.ctrlKey && (e.key === 'U' || e.key === 'u'))) {
      e.preventDefault();
       }
   });

});

