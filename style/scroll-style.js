const css = `
.scroll-to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border-color 0.3s;
}

.scroll-to-top-btn.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.scroll-to-top-btn:hover {
  background: rgba(15, 23, 42, 0.85);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.scroll-to-top-btn svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-to-top-btn:hover svg {
  transform: translateY(-3px);
}

body:not(.dark-theme) .scroll-to-top-btn {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
  color: #0f172a;
}

body:not(.dark-theme) .scroll-to-top-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .scroll-to-top-btn {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
  }
}
`;

if (!document.getElementById("scroll-style")) {
  const style = document.createElement("style");
  style.id = "scroll-style";
  style.textContent = css;
  document.head.appendChild(style);
}
