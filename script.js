(function(){
  // mobile menu
  var burger=document.getElementById('hamburger'), menu=document.getElementById('navMenu');
  burger.addEventListener('click',function(){menu.classList.toggle('active')});
  [].forEach.call(menu.querySelectorAll('a'),function(a){a.addEventListener('click',function(){menu.classList.remove('active')})});

  // active nav link
  var links=[].slice.call(document.querySelectorAll('.nav-link'));
  var secs=links.map(function(l){return document.querySelector(l.getAttribute('href'))});
  function mark(){
    var y=window.scrollY+140, cur=0;
    secs.forEach(function(s,i){ if(s && s.offsetTop<=y) cur=i });
    links.forEach(function(l,i){ l.classList.toggle('on',i===cur) });
  }
  window.addEventListener('scroll',mark,{passive:true}); mark();

  // request trace
  var stages=[].slice.call(document.querySelectorAll('.stage'));
  var rows=[].slice.call(document.querySelectorAll('#rows .row'));
  var cur=0, paused=false;
  function show(i){
    cur=i;
    stages.forEach(function(s,n){s.setAttribute('aria-pressed',n===i?'true':'false')});
    rows.forEach(function(r,n){r.setAttribute('data-on',n===i?'true':'false')});
  }
  stages.forEach(function(s){ s.addEventListener('click',function(){paused=true;show(+s.getAttribute('data-i'))}) });
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    setInterval(function(){ if(!paused) show((cur+1)%stages.length) },2200);
  }

  // copy email
  var copy=document.getElementById('copyBtn'), mail=document.getElementById('mail');
  copy.addEventListener('click',function(){
    function sel(){var r=document.createRange();r.selectNodeContents(mail);var s=getSelection();s.removeAllRanges();s.addRange(r);copy.textContent='Selected, press copy'}
    try{ navigator.clipboard.writeText(mail.textContent).then(function(){copy.textContent='Copied'},sel) }catch(e){ sel() }
    setTimeout(function(){copy.textContent='Copy email'},2200);
  });

  // name types out, holds, then deletes and repeats
  var el=document.getElementById('typed');
  if(el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var full='Ruhani Gera', n=full.length, dir=-1;
    el.classList.add('typing');
    function tick(){
      if(dir===1){
        n++; el.textContent=full.slice(0,n);
        if(n>=full.length){dir=-1; return setTimeout(tick,2400)}
        return setTimeout(tick,95);
      }else{
        n--; el.textContent=full.slice(0,n);
        if(n<=0){dir=1; return setTimeout(tick,450)}
        return setTimeout(tick,55);
      }
    }
    setTimeout(tick,2600);
  }
})();
