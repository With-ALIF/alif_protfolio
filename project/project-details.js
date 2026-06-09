import { renderProjectTags } from '../tags/tags.js';
import externalLinkIcon from "../icons/external-link-icon.js";
import githubIcon from "../icons/github-icon.js";


document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const container = document.getElementById('project-detail-content');
    const PATH = '../info/';

    if (!projectId) return window.location.href = '../index.html';

    const safeFetch = async (url) => {
        try { const r = await fetch(url); return r.ok ? await r.json() : null; }
        catch (e) { return null; }
    };

    try {
        const [project, list] = await Promise.all([
            safeFetch(`${PATH}${projectId}.json`),
            safeFetch(`${PATH}list.json`)
        ]);

        if (!project) throw new Error("Not Found");


        const idx = list.indexOf(projectId);
        const prev = idx > 0 ? list[idx - 1] : null;
        const next = idx < list.length - 1 ? list[idx + 1] : null;


        const relatedData = project.relatedProjects
            ? await Promise.all(project.relatedProjects.map(id => safeFetch(`${PATH}${id}.json`)))
            : [];
        const validRelated = relatedData.filter(p => p !== null);

        document.title = `${project.title} | Portfolio`;


        const statusColor = {
            'Completed': 'var(--success-color)',
            'In Progress': '#f59e0b',
            'Planned': 'var(--text-muted)'
        };

        const badge = (text, color = '') =>
            `<span class="pd-tech-badge" ${color ? `style="border-color:${color};color:${color}"` : ''}>${text}</span>`;


        const renderStats = (stats) => {
            if (!stats) return '';
            const entries = Array.isArray(stats)
                ? stats.map(s => [s.label, s.value])
                : Object.entries(stats);
            return entries.map(([k, v]) => `
                <div class="pd-stat-row">
                    <span class="pd-stat-label">${k}</span>
                    <span class="pd-stat-value">${v}</span>
                </div>
            `).join('');
        };


        const renderList = (data, iconClass, iconColor) => {
            if (!data) return '';
            const items = Array.isArray(data) ? data : [data];
            return items.map(item => `
                <li class="pd-check-item">
                    <i class="${iconClass}" style="color:${iconColor}"></i>
                    <span>${item}</span>
                </li>
            `).join('');
        };


        const renderTimeline = (timeline) => {
            if (!timeline) return '';
            return timeline.map(item => `
                <div class="pd-timeline-item">
                    <div class="pd-timeline-date">${item.date}</div>
                    <div class="pd-timeline-title">${item.title || item.event || ''}</div>
                    ${item.detail ? `<div class="pd-timeline-detail">${item.detail}</div>` : ''}
                </div>
            `).join('');
        };


        const renderResults = (results) => {
            if (!results || !results.length) return '';
            return `
            <div class="pd-detail-section">
                <h3><i class="fas fa-trophy"></i> Results & Impact</h3>
                <ul class="pd-check-list" style="margin-top:15px;">
                    ${renderList(results, 'fas fa-arrow-trend-up', 'var(--accent-color)')}
                </ul>
            </div>`;
        };


        container.innerHTML = `

        
            <section class="pd-project-hero">
    
    ${project.thumbnail ? `
    <div class="pd-hero-thumbnail">
        <img 
            src="${project.thumbnail}" 
            alt="${project.title}"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/1200x700?text=Project+Preview'"
        >
    </div>
    ` : ''}

    <div class="pd-hero-meta">
        ${project.category ? badge(project.category) : ''}
        ${project.status ? `<span class="pd-status-badge" style="color:${statusColor[project.status] || 'var(--text-muted)'}"><i class="fas fa-circle" style="font-size:0.5rem;vertical-align:middle;margin-right:5px;"></i>${project.status}</span>` : ''}
        ${project.featured ? `<span class="pd-featured-badge"><i class="fas fa-star"></i> Featured</span>` : ''}
    </div>

    <h1>${project.title}</h1>

    <p class="pd-hero-desc">${project.description}</p>

    <div class="pd-hero-actions">
         <a href="${project.demo}" target="_blank" class="btn btn-success">
            ${externalLinkIcon}
            <span>Live Demo</span>
        </a>

        <a href="${project.github}" target="_blank" class="btn btn-danger">
            ${githubIcon}
            <span>Github Code</span>
        </a>
    </div>

</section>

            <div class="pd-detail-section">
                <h3><i class="fas fa-align-left"></i> Project Overview</h3>
                <p class="pd-overview-text">${project.fullDescription}</p>
                
            </div>
            
            <div class="pd-detail-section">
                <h4><i class="fas fa-layer-group"></i>  Stack &amp; Tools</h4>
                <div id="stack-tags" class="project-tags">
                  ${(project.technologies || []).map(tech => `<span class="tech-tag"><img src="${tech.icon}" alt="${tech.name}" title="${tech.name}" class="tech-icon" loading="lazy"><span class="tech-name">${tech.name}</span></span>`).join('')}
                </div>
            </div>
            
            <div class="pd-detail-section">
                <h3><i class="fas fa-tags"></i> Tags</h3>
                <div class="pd-badge-row" style="margin-top:15px;">
                    ${(project.tags || []).map(t => `<span class="pd-tag-badge">${t}</span>`).join('')}
                </div>
            </div>

            <div class="pd-two-col">
                <div class="pd-detail-section">
                    <h3><i class="fas fa-star"></i> Core Features</h3>
                    <ul class="pd-check-list">
                        ${renderList(project.features, 'fas fa-check', 'var(--success-color)')}
                    </ul>
                </div>
                <div class="pd-detail-section">
                    <h3><i class="fas fa-chart-pie"></i> Metrics</h3>
                    <div class="pd-stats-block">
                        ${renderStats(project.statistics)}
                    </div>
                </div>
            </div>

            ${project.gallery && project.gallery.length ? `
            <div class="pd-detail-section">
                <h3><i class="fas fa-images"></i> Visual Gallery</h3>
                <div class="pd-gallery-grid">
                    ${project.gallery.map(g => {
            const src = typeof g === 'string' ? g : g.image;
            const cap = typeof g === 'object' && g.title ? g.title : '';
            return `
                        <div class="pd-gallery-item">
                            <img src="${src}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x450?text=Preview'">
                            ${cap ? `<div class="pd-gallery-caption">${cap}</div>` : ''}
                        </div>`;
        }).join('')}
                </div>
            </div>` : ''}

            <div class="pd-two-col">
                <div class="pd-detail-section">
                    <h3><i class="fas fa-bolt"></i> Challenges</h3>
                    <ul class="pd-check-list" style="margin-top:15px;">
                        ${renderList(project.challenges, 'fas fa-circle-exclamation', 'var(--danger-color)')}
                    </ul>
                </div>
                <div class="pd-detail-section">
                    <h3><i class="fas fa-lightbulb"></i> Solutions</h3>
                    <ul class="pd-check-list" style="margin-top:15px;">
                        ${renderList(project.solutions, 'fas fa-check-circle', 'var(--success-color)')}
                    </ul>
                </div>
            </div>

            ${renderResults(project.results)}

            <div class="pd-detail-section">
                <h3><i class="fas fa-stream"></i> Development Roadmap</h3>
                <div class="pd-timeline-container">
                    ${renderTimeline(project.timeline)}
                </div>
            </div>

            ${validRelated.length > 0 ? `
            <div class="pd-detail-section">
                <h3><i class="fas fa-layer-group"></i> Related Projects</h3>
                <div class="pd-related-grid">
                    ${validRelated.map(p => `
                        <a href="project.html?id=${p.id}" class="pd-related-card">
                            <img src="${p.thumbnail}" onerror="this.src='https://via.placeholder.com/400x225?text=Project'">
                            <div class="pd-related-title">${p.title}</div>
                        </a>
                    `).join('')}
                </div>
            </div>` : ''}

            <div class="pd-nav-controls">
                ${prev ? `<a href="project.html?id=${prev}" class="btn btn-sm pd-nav-btn"><i class="fas fa-arrow-left"></i> Previous</a>` : '<div></div>'}
                <a href="../index.html" class="btn btn-sm pd-nav-btn pd-home-btn"><i class="fas fa-home"></i> Home</a>
                ${next ? `<a href="project.html?id=${next}" class="btn btn-sm pd-nav-btn">Next <i class="fas fa-arrow-right"></i></a>` : '<div></div>'}
            </div>
        `;
        renderProjectTags(document.getElementById('stack-tags'), project.technologies);
    } catch (error) {
        container.innerHTML = `
                    <div class="pd-error-wrapper">
                            <div class="pd-error-card">
                                <div class="pd-error-icon">
                                    <i class="fas fa-search"></i>
                            </div>
                            
                        <span class="pd-error-badge">404 Error</span>
                            <div class="pd-divider"></div>
                                
                            <h2>Project Not Found</h2>
                                <p>The project you are trying to access may have been removed, renamed, or is temporarily unavailable.</p>

                        <div class="pd-error-actions">
                            <a href="../index.html" class="pd-btn-home">
                                <i class="fas fa-arrow-left"></i>
                                    Return Home
                            </a>

                        <button onclick="location.reload()" class="pd-btn-reload">
                            <i class="fas fa-rotate-right"></i>
                                Try Again
                        </button>
                        </div>

                        <p class="pd-hint">If the problem persists, please contact support.</p>
                    </div>
                    </div>
            `;

    }

});