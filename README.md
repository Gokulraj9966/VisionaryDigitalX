VisionaryDigitalX - Modern AI-Themed Landing Page
Project Overview
This project is a fully responsive, modern landing page for a digital agency named VisionaryDigitalX. The design is built around a sleek, dark, AI-driven aesthetic and is intended to be highly attractive and engaging for visitors. It features a dynamic user interface with animations and an interactive chatbot designed for lead generation.

The core theme of the website is "Transforming Ideas into Digital," and the content is structured to guide visitors through the company's process and service offerings.

Features
Modern Dark UI: A professional and tech-focused dark theme that is easy on the eyes.

Dynamic Particle Background: An interactive particle animation in the hero section creates a high-tech, engaging first impression.

AI-Powered Typing Effect: The main headline features a dynamic typing animation to capture attention.

Glassmorphism Navigation: A semi-transparent, blurred navigation bar that floats over the content.

Interactive Chatbot:

Automatically pops up to engage visitors.

Features an intelligent, human-like knowledge base to answer common questions.

Includes a conversational lead collection flow to capture user name, phone number, and product interest.

On-Scroll Animations: Content sections smoothly fade in as the user scrolls down the page.

Responsive Design: The layout is fully optimized for a seamless experience on desktops, tablets, and mobile devices.

Basic Security: Includes scripts to deter casual code inspection by disabling F12 developer tools and the right-click context menu.

File Structure
The project is organized into three core files, following standard web development practices:

index.html: Contains the complete HTML structure and content of the webpage, including the chatbot's layout.

style.css: Holds all the styling rules for the website, including the dark theme, animations, layout, responsive design, and chatbot appearance.

script.js: Manages all the interactivity and dynamic functionality, such as:

Mobile menu (hamburger) logic.

The particle background initialization.

The hero section's typing animation.

The chatbot's entire conversational logic and lead capture mechanism.

The security restrictions.

Getting Started
To run this website, you do not need any special tools or servers.

Place the three files (index.html, style.css, script.js).

Open the index.html file in any modern web browser (like Chrome, Firefox, or Edge).

Technologies Used
HTML5

CSS3 (with modern features like Flexbox and Grid)

JavaScript (ES6)

Particles.js: For the animated background effect.

Font Awesome: For all the icons used throughout the site.

Google Fonts (Manrope): For modern typography.

Customization
This project is designed to be easily customized. Here are the key areas you might want to edit:

1. Changing the Logo
In index.html, find the line with <img src="VDX Logo with BG-01.png" ...> and change the src attribute to the path of your new logo file.

It is recommended to create your logo at 80px in height in Photoshop and let the website scale it down to 40px for the best quality on high-resolution screens.

2. Updating Chatbot Responses
All chatbot logic is located in script.js inside the // --- CHATBOT LOGIC --- section.

To add or change responses, edit the knowledge object within the getBotResponse function. You can add new keywords and responses easily.

3. Modifying Services
The list of services is in index.html within the <section id="solutions" ...> block.

You can edit the text and change the Font Awesome icon class (e.g., <i class="fas fa-bullhorn"></i>) for each service.
