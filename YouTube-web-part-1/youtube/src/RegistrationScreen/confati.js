import './DesignRegist.css';

const progressBarEl = document.getElementById("progress-bar");

//confetti design function
window.addEventListener("scroll", () => {
  let height = document.body.scrollHeight - window.innerHeight;
  let scrollPosition = document.documentElement.scrollTop;
  let width = (scrollPosition / height) * 100;
  progressBarEl.style.width ='${width}%'
  
});