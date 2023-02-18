const tiltEffectSettings = {
    max: 10, 
    perspective: 1000,
    scale: 1.08,
    speed: 500, 
    easing: "cubic-bezier(.03,.98,.52,.99)"
  };
  
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    card.addEventListener("mouseenter", cardMouseEnter);
    card.addEventListener("mousemove", cardMouseMove);
    card.addEventListener("mouseleave", cardMouseLeave);
  });
  
  function cardMouseEnter(event) {
    setTransition(event);
  }
  
  function cardMouseMove(event) {
    const card = event.currentTarget;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth/2;
    const centerY = card.offsetTop + cardHeight/6;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = (+1)*tiltEffectSettings.max*mouseY/(cardHeight/5);
    const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(cardWidth/2);
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                    (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                    (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);
  
    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
  }
  
  function cardMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(event);
  }
  
  function setTransition(event) {
    const card = event.currentTarget;
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
      card.style.transition = "";
    }, tiltEffectSettings.speed);
  }