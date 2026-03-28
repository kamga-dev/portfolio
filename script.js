// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }
});

// Smooth scroll pour navigation
document.querySelectorAll('.nav-menu a').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({behavior:'smooth',block:'start'});

    // Close mobile menu after click
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});

let currentLang='Deutsch';

// Typewriter effect
const typewriterContainer=document.querySelector('.typewriter');
const typewriterTextEl=document.getElementById('typewriter-text');
let typewriterTimer=null;
let typewriterState={ index:0, deleting:false, text:'' };
const startTypewriter=(text)=>{
  if(!typewriterContainer||!typewriterTextEl) return;
  if(typewriterTimer) clearTimeout(typewriterTimer);
  typewriterState={ index:0, deleting:false, text:text||'' };
  const typeSpeed=90;
  const deleteSpeed=60;
  const pauseTime=1200;
  const restartDelay=400;
  const tick=()=>{
    const fullText=typewriterState.text;
    if(!typewriterState.deleting){
      typewriterState.index=Math.min(typewriterState.index+1,fullText.length);
      typewriterTextEl.textContent=fullText.slice(0,typewriterState.index);
      if(typewriterState.index===fullText.length){
        typewriterState.deleting=true;
        typewriterTimer=setTimeout(tick,pauseTime);
        return;
      }
      typewriterTimer=setTimeout(tick,typeSpeed);
    } else {
      typewriterState.index=Math.max(typewriterState.index-1,0);
      typewriterTextEl.textContent=fullText.slice(0,typewriterState.index);
      if(typewriterState.index===0){
        typewriterState.deleting=false;
        typewriterTimer=setTimeout(tick,restartDelay);
        return;
      }
      typewriterTimer=setTimeout(tick,deleteSpeed);
    }
  };
  tick();
};
if(typewriterContainer&&typewriterTextEl){
  startTypewriter(typewriterContainer.getAttribute('data-text')||'');
}

// Reveal on scroll
const revealElements=[
  ...document.querySelectorAll('section.card'),
  ...document.querySelectorAll('.edu-card, .exp-card, .cert, .skills-grid, .skill-card, .project-card, .hero-name, .hero-image-wrapper, .typewriter-wrap, .quick-contact, .hero-tagline, .contact-intro, .form-group, .contact-submit, .contact-alt')
];
revealElements.forEach((el,idx)=>{
  el.classList.add('reveal');
  el.style.setProperty('--delay', `${(idx%6)*0.08}s`);
});
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
},{ threshold:0.15 });
revealElements.forEach(el=>observer.observe(el));

// Theme toggle
const themeToggle=document.getElementById('theme-toggle');
const setTheme=(theme)=>{
  if(theme==='light'){
    document.body.setAttribute('data-theme','light');
  } else {
    document.body.removeAttribute('data-theme');
  }
  localStorage.setItem('theme',theme);
};
const savedTheme=localStorage.getItem('theme');
if(savedTheme) setTheme(savedTheme);
themeToggle?.addEventListener('click',()=>{
  const isLight=document.body.getAttribute('data-theme')==='light';
  setTheme(isLight?'dark':'light');
});

