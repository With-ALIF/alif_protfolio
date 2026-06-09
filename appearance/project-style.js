const css = `
#projects-section {
  padding: 2rem 0 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 0.5rem;
}

.project-card {
  background: radial-gradient(
      circle at top,
      rgba(255, 255, 255, 0.08),
      transparent 60%),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.04),
      rgba(0, 0, 0, 0.7)
    );
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.project-image {
  width: 100%;
  height: 280px;
  overflow: hidden;
  position: relative;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.project-body {
  padding: 2rem;
}

.project-title {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: hsl(38, 92%, 50%);
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: hsl(40, 10%, 70%);
  margin-bottom: 1.25rem;
}

 
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.project-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 183, 3, 0.1);
  border: 1px solid rgba(255, 183, 3, 0.35);
  color: hsl(39, 35%, 83%);
}


.project-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-project {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.3rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 183, 3, 0.6);
  color: hsl(38, 92%, 55%);
  background: rgba(255, 183, 3, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-project:hover {
  background: rgba(255, 183, 3, 0.18);
  transform: translateY(-2px);
}

.btn-project.primary {
  background: linear-gradient(135deg, #ffb703, #ff8c00);
  color: #111;
  font-weight: 600;
  border: none;
  box-shadow: 0 8px 20px rgba(255, 183, 3, 0.4);
}

.btn-project.primary:hover {
  box-shadow: 0 12px 30px rgba(255, 183, 3, 0.6);
}

@media (max-width: 767px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .project-image {
    height: 240px;
  }
  .project-body {
    padding: 1.5rem;
  }
  .project-title {
    font-size: 1.25rem;
  }
  .project-actions {
    flex-wrap: nowrap;
    gap: 0.35rem;
    width: 100%;
  }
  .btn-project {
    font-size: clamp(0.68rem, 2.5vw, 0.8rem);
    padding: 0.55rem clamp(0.35rem, 1.8vw, 0.75rem);
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    justify-content: center;
    gap: 0.25rem;
  }
  .btn-project svg {
    width: clamp(13px, 3.5vw, 15px) !important;
    height: clamp(13px, 3.5vw, 15px) !important;
    flex-shrink: 0;
  }
}
`;

if (!document.getElementById("project-style")) {
  const style = document.createElement("style");
  style.id = "project-style";
  style.textContent = css;
  document.head.appendChild(style);
}
