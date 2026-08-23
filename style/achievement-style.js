if (!document.getElementById("achievement-style")) {
  const style = document.createElement("style");
  style.id = "achievement-style";
  style.textContent = `
    #achievement-section { padding: 60px 0; }
    .ach-header { text-align: left; margin-bottom: 40px; padding-left: 10px; }

    .ach-slider-wrapper {
      display: flex;
      align-items: center;
    }
    .ach-slider {
      display: flex;
      gap: 20px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 10px 4px 20px;
      flex: 1;
    }
    .ach-slider::-webkit-scrollbar { display: none; }
    .ach-slider .ach-card {
      min-width: calc(50% - 10px);
      scroll-snap-align: start;
      flex-shrink: 0;
    }
    .ach-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
    }
    .ach-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--border-color, rgba(255,255,255,0.1));
      cursor: pointer;
      transition: all 0.3s;
    }
    .ach-dot.active {
      background: var(--accent-color, #FFB703);
      width: 24px;
      border-radius: 4px;
    }

    .ach-card {
      background: var(--card-bg, #111);
      border: 1px solid var(--border-color, rgba(255,255,255,0.08));
      border-radius: 14px;
      overflow: hidden;
      position: relative;
    }
    .ach-card-featured {
      border-color: rgba(255,183,3,0.3);
    }

    .ach-card-ribbon {
      position: absolute;
      top: 14px;
      left: -8px;
      z-index: 2;
      background: linear-gradient(135deg, #FFB703, #FF6B35);
      color: #050816;
      padding: 4px 14px 4px 12px;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border-radius: 0 6px 6px 0;
      box-shadow: 0 2px 8px rgba(255,107,53,0.3);
    }
    .ach-card-ribbon::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      border: 3px solid transparent;
      border-top-color: #c45a00;
      border-right-color: #c45a00;
    }

    .ach-card-image {
      overflow: hidden;
      height: 180px;
      position: relative;
    }
    .ach-card-image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, transparent 50%, rgba(5,8,22,0.4));
      pointer-events: none;
    }
    .ach-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ach-card-body { padding: 18px 18px 16px; }
    .ach-card-issuer-badge {
      display: inline-block;
      background: rgba(255,183,3,0.1);
      color: var(--accent-color, #FFB703);
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 600;
      margin-bottom: 10px;
      border: 1px solid rgba(255,183,3,0.15);
    }
    .ach-card-title {
      color: var(--text-primary, #fff);
      font-size: 1rem;
      margin-bottom: 0;
      font-weight: 700;
      line-height: 1.3;
    }
    .ach-card-divider {
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #FFB703, transparent);
      border-radius: 2px;
      margin: 12px 0;
    }
    .ach-card-desc {
      color: var(--text-muted, #aaa);
      font-size: 0.8rem;
      line-height: 1.6;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .ach-card-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 14px;
    }
    .ach-topic {
      padding: 4px 8px;
      border: 1px solid rgba(255,166,0,0.18);
      border-radius: 999px;
      background: rgba(255,166,0,0.06);
      color: #d8d8d8;
      font-size: 11px;
      font-weight: 500;
    }

    .ach-card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--border-color, rgba(255,255,255,0.08));
      margin-bottom: 12px;
    }
    .ach-meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ach-meta-icon {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: rgba(255,145,0,0.1);
      color: #ff9d00;
      font-size: 12px;
    }
    .ach-meta-item > div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ach-meta-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #777;
    }
    .ach-meta-item strong {
      font-size: 12px;
      color: #eee;
    }

    .ach-verify-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border: 1px solid rgba(255,166,0,0.35);
      border-radius: 8px;
      background: linear-gradient(135deg, #ffb703, #ff7a00);
      color: #111;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      width: fit-content;
    }
    .ach-verify-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(255,145,0,0.22);
    }
    .ach-verify-btn span { font-size: 14px; }

    @media (max-width: 768px) {
      .ach-slider .ach-card { min-width: 100%; }
    }
    @media (max-width: 480px) {
      .ach-slider .ach-card { min-width: 100%; }
      .ach-slider-btn { display: none; }
    }
  `;
  document.head.appendChild(style);
}