// Traduction simple
const translations={
"Français":{
  "portfolio-title":"Portfolio",
  "nav-home":"Accueil",
  "nav-skills":"Compétences",
  "nav-projects":"Projets",
  "nav-experience":"Expérience",
  "nav-education":"Formation",
  "nav-certifications":"Certificats",
  "nav-contact":"Contact",
  "home-title":"Bienvenue",
  "hero-name":"Kuete Kamga Starline Lecool",
  "home-text":"Étudiant en informatique motivé à la Hochschule Mittelhessen, passionné par le développement logiciel, les bases de données et les nouvelles technologies.",
  "typewriter-text":"Développeur Web (HTML, CSS, Java)",
  "skills-title":"Compétences",
  "skill-edv":"EDV (Saisie & Données)",
  "qc-linkedin":"LinkedIn",
  "qc-github":"GitHub",
  "qc-mail":"E-mail",
  "theme-toggle":"Changer le thème",
  "projects-title":"Projets",
  "projects-text":"Mes projets seront bientôt ajoutés...",
  "project1-title":"Portfolio Développeur Web",
  "project1-desc":"Mon portfolio personnel présente mes compétences en développement web, avec des animations, un design responsive et l'intégration de projets réels.",
  "project2-title":"Plateforme E-Commerce",
  "project2-desc":"Une plateforme e-commerce moderne avec catalogue de produits, panier et intégration de paiement. Développée avec un design responsive pour une expérience utilisateur optimale.",
  "project3-title":"Système de Gestion de Tâches",
  "project3-desc":"Un outil de gestion de tâches collaboratif avec mises à jour en temps réel, rôles utilisateurs et notifications. Permet une gestion de projet efficace en équipe.",
  "project-view":"Voir",
  "project-btn-view":"Voir le projet ↗",
  "project-btn-github":"GitHub →",
  "experience-title":"Expérience professionnelle",
  "exp1-title":"Werkstudent développement web (HTML, CSS, Java)",
  "exp1-company":"Zenithis · Werkstudium",
  "exp1-dates":"Nov. 2024 – Nov. 2025 (1 an 1 mois)",
  "exp1-location":"Wilmington, DE, USA · Remote",
  "exp1-bullet1":"Développement et maintenance de sites web avec HTML et CSS",
  "exp1-bullet2":"Support à l’implémentation de fonctionnalités web",
  "exp1-bullet3":"Travail avec bases de données SQL et gestion des données",
  "exp1-bullet4":"Analyse d’erreurs et debugging d’applications web",
  "exp1-bullet5":"Collaboration avec l’équipe de développeurs sur des projets numériques",
  "exp2-title":"Werkstudent saisie de données (EDV)",
  "exp2-company":"Croix-Rouge camerounaise (Yaoundé)",
  "exp2-dates":"Déc. 2024 – Nov. 2025 / Nov. 2022 – Oct. 2023",
  "exp2-bullet1":"Saisie et gestion des données dans les systèmes EDV",
  "exp2-bullet2":"Entrée et mise à jour des informations (ex. données personnelles ou projets)",
  "exp2-bullet3":"Contrôle et correction des données",
  "exp2-bullet4":"Support aux tâches administratives",
  "exp2-bullet5":"Travail avec documents numériques et bases de données",
  "exp-more":"voir plus",
  "exp-less":"voir moins",
  "education-title":"Formation",
  "education-text":"Licence Informatique - Technische Hochschule Mittelhessen",
  "edu-study-title":"Études",
  "edu-study-period":"Octobre 2024 – en cours",
  "edu-study-role":"Étudiant en informatique",
  "edu-study-school":"Technische Hochschule Mittelhessen, Giessen",
  "edu-study-bullet1":"Développement d’applications web avec HTML, CSS et PHP",
  "edu-study-bullet2":"Programmation orientée objet et développement logiciel",
  "edu-study-bullet3":"Structures de données et algorithmes",
  "edu-study-bullet4":"Création et exécution de requêtes SQL complexes avec MySQL Workbench",
  "edu-highschool-title":"Lycée",
  "edu-highschool-period":"Septembre 2015 – Mai 2022",
  "edu-highschool-degree":"Baccalauréat (scientifique)",
  "edu-highschool-place":"Cameroun",
  "edu-highschool-focus":"Spécialités : Mathématiques, Physique et Informatique",
  "certifications-title":"Attestations et certificats",
  "contact-title":"Contact",
  "contact-intro":"Avez-vous un projet en tête ou souhaitez-vous simplement dire bonjour ? Je serais ravi d'avoir de vos nouvelles !",
  "contact-label-name":"Nom",
  "contact-label-email":"E-mail",
  "contact-label-message":"Message",
  "contact-name":"Votre nom",
  "contact-email":"votre.email@exemple.fr",
  "contact-message":"Votre message...",
  "contact-submit":"Envoyer le message",
  "contact-or":"Ou contactez-moi directement via :",
  "cert1-title":"Cours de base techniques web 1: HTML",
  "cert2-title":"Bases de la programmation web: Mon premier site",
  "cert3-title":"Webdesign responsive - Bases",
  "cert-issued":"Délivré",
  "cert-button":"Voir le certificat ↗",
  "cert-skills":"Compétences",
  "cert1-skills":"Webdesign",
  "cert2-skills":"Développement web",
  "contact-name":"Nom",
  "contact-message":"Message",
  "contact-submit":"Envoyer",
  "project-ai-badge":"Travail d'équipe · Frontend",
  "project-ai-title":"AI‑Text‑Analyzer – Développement Frontend",
  "project-ai-desc":"Application web pour analyser les textes sur les erreurs grammaticales. Responsable de l'ensemble du <strong>design frontend et de l'implémentation</strong> – de la conception à l'intégration Flask.",
  "project-ai-task1":"Mise en page responsive avec <strong>Bootstrap 5</strong>",
  "project-ai-task2":"Navbar moderne avec <strong>sélection de langue</strong> (multilingue)",
  "project-ai-task3":"Système intuitif de <strong>téléchargement de fichiers</strong>",
  "project-ai-task4":"<strong>Affichage structuré des résultats</strong> de l'analyse",
  "project-ai-task5":"Intégration des templates via <strong>Jinja2 / Flask</strong>",
  "project1-task1":"Section <strong>hero animée</strong> avec effet typewriter",
  "project1-task2":"<strong>Mode sombre / clair</strong> avec variables CSS",
  "project1-task3":"<strong>Carrousel de compétences</strong> avec animation CSS",
  "project1-task4":"Multilinguisme via <strong>JavaScript</strong>",
  "project1-task5":"Intégration de formulaire via <strong>Formspree</strong>",
  "project3-task1":"<strong>Rôles utilisateurs</strong> et gestion des droits",
  "project3-task2":"<strong>Tableau des tâches</strong> avec gestion des statuts",
  "project3-task3":"Persistance avec <strong>base de données SQL</strong>",
  "project3-task4":"<strong>API REST</strong> avec backend Java",
  "project3-task5":"Interface responsive avec <strong>Angular</strong>",
  "contact-success":"Message envoyé – merci !"
},
"English":{
  "portfolio-title":"Portfolio",
  "nav-home":"Home",
  "nav-skills":"Skills",
  "nav-projects":"Projects",
  "nav-experience":"Experience",
  "nav-education":"Education",
  "nav-certifications":"Certificates",
  "nav-contact":"Contact",
  "home-title":"Welcome",
  "hero-name":"Kuete Kamga Starline Lecool",
  "home-text":"Motivated Computer Science student at the Technical University of Central Hesse, passionate about software development, databases, and new technologies.",
  "typewriter-text":"Web Developer (HTML, CSS, Java)",
  "skills-title":"Skills",
  "skill-edv":"EDV (Data Entry)",
  "project1-title":"Web Developer Portfolio",
  "project1-desc":"My personal portfolio showcases my web development skills, featuring animations, responsive design, and integration of real projects.",
  "project2-title":"E-Commerce Platform",
  "project2-desc":"A modern e-commerce platform with product catalog, shopping cart and payment integration. Developed with responsive design for optimal user experience.",
  "project3-title":"Task Management System",
  "project3-desc":"A collaborative task management tool with real-time updates, user roles and notifications. Enables efficient team project management.",
  "project-view":"View",
  "project-btn-view":"View project ↗",
  "project-btn-github":"GitHub →",
  "qc-linkedin":"LinkedIn",
  "qc-github":"GitHub",
  "qc-mail":"Email",
  "theme-toggle":"Toggle theme",
  "projects-title":"Projects",
  "projects-text":"My projects will be added soon...",
  "experience-title":"Professional Experience",
  "exp1-title":"Working Student Web Development (HTML, CSS, Java)",
  "exp1-company":"Zenithis · Working Student",
  "exp1-dates":"Nov 2024 – Nov 2025 (1 year 1 month)",
  "exp1-location":"Wilmington, DE, USA · Remote",
  "exp1-bullet1":"Development and maintenance of websites with HTML and CSS",
  "exp1-bullet2":"Support for implementing web features",
  "exp1-bullet3":"Working with SQL databases and data management",
  "exp1-bullet4":"Error analysis and debugging of web applications",
  "exp1-bullet5":"Collaboration with the developer team on digital projects",
  "exp2-title":"Working Student Data Entry (EDV)",
  "exp2-company":"Cameroon Red Cross (Yaoundé)",
  "exp2-dates":"Dec 2024 – Nov 2025 / Nov 2022 – Oct 2023",
  "exp2-bullet1":"Data entry and management in EDV systems",
  "exp2-bullet2":"Input and updating of information (e.g., personal data or projects)",
  "exp2-bullet3":"Data checking and correction",
  "exp2-bullet4":"Support for administrative tasks",
  "exp2-bullet5":"Working with digital documents and databases",
  "exp-more":"see more",
  "exp-less":"see less",
  "education-title":"Education",
  "education-text":"Bachelor Computer Science - Technical University of Central Hesse",
  "edu-study-title":"Studies",
  "edu-study-period":"October 2024 – present",
  "edu-study-role":"Computer Science Student",
  "edu-study-school":"Technische Hochschule Mittelhessen, Giessen",
  "edu-study-bullet1":"Web application development with HTML, CSS, and PHP",
  "edu-study-bullet2":"Object-oriented programming and software development",
  "edu-study-bullet3":"Data structures and algorithms",
  "edu-study-bullet4":"Creating and running complex SQL queries with MySQL Workbench",
  "edu-highschool-title":"High School",
  "edu-highschool-period":"September 2015 – May 2022",
  "edu-highschool-degree":"Abitur (scientific)",
  "edu-highschool-place":"Cameroon",
  "edu-highschool-focus":"Focus: Mathematics, Physics, and Computer Science",
  "certifications-title":"Certificates and Credentials",
  "contact-title":"Contact",
  "contact-intro":"Do you have a project in mind or just want to say hello? I'd love to hear from you!",
  "contact-label-name":"Name",
  "contact-label-email":"Email",
  "contact-label-message":"Message",
  "contact-name":"Your name",
  "contact-email":"your.email@example.com",
  "contact-message":"Your message...",
  "contact-submit":"Send message",
  "contact-or":"Or contact me directly via:",
  "cert1-title":"Basic web techniques 1: HTML",
  "cert2-title":"Web programming basics: My first website",
  "cert3-title":"Responsive web design - Basics",
  "cert-issued":"Issued",
  "cert-button":"View certificate ↗",
  "cert-skills":"Skills",
  "cert1-skills":"Web design",
  "cert2-skills":"Web development",
  "contact-name":"Name",
  "contact-message":"Message",
  "contact-submit":"Send",
  "project-ai-badge":"Teamwork · Frontend",
  "project-ai-title":"AI‑Text‑Analyzer – Frontend Development",
  "project-ai-desc":"Web application for analyzing texts for grammatical errors. Responsible for the entire <strong>frontend design and implementation</strong> – from concept to Flask integration.",
  "project-ai-task1":"Responsive layout with <strong>Bootstrap 5</strong>",
  "project-ai-task2":"Modern navbar with <strong>language selection</strong> (multilingual)",
  "project-ai-task3":"Intuitive <strong>file upload system</strong>",
  "project-ai-task4":"Structured <strong>results display</strong> of the analysis",
  "project-ai-task5":"Template integration via <strong>Jinja2 / Flask</strong>",
  "project1-task1":"Animated <strong>hero section</strong> with typewriter effect",
  "project1-task2":"<strong>Dark / Light mode</strong> with CSS variables",
  "project1-task3":"<strong>Skills carousel</strong> with CSS animation",
  "project1-task4":"Multilingual support via <strong>JavaScript</strong>",
  "project1-task5":"Form integration via <strong>Formspree</strong>",
  "project3-task1":"<strong>User roles</strong> and permission management",
  "project3-task2":"<strong>Task board</strong> with status management",
  "project3-task3":"Persistence with <strong>SQL database</strong>",
  "project3-task4":"<strong>REST API</strong> with Java backend",
  "project3-task5":"Responsive UI with <strong>Angular</strong>",
  "contact-success":"Message sent – thank you!"
},
"Deutsch":{
  "portfolio-title":"Portfolio",
  "nav-home":"Startseite",
  "nav-skills":"Fähigkeiten",
  "nav-projects":"Projekte",
  "nav-experience":"Erfahrung",
  "nav-education":"Ausbildung",
  "nav-certifications":"Zertifikate",
  "nav-contact":"Kontakt",
  "home-title":"Willkommen",
  "hero-name":"Kuete Kamga Starline Lecool",
  "home-text":"Motivierter Informatikstudent an der Technische Hochschule Mittelhessen mit Leidenschaft für Softwareentwicklung, Datenbanken und neue Technologien.",
  "typewriter-text":"Webentwickler (HTML, CSS, Java)",
  "skills-title":"Fähigkeiten",
  "skill-edv":"EDV (Dateneingabe)",
  "project1-title":"Portfolio Web Developer",
  "project1-desc":"Mein persönliches Portfolio zeigt meine Webentwicklungsfähigkeiten, mit Animationen, responsive Design und Integration realer Projekte.",
  "project2-title":"E-Commerce Platform",
  "project2-desc":"Eine moderne E-Commerce-Plattform mit Produktkatalog, Warenkorb und Zahlungsintegration. Entwickelt mit responsivem Design für optimale Benutzererfahrung.",
  "project3-title":"Task Management System",
  "project3-desc":"Ein kollaboratives Task-Management-Tool mit Echtzeit-Updates, Benutzerrollen und Benachrichtigungen. Ermöglicht effizientes Projektmanagement im Team.",
  "project-view":"Ansehen",
  "project-btn-view":"Projekt ansehen ↗",
  "project-btn-github":"GitHub →",
  "qc-linkedin":"LinkedIn",
  "qc-github":"GitHub",
  "qc-mail":"E-Mail",
  "theme-toggle":"Theme wechseln",
  "projects-title":"Projekte",
  "projects-text":"Meine Projekte werden bald hinzugefügt...",
  "experience-title":"Berufserfahrung",
  "exp1-title":"Werkstudent Webentwicklung (HTML, CSS, Java)",
  "exp1-company":"Zenithis · Werkstudium",
  "exp1-dates":"Nov. 2024 – Nov. 2025 (1 Jahr 1 Monat)",
  "exp1-location":"Wilmington, DE, USA · Remote",
  "exp1-bullet1":"Entwicklung und Wartung von Websites mit HTML und CSS",
  "exp1-bullet2":"Support bei der Implementierung von Web-Funktionen",
  "exp1-bullet3":"Arbeit mit SQL-Datenbanken und Datenmanagement",
  "exp1-bullet4":"Analyse von Fehlern und Debugging von Webanwendungen",
  "exp1-bullet5":"Zusammenarbeit mit dem Entwicklerteam an digitalen Projekten",
  "exp2-title":"Werkstudent Datenerfasser (EDV)",
  "exp2-company":"Kamerunisches Rotes Kreuz (Yaoundé)",
  "exp2-dates":"Dez. 2024 – Nov. 2025 / Nov. 2022 – Okt. 2023",
  "exp2-bullet1":"Erfassung und Verwaltung von Daten in EDV-Systemen",
  "exp2-bullet2":"Eingabe und Aktualisierung von Informationen (z. B. Personendaten oder Projekte)",
  "exp2-bullet3":"Kontrolle und Korrektur von Daten",
  "exp2-bullet4":"Unterstützung administrativer Aufgaben",
  "exp2-bullet5":"Arbeit mit digitalen Dokumenten und Datenbanken",
  "exp-more":"mehr anzeigen",
  "exp-less":"weniger anzeigen",
  "education-title":"Ausbildung",
  "education-text":"Bachelor Informatik - Technische Hochschule Mittelhessen",
  "edu-study-title":"Studium",
  "edu-study-period":"Oktober 2024 – laufend",
  "edu-study-role":"Student der Informatik",
  "edu-study-school":"Technische Hochschule Mittelhessen, Gießen",
  "edu-study-bullet1":"Entwicklung von Webanwendungen mit HTML, CSS und PHP",
  "edu-study-bullet2":"Objektorientierte Programmierung und Softwareentwicklung",
  "edu-study-bullet3":"Datenstrukturen und Algorithmen",
  "edu-study-bullet4":"Erstellung und Ausführung komplexer SQL-Abfragen mit MySQL Workbench",
  "edu-highschool-title":"Gymnasium",
  "edu-highschool-period":"September 2015 – Mai 2022",
  "edu-highschool-degree":"Abitur (wissenschaftlich)",
  "edu-highschool-place":"Kamerun",
  "edu-highschool-focus":"Schwerpunkte: Mathematik, Physik und Informatik",
  "certifications-title":"Bescheinigungen und Zertifikate",
  "contact-title":"Kontakt",
  "contact-intro":"Haben Sie ein Projekt im Kopf oder möchten Sie einfach nur Hallo sagen? Ich würde mich freuen, von Ihnen zu hören!",
  "contact-label-name":"Name",
  "contact-label-email":"E-Mail",
  "contact-label-message":"Nachricht",
  "contact-name":"Ihr Name",
  "contact-email":"ihre.email@beispiel.de",
  "contact-message":"Ihre Nachricht...",
  "contact-submit":"Nachricht senden",
  "contact-or":"Oder kontaktieren Sie mich direkt über:",
  "cert1-title":"Grundkurs Webtechniken 1: HTML",
  "cert2-title":"Grundlagen der Webprogrammierung: Meine erste Website",
  "cert3-title":"Responsive Webdesign - Grundlagen",
  "cert-issued":"Ausgestellt",
  "cert-button":"Nachweis anzeigen ↗",
  "cert-skills":"Kenntnisse",
  "cert1-skills":"Webdesign",
  "cert2-skills":"Webentwicklung",
  "contact-name":"Name",
  "contact-message":"Nachricht",
  "contact-submit":"Senden",
  "project-ai-badge":"Teamarbeit · Frontend",
  "project-ai-title":"AI‑Text‑Analyzer – Frontend Entwicklung",
  "project-ai-desc":"Webanwendung zur Analyse von Texten auf grammatikalische Fehler. Verantwortlich für das gesamte <strong>Frontend-Design und die Implementierung</strong> – von der Konzeption bis zur Flask-Anbindung.",
  "project-ai-task1":"Responsives Layout mit <strong>Bootstrap 5</strong>",
  "project-ai-task2":"Moderne Navbar mit <strong>Sprachwahl</strong> (mehrsprachig)",
  "project-ai-task3":"Intuitives <strong>Datei-Upload-System</strong>",
  "project-ai-task4":"Strukturierte <strong>Ergebnisanzeige</strong> der Analyse",
  "project-ai-task5":"Template-Integration via <strong>Jinja2 / Flask</strong>",
  "project1-task1":"Animierter <strong>Hero-Bereich</strong> mit Typewriter-Effekt",
  "project1-task2":"<strong>Dark / Light Mode</strong> mit CSS-Variablen",
  "project1-task3":"<strong>Skills-Karussell</strong> mit CSS-Animation",
  "project1-task4":"Mehrsprachigkeit via <strong>JavaScript</strong>",
  "project1-task5":"Formularintegration über <strong>Formspree</strong>",
  "project3-task1":"<strong>Benutzerrollen</strong> und Rechteverwaltung",
  "project3-task2":"<strong>Aufgaben-Board</strong> mit Statusverwaltung",
  "project3-task3":"Persistenz mit <strong>SQL-Datenbank</strong>",
  "project3-task4":"<strong>REST-API</strong> mit Java Backend",
  "project3-task5":"Responsive UI mit <strong>Angular</strong>",
  "contact-success":"Nachricht gesendet – vielen Dank!"
}
};
document.querySelectorAll('.dropdown-content a').forEach(link=>{
  link.addEventListener('click',e=>{
    const lang=e.target.textContent;
    currentLang=lang;
    document.querySelectorAll('[data-key]').forEach(el=>{
      const key=el.getAttribute('data-key');
      if(translations[lang][key]){
        const attr=el.getAttribute('data-attr');
        if(attr){
          const value=translations[lang][key];
          el.setAttribute(attr,value);
          if(attr==='data-tooltip'){
            el.setAttribute('aria-label',value);
          }
          if(el.classList.contains('typewriter')){
            startTypewriter(value);
          }
        } else if(el.tagName==='INPUT'||el.tagName==='TEXTAREA'){
          if(el.type==='submit') el.value=translations[lang][key];
          else el.placeholder=translations[lang][key];
        } else {
          if(el.dataset.html==='true'){
            el.innerHTML=translations[lang][key];
          } else {
            el.textContent=translations[lang][key];
          }
        }
      }
    });
    document.querySelectorAll('.exp-toggle').forEach(btn=>{
      const card=btn.closest('.exp-card');
      const isExpanded=card?.classList.contains('expanded');
      btn.textContent=isExpanded?translations[lang]['exp-less']:translations[lang]['exp-more'];
    });
  });
});

