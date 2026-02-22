// Toggle sombre/clair
const toggle=document.querySelector('.mode-toggle');
const icon=document.getElementById('moon-icon');
toggle.addEventListener('click',()=>{
  document.body.classList.toggle('light-mode');
  if(document.body.classList.contains('light-mode')){
    icon.setAttribute('fill','#ffaa00');
  } else{
    icon.setAttribute('fill','#00c6ff');
  }
});

// Traduction simple
const translations={
"Français":{"portfolio-title":"Portfolio","about-title":"À propos de moi","about-text":"Étudiant en informatique motivé à la Hochschule Mittelhessen, passionné par le développement logiciel, les bases de données et les nouvelles technologies.","skills-title":"Compétences"},
"English":{"portfolio-title":"Portfolio","about-title":"About Me","about-text":"Motivated Computer Science student at the Technical University of Central Hesse, passionate about software development, databases, and new technologies.","skills-title":"Skills"},
"Deutsch":{"portfolio-title":"Portfolio","about-title":"Über mich","about-text":"Motivierter Informatikstudent an der Technische Hochschule Mittelhessen mit Leidenschaft für Softwareentwicklung, Datenbanken und neue Technologien.","skills-title":"Skills"}
};
document.querySelectorAll('.dropdown-content a').forEach(link=>{
  link.addEventListener('click',e=>{
    const lang=e.target.textContent;
    document.querySelectorAll('[data-key]').forEach(el=>{
      const key=el.getAttribute('data-key');
      if(translations[lang][key]) el.textContent=translations[lang][key];
    });
  });
});
