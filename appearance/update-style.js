const css = `
:root{
  --bg:#04070f;
  --card:#0b1120;
  --card-2:#0e1628;
  --border:rgba(255,255,255,.07);
  --border-accent:rgba(245,166,35,.12);
  --text:#f4f7ff;
  --muted:#b0bdd4;
  --muted-2:#7a8aaa;
  --accent:#f5a623;
  --accent-2:#ff7c2a;
  --accent-glow:hsla(38,92%,50%,.15);
  --success:#1fd16f;
  --danger:#ff4c6a;
  --shadow:0 24px 60px rgba(0,0,0,.5);
  --shadow-sm:0 8px 24px rgba(0,0,0,.3);
}

html,body{
  margin:0;
  padding:0;
  width:100%;
  overflow-x:hidden;
  background:var(--bg);
}

.pd-wrapper{
  position:relative;
  width:100%;
  min-height:100vh;
  overflow-x:hidden;
  background:
    radial-gradient(ellipse 55% 35% at 90% 0%,hsla(38,92%,50%,.09),transparent),
    radial-gradient(ellipse 45% 30% at 5% 95%,rgba(59,130,246,.07),transparent),
    var(--bg);
  color:var(--text);
  line-height:1.7;
  font-family:'Satoshi',system-ui,sans-serif;
}

.pd-wrapper::before{
  content:"";
  pointer-events:none;
  position:fixed;
  inset:0;
  background:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");
  z-index:0;
}

.pd-wrapper *,
.pd-wrapper *::before,
.pd-wrapper *::after{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

.pd-wrapper img{display:block;max-width:100%}
.pd-wrapper a{text-decoration:none;color:inherit}
.pd-wrapper ul,.pd-wrapper ol{list-style:none}
.pd-wrapper button{border:none;outline:none;font:inherit;cursor:pointer}

.pd-wrapper #project-detail-content{
  position:relative;
  z-index:1;
  width:min(1180px,92%);
  margin:auto;
  padding:110px 0 90px;
}


.pd-wrapper .pd-project-hero{
  position:relative;
  overflow:hidden;
  background:linear-gradient(155deg,rgba(13,20,38,.98),rgba(8,13,26,.99));
  border:1px solid var(--border);
  border-radius:32px;
  padding:38px;
  margin-bottom:24px;
  box-shadow:var(--shadow);
  animation:fadeUp .65s cubic-bezier(.22,.68,0,1.2) both;
}

.pd-wrapper .pd-project-hero::before{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(130deg,rgba(255,255,255,.04) 0%,transparent 50%);
  pointer-events:none;
  border-radius:inherit;
}

.pd-wrapper .pd-project-hero::after{
  content:"";
  position:absolute;
  top:0;left:60px;right:60px;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(245,166,35,.35),transparent);
}

.pd-wrapper .pd-hero-thumbnail{
  width:100%;
  height:440px;
  overflow:hidden;
  border-radius:22px;
  margin-bottom:34px;
  background:#060c18;
  border:1px solid rgba(255,255,255,.06);
}

.pd-wrapper .pd-hero-thumbnail img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.pd-wrapper .pd-hero-meta{
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:10px;
  margin-bottom:22px;
}

.pd-wrapper .pd-tech-badge,
.pd-wrapper .pd-status-badge,
.pd-wrapper .pd-featured-badge,
.pd-wrapper .pd-tag-badge{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  padding:9px 16px;
  border-radius:999px;
  font-size:.78rem;
  font-weight:700;
  letter-spacing:.6px;
  text-transform:uppercase;
}

.pd-wrapper .pd-tech-badge{
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.09);
  color:var(--text);
}

.pd-wrapper .pd-status-badge{
  background:rgba(31,209,111,.07);
  border:1px solid rgba(31,209,111,.18);
  color:var(--success);
}

.pd-wrapper .pd-featured-badge{
  background:linear-gradient(135deg,var(--accent),var(--accent-2));
  color:#111;
  box-shadow:0 4px 18px hsla(38,92%,50%,.3);
}

.pd-wrapper .pd-tag-badge{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.09);
  color:#a0b0c8;
}

.pd-wrapper .pd-project-hero h1{
  font-family:'Clash Display',sans-serif;
  font-size:clamp(2.8rem,6vw,5.4rem);
  line-height:1.05;
  font-weight:800;
  letter-spacing:-2.5px;
  margin-bottom:18px;
  background:linear-gradient(135deg,#ffd166 0%,#f5a623 50%,#ff8c42 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 0 28px hsla(38,92%,50%,.22));
}

.pd-wrapper .pd-hero-desc{
  max-width:720px;
  color:#a8b8d0;
  font-size:1.02rem;
  line-height:1.9;
}

.pd-wrapper .pd-hero-actions{
  display:flex;
  align-items:center;
  gap:12px;
  margin-top:32px;
}

.pd-wrapper .pd-hero-actions .btn{flex:1;min-width:0}


.pd-wrapper .btn{
  position:relative;
  overflow:hidden;
  height:56px;
  padding:0 26px;
  border-radius:16px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:9px;
  font-size:.92rem;
  font-weight:700;
  white-space:nowrap;
}

.pd-wrapper .btn-success{
  color:#111;
  background:linear-gradient(135deg,var(--accent),var(--accent-2));
  box-shadow:0 6px 24px hsla(38,92%,50%,.28),inset 0 1px 0 rgba(255,255,255,.2);
}

.pd-wrapper .btn-danger{
  color:var(--text);
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.09);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.05);
}

.pd-wrapper .btn i{font-size:.9rem}


.pd-wrapper .pd-detail-section{
  position:relative;
  overflow:hidden;
  background:linear-gradient(165deg,rgba(12,18,34,.98),rgba(8,12,22,.99));
  border:1px solid var(--border);
  border-radius:28px;
  padding:34px;
  margin-bottom:20px;
  box-shadow:var(--shadow);
  animation:fadeUp .65s cubic-bezier(.22,.68,0,1.2) both;
}

.pd-wrapper .pd-detail-section::before{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(130deg,rgba(255,255,255,.028),transparent 55%);
  pointer-events:none;
}

.pd-wrapper .pd-detail-section::after{
  content:"";
  position:absolute;
  top:0;left:50px;right:50px;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);
}


.pd-wrapper .pd-detail-section h3,
.pd-wrapper .pd-detail-section h4{
  display:flex;
  align-items:center;
  gap:14px;
  font-family:'Clash Display',sans-serif;
  font-size:1.5rem;
  font-weight:700;
  margin-bottom:24px;
  letter-spacing:-.4px;
  background:linear-gradient(135deg,#ffd166,#f5a623,#ff8c42);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.pd-wrapper .pd-detail-section h4{
  margin:0 0 24px;
}

.pd-wrapper .pd-detail-section h3 i,
.pd-wrapper .pd-detail-section h4 i{
  width:40px;
  height:40px;
  border-radius:13px;
  background:linear-gradient(135deg,var(--accent),var(--accent-2));
  color:#111 !important;
  -webkit-text-fill-color:#111 !important;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:.88rem;
  flex-shrink:0;
  box-shadow:0 4px 16px hsla(38,92%,50%,.28);
}

.pd-wrapper .pd-detail-section h3 .section-icon,
.pd-wrapper .pd-detail-section h4 .section-icon{
  width:40px;
  height:40px;
  border-radius:13px;
  background:linear-gradient(135deg,var(--accent),var(--accent-2));
  color:#111 !important;
  -webkit-text-fill-color:#111 !important;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  box-shadow:0 4px 16px hsla(38,92%,50%,.28);
}

.pd-wrapper .pd-detail-section h3 .section-icon svg,
.pd-wrapper .pd-detail-section h4 .section-icon svg{
  color:#111 !important;
  stroke:#111 !important;
  width:18px;
  height:18px;
}

.pd-wrapper .pd-detail-section p{
  color:#a8b8d0;
  line-height:1.95;
  text-align:justify;
  font-size:.96rem;
}

.pd-wrapper .pd-overview-text{
  color:#a8b8d0;
  line-height:2;
  text-align:justify;
  font-size:.97rem;
}


.pd-wrapper .pd-badge-row{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}


.pd-wrapper .pd-two-col{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:20px;
  margin-bottom:20px;
}

.pd-wrapper .pd-two-col .pd-detail-section{
  margin-bottom:0;
}


.pd-wrapper .pd-check-list{
  display:flex;
  flex-direction:column;
  gap:12px;
}

.pd-wrapper .pd-check-item{
  display:flex;
  align-items:center;
  gap:14px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.06);
  border-left:2px solid rgba(245,166,35,.3);
  border-radius:16px;
  padding:16px 20px;
}

.pd-wrapper .pd-check-item .icon{
  width:28px;
  height:28px;
  border-radius:8px;
  background:rgba(245,166,35,.12);
  border:1px solid rgba(245,166,35,.22);
  color:var(--accent);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:.78rem;
  flex-shrink:0;
}

.pd-wrapper .pd-check-item span{
  color:#c8d4e8;
  line-height:1.6;
  font-size:.95rem;
  font-weight:500;
  letter-spacing:.1px;
}


.pd-wrapper .pd-stats-block{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px;
}

.pd-wrapper .pd-stat-row{
  position:relative;
  overflow:hidden;
  padding:24px;
  border-radius:20px;
  background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.015));
  border:1px solid rgba(255,255,255,.06);
  border-top:1px solid rgba(245,166,35,.1);
  min-height:120px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.pd-wrapper .pd-stat-row::before{
  content:"";
  position:absolute;
  width:130px;
  height:130px;
  border-radius:50%;
  background:var(--accent-glow);
  top:-65px;
  right:-65px;
  pointer-events:none;
}

.pd-wrapper .pd-stat-label{
  position:relative;
  z-index:2;
  color:#96a8c0;
  font-size:.82rem;
  font-weight:600;
  text-transform:uppercase;
  letter-spacing:.7px;
}

.pd-wrapper .pd-stat-value{
  position:relative;
  z-index:2;
  font-family:'Clash Display',sans-serif;
  font-size:2.6rem;
  font-weight:800;
  line-height:1;
  background:linear-gradient(135deg,var(--accent),#ffd46b);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}


.pd-wrapper .pd-gallery-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:20px;
}

.pd-wrapper .pd-gallery-item{
  overflow:hidden;
  border-radius:20px;
  border:1px solid var(--border);
  background:#070d1a;
}

.pd-wrapper .pd-gallery-item img{
  width:100%;
  height:250px;
  object-fit:cover;
  display:block;
}

.pd-wrapper .pd-gallery-caption{
  padding:16px 18px;
  color:#a0b0c8;
  font-size:.88rem;
  border-top:1px solid rgba(255,255,255,.04);
}


.pd-wrapper .pd-timeline-container{
  position:relative;
  display:flex;
  flex-direction:column;
  gap:18px;
}

.pd-wrapper .pd-timeline-container::before{
  content:"";
  position:absolute;
  left:13px;
  top:8px;
  bottom:8px;
  width:2px;
  background:linear-gradient(180deg,var(--accent),rgba(245,166,35,.1));
}

.pd-wrapper .pd-timeline-item{
  position:relative;
  margin-left:42px;
  background:rgba(255,255,255,.025);
  border:1px solid rgba(255,255,255,.05);
  border-radius:20px;
  padding:22px;
}

.pd-wrapper .pd-timeline-item::before{
  content:"";
  position:absolute;
  width:13px;
  height:13px;
  border-radius:50%;
  background:var(--accent);
  box-shadow:0 0 0 3px rgba(245,166,35,.18),0 0 12px hsla(38,92%,50%,.3);
  left:-33px;
  top:24px;
}

.pd-wrapper .pd-timeline-date{
  color:var(--accent);
  font-weight:700;
  font-size:.82rem;
  text-transform:uppercase;
  letter-spacing:.7px;
  margin-bottom:6px;
}

.pd-wrapper .pd-timeline-title{
  font-size:1rem;
  font-weight:700;
  margin-bottom:8px;
  color:var(--text);
}

.pd-wrapper .pd-timeline-detail{
  color:#a0b0c8;
  line-height:1.75;
  font-size:.92rem;
}


.pd-wrapper .pd-related-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:20px;
}

.pd-wrapper .pd-related-card{
  overflow:hidden;
  border-radius:22px;
  background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.015));
  border:1px solid var(--border);
}

.pd-wrapper .pd-related-card img{
  height:200px;
  width:100%;
  object-fit:cover;
  display:block;
}

.pd-wrapper .pd-related-title{
  padding:20px;
  font-size:.98rem;
  font-weight:700;
  color:var(--text);
}


.pd-wrapper .pd-nav-controls{
  display:flex;
  gap:12px;
  margin-top:36px;
}

.pd-wrapper .pd-nav-controls > *{flex:1}

.pd-wrapper .pd-nav-btn{
  width:100%;
  min-width:0;
  height:54px;
  border-radius:16px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  color:var(--text);
  font-size:.88rem;
  font-weight:600;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
}

.pd-wrapper .pd-home-btn{
  background:linear-gradient(135deg,var(--accent),var(--accent-2));
  color:#111;
  border:none;
  font-weight:700;
  box-shadow:0 6px 22px hsla(38,92%,50%,.28);
}


.pd-wrapper .pd-error-state{
  text-align:center;
  padding:100px 24px;
  border-radius:28px;
  background:linear-gradient(180deg,var(--card),var(--card-2));
  border:1px solid var(--border);
}

.pd-wrapper .pd-error-state h2{
  font-size:2rem;
  margin-bottom:12px;
}

.pd-wrapper .pd-error-state p{color:#a0b0c8}


@keyframes fadeUp{
  from{opacity:0;transform:translateY(24px)}
  to{opacity:1;transform:translateY(0)}
}

.pd-wrapper .pd-project-hero{
    animation-delay:.04s
}
.pd-wrapper .pd-detail-section:nth-child(2){animation-delay:.09s}
.pd-wrapper .pd-detail-section:nth-child(3){animation-delay:.14s}
.pd-wrapper .pd-detail-section:nth-child(4){animation-delay:.19s}
.pd-wrapper .pd-detail-section:nth-child(5){animation-delay:.24s}
.pd-wrapper .pd-two-col{animation:fadeUp .65s cubic-bezier(.22,.68,0,1.2) .19s both}


@media (max-width:992px){

  .pd-wrapper .pd-two-col{
    grid-template-columns:1fr;
  }

  .pd-wrapper .pd-hero-thumbnail{
    height:340px;
  }

}


@media (max-width:768px){

  .pd-wrapper #project-detail-content{
    width:min(96%,100%);
    padding:85px 0 60px;
  }

  .pd-wrapper .pd-project-hero{
    padding:22px;
    border-radius:24px;
    margin-bottom:18px;
  }

  .pd-wrapper .pd-detail-section{
    padding:22px;
    border-radius:22px;
    margin-bottom:16px;
  }

  .pd-wrapper .pd-hero-thumbnail{
    height:220px;
    border-radius:18px;
    margin-bottom:24px;
  }

  .pd-wrapper .pd-project-hero h1{
    font-size:2.2rem;
    letter-spacing:-1.5px;
    margin-bottom:14px;
    line-height:1.08;
  }

  .pd-wrapper .pd-hero-desc{
    font-size:.9rem;
    line-height:1.75;
  }

  .pd-wrapper .pd-hero-meta{
    gap:8px;
    margin-bottom:16px;
  }

  .pd-wrapper .pd-tech-badge,
  .pd-wrapper .pd-status-badge,
  .pd-wrapper .pd-featured-badge,
  .pd-wrapper .pd-tag-badge{
    padding:8px 12px;
    font-size:.72rem;
    border-radius:12px;
  }

  .pd-wrapper .pd-hero-actions{
    gap:10px;
    margin-top:24px;
  }

  .pd-wrapper .pd-hero-actions .btn{
    height:50px;
    font-size:.82rem;
    padding:0 14px;
    border-radius:14px;
  }

  .pd-wrapper .pd-detail-section h3,
  .pd-wrapper .pd-detail-section h4{
    font-size:1.2rem;
    gap:10px;
    margin-bottom:18px;
    line-height:1.3;
  }

  .pd-wrapper .pd-detail-section h3 i,
  .pd-wrapper .pd-detail-section h4 i{
    width:34px;
    height:34px;
    border-radius:11px;
    font-size:.78rem;
  }

  .pd-wrapper .pd-detail-section p,
  .pd-wrapper .pd-overview-text{
    font-size:.88rem;
    line-height:1.8;
  }

  .pd-wrapper .pd-check-item{
    padding:13px 16px;
    border-radius:13px;
  }

  .pd-wrapper .pd-check-item span{
    font-size:.9rem;
    line-height:1.5;
  }

  .pd-wrapper .pd-stats-block{
    grid-template-columns:repeat(2,1fr);
    gap:12px;
  }

  .pd-wrapper .pd-stat-row{
    min-height:100px;
    padding:18px;
    border-radius:18px;
  }

  .pd-wrapper .pd-stat-value{
    font-size:2.1rem;
    line-height:1;
  }

  .pd-wrapper .pd-stat-label{
    font-size:.76rem;
    line-height:1.4;
  }

  .pd-wrapper .pd-gallery-grid,
  .pd-wrapper .pd-related-grid{
    grid-template-columns:1fr;
    gap:14px;
  }

  .pd-wrapper .pd-gallery-item img{
    height:200px;
    border-radius:18px;
  }

  .pd-wrapper .pd-related-card img{
    height:180px;
    border-radius:18px;
  }

  .pd-wrapper .pd-timeline-container::before{
    left:10px;
  }

  .pd-wrapper .pd-timeline-item{
    margin-left:30px;
    padding:16px;
    border-radius:18px;
  }

  .pd-wrapper .pd-timeline-item::before{
    width:11px;
    height:11px;
    left:-24px;
    top:20px;
  }

  .pd-wrapper .pd-nav-controls{
    gap:10px;
    margin-top:28px;
  }

  .pd-wrapper .pd-nav-btn{
    height:48px;
    border-radius:14px;
    font-size:.83rem;
  }

  .pd-wrapper .pd-two-col{
    gap:16px;
    margin-bottom:16px;
  }

}


@media (max-width:520px){

  .pd-wrapper .pd-project-hero h1{
    font-size:1.85rem;
    letter-spacing:-1px;
    line-height:1.1;
  }

  .pd-wrapper .pd-hero-actions{
    flex-direction:row;
    flex-wrap:nowrap;
    gap:8px;
    width:100%;
  }

  .pd-wrapper .pd-hero-actions .btn{
    font-size:clamp(0.72rem, 3vw, 0.82rem);
    padding:0 clamp(8px, 2.5vw, 14px);
    height:46px;
    white-space:nowrap;
    flex:1;
    min-width:0;
  }

  .pd-wrapper .pd-nav-controls{
    flex-direction:row;
    gap:10px;
  }

  .pd-wrapper .pd-hero-thumbnail{
    height:190px;
  }

  .pd-wrapper .pd-stats-block{
    grid-template-columns:repeat(2,1fr);
  }

  .pd-wrapper .pd-stat-value{
    font-size:1.8rem;
  }

}
`;

if (!document.getElementById("update-style")) {
  const style = document.createElement("style");
  style.id = "update-style";
  style.textContent = css;
  document.head.appendChild(style);
}