// Experience expand/collapse
document.querySelectorAll('.exp-toggle').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const card=btn.closest('.exp-card');
    if(!card) return;
    card.classList.toggle('expanded');
    const isExpanded=card.classList.contains('expanded');
    const dict=translations[currentLang]||translations['Deutsch'];
    btn.textContent=isExpanded?dict['exp-less']:dict['exp-more'];
  });
});

// Projects carousel
(function initCarousel() {
  const viewport  = document.getElementById('projectsCarousel');
  const track     = viewport?.querySelector('.carousel-track');
  const prevBtn   = document.getElementById('carouselPrev');
  const nextBtn   = document.getElementById('carouselNext');
  const dots      = document.querySelectorAll('.carousel-dot');
  if (!viewport || !track) return;

  let currentIndex = 0;

  const cards = () => track.querySelectorAll('.project-card');
  const cardWidth = () => {
    const c = cards()[0];
    if (!c) return 0;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    return c.offsetWidth + gap;
  };
  const maxIndex = () => Math.max(0, cards().length - 1);

  const goTo = (index) => {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${currentIndex * cardWidth()}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex();
  };

  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.index)));

  // Swipe / drag on touch and mouse
  let pointerStart = null;
  let scrollStart  = 0;

  const onPointerDown = (e) => {
    pointerStart = e.touches ? e.touches[0].clientX : e.clientX;
    scrollStart  = currentIndex;
  };
  const onPointerUp = (e) => {
    if (pointerStart === null) return;
    const end   = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = pointerStart - end;
    if (Math.abs(delta) > 40) goTo(delta > 0 ? currentIndex + 1 : currentIndex - 1);
    pointerStart = null;
  };

  viewport.addEventListener('touchstart',  onPointerDown, { passive: true });
  viewport.addEventListener('touchend',    onPointerUp,   { passive: true });
  viewport.addEventListener('mousedown',   onPointerDown);
  viewport.addEventListener('mouseup',     onPointerUp);

  // Re-calculate on resize
  window.addEventListener('resize', () => goTo(Math.min(currentIndex, maxIndex())));

  goTo(0);
})();

// Footer year
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Contact form AJAX submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      contactForm.reset();
      if (formSuccess) formSuccess.hidden = false;
    } else {
      btn.disabled = false;
    }
  } catch {
    btn.disabled = false;
  }
});

// Modal pour les certificats
function openModal(imgSrc){
  document.getElementById('certModal').style.display='block';
  document.getElementById('modalImg').src=imgSrc;
}
function closeModal(){
  document.getElementById('certModal').style.display='none';
}
window.onclick=function(event){
  const modal=document.getElementById('certModal');
  if(event.target==modal) closeModal();
}
