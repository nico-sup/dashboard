/* toggle */
const nav = document.querySelector('nav')
const toggleNav = document.querySelector('.togglenav')
const menu = toggleNav.querySelector('.menu')
const list = toggleNav.querySelector('.list')
const toggleBg = toggleNav.querySelector('.js-toggle')
const buttons = toggleNav.querySelectorAll('button')

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        if(event.target.classList.contains('menu')) {
            toggleNav.classList.add('menu-active')
            toggleNav.classList.remove('list-active')
            nav.classList.add('nav-menu-active')
            nav.classList.remove('nav-list-active')
        } else {
            toggleNav.classList.toggle('list-active')
            toggleNav.classList.remove('menu-active')
            nav.classList.remove('nav-menu-active')
            nav.classList.add('nav-list-active')
        }
    })
})

/* Open menu mobile */
const buttonToggleMenu = document.querySelector('.mobile-nav');

buttonToggleMenu.addEventListener('click', (event) => {
    if (!nav.classList.contains('menu-active')) {
        nav.classList.add('menu-active');

        const closeMenu = (e) => {
            if (!nav.contains(e.target)) {
                nav.classList.remove('menu-active');
                document.removeEventListener('click', closeMenu);
            }
        };

        document.addEventListener('click', closeMenu);
    } else {
        nav.classList.remove('menu-active');
    }

    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    if (nav.classList.contains('menu-active') && !buttonToggleMenu.contains(event.target)) {
        nav.classList.remove('menu-active');
    }
});



class Accordion {
    constructor(wrapper, toggle, content, openSpeed = 300, closeSpeed = 300) {
      this.wrapper = wrapper;
      this.toggleElement = toggle;
      this.contentElement = content;
      this.isOpen = false;
      this.animationInProgress = false;
      this.openSpeed = openSpeed;
      this.closeSpeed = closeSpeed;
      this.isActiveAccordion = false; // Ajout de la propriété pour suivre si l'accordéon est actif
  
      if (this.toggleElement) {
        this.toggleElement.addEventListener('click', () => this.toggle());
      } else {
        console.error('Toggle element not found');
      }
    }
  
    toggle() {
      if (this.animationInProgress) return;
  
      if (this.isOpen) {
        this.close();
      } else {
        if (Accordion.activeAccordion) {
          Accordion.activeAccordion.close(); // Ferme l'accordéon actif avant d'ouvrir le nouveau
        }
  
        this.open();
      }
    }
  
    open() {
      if (this.animationInProgress) return;
  
      this.isOpen = true;
      this.isActiveAccordion = true;
      Accordion.activeAccordion = this; // Met à jour l'accordéon actif
      this.wrapper.classList.add('opened'); // Ajoutez la classe lorsque l'accordéon est ouvert
      this.animateAccordion(true);
    }
  
    close() {
      if (this.animationInProgress) return;
  
      this.isOpen = false;
      this.isActiveAccordion = false;
      Accordion.activeAccordion = null; // Aucun accordéon n'est actif
      this.wrapper.classList.remove('opened'); // Supprimez la classe lorsque l'accordéon est fermé
      this.animateAccordion(false);
    }
  
    animateAccordion(opening) {
      const startHeight = opening ? 0 : this.contentElement.scrollHeight;
      const endHeight = opening ? this.contentElement.scrollHeight : 0;
      const duration = opening ? this.openSpeed : this.closeSpeed;
      const startTime = performance.now();
  
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const newHeight = startHeight + progress * (endHeight - startHeight);
  
        this.contentElement.style.height = `${newHeight}px`;
  
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.animationInProgress = false;
  
          if (!opening) {
            this.contentElement.style.height = '';
          }
        }
      };
  
      this.animationInProgress = true;
      requestAnimationFrame(animate);
    }
}
  
const accordionElements = document.querySelectorAll('[data-accordion-wrapper]');

// Créez une instance d'Accordion pour chaque ensemble d'éléments
accordionElements.forEach((accordionElement) => {
const wrapper = accordionElement;
const toggleElement = wrapper.querySelector('[data-toggle-button]');
const contentElement = wrapper.querySelector('[data-accordion-content]');

new Accordion(wrapper, toggleElement, contentElement, 500, 200);
});


/* STEPS */
const steps = document.querySelector('.steps')

for(let i = 0; i < 8; i++) {
    const step = document.createElement('div')
    steps.append(step)
    const task = document.createElement('p')
    const status = document.createElement('span')
    step.append(task)
    step.append(status)

    if (i < 4) {
        step.className = "step done";
        task.textContent = "Step done"
    } else if (4 <= i && i < 6) {
        step.className = "step ongoin";
        task.textContent = "Step ongoing"
    } else {
        step.className = "step disable";
        task.textContent = "Not completed"
    }
}

/* popin */
const popin = document.querySelector('.popin');
const firstP = popin.querySelector('.first');
const secondP = popin.querySelector('.second');
const buttonPopin = popin.querySelector('.js-next');
const body = document.body;

let clickCount = 0;

buttonPopin.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
        body.classList.add('help-one');
        firstP.textContent = "Vous pouvez modifier l'affichage de la navigation au click sur les boutons";
        popin.style.top = '27%';
        popin.style.left = '42%';
        popin.style.boxShadow = '0 0 0 40vw rgba(0,0,0,0.5)';
    } else if (clickCount === 2) {
        body.classList.remove('help-one');
        body.classList.add('help-two');
        firstP.textContent = "Vous pouvez suivre l'avancé de votre projet grâce à notre système de suivi en temps réel";
        popin.style.top = '54%';
        popin.style.left = '67%';
        popin.style.boxShadow = '0 0 0 40vw rgba(0,0,0,0.5)';
    } else if (clickCount === 3) {
        body.classList.remove('help-two');
        body.classList.add('help-three');
        firstP.textContent = "Vos données sont centralisées dans ces tableaux";
        secondP.textContent = "Finir le tutoriel";
        popin.style.top = '30%';
        popin.style.left = '50%';
        popin.style.boxShadow = '0 0 0 40vw rgba(0,0,0,0.5)';
    } else {
        popin.style.display = "none"
        body.classList.remove('help-three');
    }

    popin.style.boxShadow = '0 0 0 40vw rgba(0,0,0,0.5)';
});


