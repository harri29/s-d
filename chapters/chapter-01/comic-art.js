(() => {
  const C={
    lam:{hair:'#11192c',hair2:'#233d63',eye:'#d9f6ff',coat:'#223b67',trim:'#e8f4ff',skin:'#f3c8ac'},
    wulin:{hair:'#171923',hair2:'#2f3345',eye:'#4c638f',coat:'#315a84',trim:'#eef6ff',skin:'#f3c6a7'},
    xie:{hair:'#4a342d',hair2:'#785044',eye:'#d7ad68',coat:'#384d72',trim:'#f3f5ff',skin:'#f0c3a4'},
    wu:{hair:'#4d87ba',hair2:'#91d3e8',eye:'#8ad8ef',coat:'#f4f8fb',trim:'#b7d9e9',skin:'#efd0b7'}
  };
  const esc=s=>String(s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  function defs(){return `<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c9eff8"/><stop offset=".48" stop-color="#72a9cd"/><stop offset="1" stop-color="#405579"/></linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4d49c"/><stop offset=".6" stop-color="#956d92"/><stop offset="1" stop-color="#38466d"/></linearGradient>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#1e3765"/><stop offset=".7" stop-color="#101d38"/><stop offset="1" stop-color="#080e1d"/></linearGradient>
    <radialGradient id="gold"><stop stop-color="#fff5b3"/><stop offset=".3" stop-color="#f5c34f"/><stop offset="1" stop-color="#be6b2e"/></radialGradient>
    <radialGradient id="silver"><stop stop-color="#f2fdff"/><stop offset=".35" stop-color="#a8e7f5"/><stop offset="1" stop-color="#5578b4"/></radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="16"/></filter>
  </defs>`}
  function bg(mood='school'){
    const fill=mood==='night'?'url(#night)':mood==='sunset'?'url(#sun)':mood==='gold'?'#2c2037':'url(#sky)';
    let s=`<rect width="1000" height="700" fill="${fill}"/>`;
    if(mood==='night'){
      s+=`<circle cx="805" cy="110" r="62" fill="#e7f3ff" opacity=".92"/><g opacity=".5" fill="#d5efff">${[90,180,330,540,690,890].map((x,i)=>`<circle cx="${x}" cy="${70+(i%3)*55}" r="${2+i%3}"/>`).join('')}</g>`;
    } else {
      s+=`<circle cx="820" cy="90" r="80" fill="#fff7d7" opacity=".35"/>`;
    }
    return s;
  }
  function academy(y=470){return `<g opacity=".9"><path d="M0 ${y} L0 270 L150 235 L260 270 L260 ${y} Z" fill="#36516f"/><path d="M250 ${y} L250 205 L430 165 L600 210 L600 ${y} Z" fill="#425f80"/><path d="M580 ${y} L580 245 L760 205 L1000 250 L1000 ${y} Z" fill="#304c6c"/><g fill="#a7e1f2" opacity=".72">${[300,355,410,465,520].map(x=>`<rect x="${x}" y="245" width="28" height="60" rx="3"/>`).join('')}</g><path d="M0 ${y} H1000 V700 H0Z" fill="#233754"/></g>`}
  function crowd(){return `<g opacity=".36">${Array.from({length:14},(_,i)=>{const x=25+i*72,y=500+(i%2)*28;return `<circle cx="${x}" cy="${y-48}" r="20" fill="#18233a"/><path d="M${x-24} ${y+40} Q${x} ${y-5} ${x+24} ${y+40}Z" fill="#17253f"/>`}).join('')}</g>`}
  function face(c){return `<ellipse cx="0" cy="0" rx="42" ry="49" fill="${c.skin}"/><path d="M-24 -2 Q-13 -9 -4 -3" stroke="#432d35" stroke-width="3" fill="none"/><path d="M7 -3 Q18 -9 27 -1" stroke="#432d35" stroke-width="3" fill="none"/><ellipse cx="-14" cy="5" rx="7" ry="9" fill="${c.eye}"/><ellipse cx="17" cy="5" rx="7" ry="9" fill="${c.eye}"/><circle cx="-12" cy="3" r="2" fill="#fff"/><circle cx="19" cy="3" r="2" fill="#fff"/><path d="M-6 27 Q4 31 13 26" stroke="#9a5d5f" stroke-width="2" fill="none"/>`}
  function hair(c,type){
    if(type==='wu') return `<path d="M-48 -9 Q-52 -68 0 -73 Q55 -66 50 -4 L41 -30 L30 -8 L14 -43 L-1 -13 L-19 -42 L-30 -8Z" fill="${c.hair}"/><path d="M-42 20 Q-68 110 -30 180" stroke="${c.hair}" stroke-width="28" fill="none"/><path d="M43 16 Q70 108 31 186" stroke="${c.hair2}" stroke-width="18" fill="none" opacity=".7"/>`;
    return `<path d="M-48 1 Q-51 -61 -3 -70 Q45 -68 50 -7 L34 -32 L24 -5 L8 -39 L-8 -8 L-21 -43 L-31 -8Z" fill="${c.hair}"/><path d="M-43 -26 Q0 -73 42 -28" stroke="${c.hair2}" stroke-width="8" fill="none" opacity=".65"/>`;
  }
  function character(name,x,y,s=1,pose='stand',flip=false){
    const c=C[name]; const f=flip?-1:1; const rot=pose==='dash'?-15:pose==='hit'?10:0;
    const arm1=pose==='punch'?`<path d="M-30 92 L95 55" stroke="${c.skin}" stroke-width="18" stroke-linecap="round"/>`:pose==='dash'?`<path d="M-30 92 L-95 130" stroke="${c.skin}" stroke-width="17" stroke-linecap="round"/>`:`<path d="M-30 92 L-55 150" stroke="${c.skin}" stroke-width="16" stroke-linecap="round"/>`;
    const arm2=pose==='punch'?`<path d="M30 92 L55 140" stroke="${c.skin}" stroke-width="17" stroke-linecap="round"/>`:pose==='dash'?`<path d="M30 92 L90 45" stroke="${c.skin}" stroke-width="17" stroke-linecap="round"/>`:`<path d="M30 92 L55 150" stroke="${c.skin}" stroke-width="16" stroke-linecap="round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s*f} ${s}) rotate(${rot})"><path d="M-48 66 Q0 38 48 66 L68 190 L-65 190Z" fill="${c.coat}"/><path d="M-18 55 L0 90 L20 55" fill="${c.trim}" opacity=".96"/>${arm1}${arm2}<path d="M-26 186 L-35 270 M28 186 L40 270" stroke="#182740" stroke-width="24" stroke-linecap="round"/>${face(c)}${hair(c,name)}${name==='lam'?`<g class="lam-eye" opacity=".9"><circle cx="-14" cy="5" r="11" fill="none" stroke="#e9fdff" stroke-width="1.5"/><circle cx="17" cy="5" r="11" fill="none" stroke="#e9fdff" stroke-width="1.5"/></g>`:''}</g>`;
  }
  function goldDragon(cx=700,cy=260,scale=1){return `<g transform="translate(${cx} ${cy}) scale(${scale})" opacity=".72" filter="url(#glow)"><path d="M-250 80 C-140 -100 80 -120 245 -30 C160 -30 110 30 80 80 C20 10 -70 0 -125 65 C-165 115 -210 120 -250 80Z" fill="none" stroke="#f6ca52" stroke-width="28"/><path d="M120 -25 l70 -70 -18 82 70 -25 -63 68" fill="#f5c34f"/><circle cx="135" cy="5" r="10" fill="#fff6b1"/></g>`}
  function silverTrails(){return `<g fill="none" stroke="#d8f8ff" stroke-width="5" opacity=".72" filter="url(#glow)"><path d="M70 545 C240 390 420 470 580 250 S820 120 955 195"/><path d="M-10 390 C210 320 300 190 520 210 S780 410 1010 315"/><path d="M110 160 C270 250 430 90 620 145"/></g>`}
  function dagger(x,y,r=0){return `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 L100 -12 L20 18Z" fill="#effcff" stroke="#8bdcf1" stroke-width="3" filter="url(#glow)"/><rect x="-10" y="-9" width="24" height="18" rx="4" fill="#5d759a"/></g>`}
  function chains(){return `<g fill="none" stroke="#e8b940" stroke-width="14" opacity=".78" filter="url(#glow)">${[-120,-40,40,120].map((d,i)=>`<path d="M${-100+d} 80 C${120+d} ${220-i*20} ${500+d} ${110+i*45} ${1050+d} ${270+i*20}"/>`).join('')}</g>`}
  function dragonEye(){return `<g transform="translate(650 320)" filter="url(#glow)"><ellipse rx="250" ry="115" fill="#1b1723" stroke="#bd812e" stroke-width="14"/><ellipse rx="70" ry="105" fill="#f5c34f"/><ellipse rx="16" ry="95" fill="#241211"/><circle cx="-26" cy="-35" r="10" fill="#fff6bd"/></g>`}
  function scene(page,i,mood){
    let s=bg(mood); const key=`${page}-${i}`;
    if(page<=7 && mood!=='night') s+=academy(500);
    if(page===1&&i===0) s+=crowd()+character('lam',150,410,.65);
    else if(page===1) s+=character('lam',500,310,1.05);
    else if(page===2&&i===0) s+=`<circle cx="500" cy="350" r="180" fill="url(#silver)" opacity=".4" filter="url(#soft)"/>`+character('lam',500,290,1.4);
    else if(page===2&&i===1) s+=crowd()+silverTrails();
    else if(page===2) s+=character('lam',500,330,1.1)+silverTrails();
    else if(page===3&&i===0) s+=crowd()+character('wulin',580,320,.95)+character('lam',230,360,.72);
    else if(page===3&&i===1) s+=character('wulin',520,300,1.05)+`<circle cx="520" cy="420" r="85" fill="url(#gold)" opacity=".5" filter="url(#soft)"/>`;
    else if(page===3&&i===2) s+=character('lam',500,290,1.55);
    else if(page===3) s+=goldDragon(540,320,.92)+`<circle cx="180" cy="360" r="120" fill="url(#silver)" opacity=".4"/>`;
    else if(page===4&&i===0) s+=character('lam',500,290,1.35)+`<path d="M485 315 q12 22 5 44" stroke="#a93445" stroke-width="7" fill="none"/>`;
    else if(page===4&&i===1) s+=character('wulin',620,325,.96,true)+character('lam',300,340,.9)+`<rect x="445" y="420" width="95" height="55" rx="8" fill="#fafafa" transform="rotate(-10 490 447)"/>`;
    else if(page===4) s+=character('wulin',645,330,.92,true)+character('lam',340,340,.9);
    else if(page===5&&i===0) s+=`<rect x="180" y="100" width="650" height="460" rx="24" fill="#e8f0f6" opacity=".92"/><g fill="#2b3b58" font-family="sans-serif" font-size="38"><text x="270" y="250">Lớp 5</text><text x="270" y="330">Lâm Mặc</text></g>`;
    else if(page===5&&i===1) s+=character('wulin',625,330,.9,true)+character('lam',330,340,.86);
    else if(page===5&&i===2) s+=character('xie',520,320,1.05);
    else if(page===5) s+=character('xie',520,320,1)+`<path d="M480 520 C300 420 330 230 470 210" stroke="#f2df9a" stroke-width="18" fill="none" opacity=".55" filter="url(#glow)"/><path d="M565 520 C760 420 700 240 560 210" stroke="#6b6d9d" stroke-width="18" fill="none" opacity=".55" filter="url(#glow)"/>`;
    else if(page===6&&i===0) s+=crowd()+character('lam',190,350,.68);
    else if(page===6&&i===1) s+=character('wu',530,250,1.12);
    else if(page===6) s+=character('lam',280,330,.85)+`<path d="M980 150 L250 540" stroke="#b9efff" stroke-width="20" filter="url(#glow)"/>`+character('wu',760,310,.8);
    else if(page===7) s+=i===0?character('wu',500,270,1):i===1?character('xie',520,310,1.05):i===2?character('lam',520,310,1.05):character('wu',500,280,1.05);
    else if(page===8&&i===0) s+=academy(530)+character('wu',510,200,.62)+character('lam',220,390,.65)+character('wulin',500,400,.65)+character('xie',800,390,.65,true);
    else if(page===8) s+=character('lam',230,350,.75)+character('wulin',500,350,.75)+character('xie',780,350,.75,true);
    else if(page===9&&i===0) s+=character('xie',460,350,1.05,'dash')+dagger(540,375,-12);
    else if(page===9&&i===1) s+=character('wulin',520,350,1.05,'punch')+character('xie',760,350,.72,'dash',true);
    else if(page===9&&i===2) s+=character('xie',500,330,1.05)+character('lam',820,380,.68);
    else if(page===9) s+=character('lam',500,300,1.25)+silverTrails();
    else if(page===10&&i===0) s+=silverTrails()+`<circle cx="500" cy="350" r="150" fill="url(#silver)" opacity=".35" filter="url(#soft)"/>`;
    else if(page===10&&i===1) s+=silverTrails()+character('xie',560,350,.95,'dash');
    else if(page===10&&i===2) s+=character('lam',360,340,.85)+character('xie',700,350,.82,'dash',true)+dagger(520,310,-3);
    else if(page===10) s+=character('lam',390,350,.85)+character('xie',650,370,.9,'hit',true);
    else if(page===11&&i===0) s+=character('wulin',510,350,1.05,'punch');
    else if(page===11&&i===1) s+=character('lam',380,340,.85)+silverTrails();
    else if(page===11&&i===2) s+=silverTrails()+goldDragon(700,340,.55);
    else if(page===11) s+=character('wulin',360,350,.9,'punch')+character('lam',690,360,.85,'hit',true)+`<circle cx="545" cy="380" r="120" fill="url(#gold)" opacity=".65" filter="url(#soft)"/>`;
    else if(page===12&&i===0) s+=character('lam',430,350,.85)+character('xie',650,350,.8,true)+dagger(515,330,5);
    else if(page===12&&i===1) s+=character('lam',500,300,1.25)+`<circle cx="500" cy="315" r="100" fill="url(#silver)" opacity=".3"/>`;
    else if(page===12&&i===2) s+=character('xie',520,330,1.08,'hit')+`<circle cx="500" cy="300" r="150" fill="url(#silver)" opacity=".35" filter="url(#soft)"/>`;
    else if(page===12) s+=character('lam',340,360,.8)+character('xie',560,390,.7,'hit')+character('wulin',830,350,.62,'punch',true);
    else if(page===13&&i===0) s+=character('xie',250,430,.55,'hit')+character('wulin',530,410,.6)+character('lam',820,390,.62);
    else if(page===13&&i===1) s+=character('wu',500,290,.95);
    else if(page===13) s+=character('wu',700,320,.82)+character('lam',320,340,.86);
    else if(page===14&&i===0) s+=character('wu',510,280,1.02)+`<rect x="0" y="580" width="1000" height="120" fill="#d59c77" opacity=".35"/>`;
    else if(page===14&&i===1) s+=character('lam',500,300,1.15);
    else if(page===14) s+=character('xie',330,390,.72,'hit')+character('wulin',670,380,.72);
    else if(page===15&&i===0) s+=`<rect x="80" y="470" width="360" height="110" rx="14" fill="#273452"/><rect x="560" y="470" width="360" height="110" rx="14" fill="#273452"/>`;
    else if(page===15&&i===1) s+=character('lam',300,360,.75)+character('wulin',760,450,.48);
    else if(page===15&&i===2) s+=chains();
    else if(page===15) s+=chains()+dragonEye();
    else if(page===16&&i===0) s+=character('lam',500,310,1.2)+`<path d="M500 430 q20 35 0 60" stroke="#a93445" stroke-width="8"/>`;
    else if(page===16&&i===1) s+=character('wulin',510,430,.6);
    else if(page===16&&i===2) s+=character('lam',500,330,1.05);
    else if(page===16) s+=academy(545)+`<circle cx="830" cy="110" r="70" fill="#e9f5ff" opacity=".9"/>`;
    else s+=academy();
    return s;
  }
  window.renderPanelIllustration=(page,index,mood,alt)=>`<svg class="comic-svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(alt)}">${defs()}${scene(page,index,mood)}</svg>`;
})();