// Theme toggle
const themeButton=document.getElementById('theme');
if(themeButton)themeButton.addEventListener('click',()=>{document.body.classList.toggle('light');themeButton.textContent=document.body.classList.contains('light')?'☀':'◐'});
// Smooth anchor navigation
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length>1){const target=document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}}}));
// Reveal content (rank cards remain visible as a safeguard)
const revealTargets=document.querySelectorAll('.about-grid>div,.section-head,.gear-card,.quote,.contact');
revealTargets.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});revealTargets.forEach(el=>observer.observe(el));}else revealTargets.forEach(el=>el.classList.add('visible'));
// Gentle tilt on gear cards
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.gear-card').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-4px) perspective(900px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg)`});card.addEventListener('mouseleave',()=>card.style.transform='')});}
// Scroll progress indicator
const progress=document.createElement('div');progress.id='z2z-progress';document.body.appendChild(progress);
const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%'};addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
// Cursor ambient glow (desktop only)
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const glow=document.createElement('div');glow.className='z2z-cursor-glow';document.body.appendChild(glow);let gx=innerWidth/2,gy=innerHeight/2;addEventListener('mousemove',e=>{gx=e.clientX;gy=e.clientY;glow.style.transform=`translate(${gx-160}px,${gy-160}px)`},{passive:true});}
// Lightweight ambient particles: accent-colored floating motes with no external libraries
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const canvas=document.createElement('canvas');canvas.id='z2z-particles';document.body.prepend(canvas);const ctx=canvas.getContext('2d');if(!ctx)return;let w,h,dpr,particles=[],raf;const mouse={x:-9999,y:-9999};
function resize(){dpr=Math.min(devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(65,Math.max(24,Math.floor(w*h/22000)));particles=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:-(.12+Math.random()*.28),r:.6+Math.random()*1.5,a:.12+Math.random()*.35}));}
function draw(){ctx.clearRect(0,0,w,h);for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.y<-10)p.y=h+10;if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.hypot(dx,dy);if(dist<100&&dist>0){p.x+=dx/dist*.04;p.y+=dy/dist*.04;}ctx.beginPath();ctx.fillStyle=`rgba(201,250,98,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}raf=requestAnimationFrame(draw);}
addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});addEventListener('resize',resize);resize();draw();document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else draw();});})();
