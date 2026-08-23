import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://cvmmpnpvstrwgfmhfplw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bW1wbnB2c3Ryd2dmbWhmcGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NzI3MDQsImV4cCI6MjA5NzM0ODcwNH0.v0almOw_atds8v44EXDiwnAMPE9EhHg8WE4YltTDbzM";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('alif_projects-container');
    const searchInput = document.getElementById('search-input');

    try {
        const { data: pubProjects } = await supabase
            .from('alif_projects')
            .select('slug')
            .eq('is_published', true);
        const publishedSlugs = new Set((pubProjects || []).map(p => p.slug));

        const { data: items, error } = await supabase
            .from('alif_project_details')
            .select('id, data');

        if (error) throw error;

        const alif_projects = (items || [])
            .filter(row => publishedSlugs.has(row.id))
            .map(row => ({
                id: row.id,
                ...row.data
            }));

        const render = (query = '') => {
            container.innerHTML = '';
            const filtered = alif_projects.filter(p =>
                p.title.toLowerCase().includes(query) ||
                (p.tags || []).some(t => t.toLowerCase().includes(query))
            );

            if (filtered.length === 0) {
                container.innerHTML = `<div class="loading-spinner">No alif_projects found for "${query}"</div>`;
                return;
            }

            filtered.forEach(project => {
                const card = document.createElement('div');
                card.className = 'subject-card';
                card.innerHTML = `
                    <div class="subject-header">
                        <div class="subject-title">
                            <i class="fas fa-folder-open"></i>
                            <span>${project.title}</span>
                        </div>
                    </div>
                    <div style="aspect-ratio: 16/9; overflow: hidden; border-radius: 12px; margin-bottom: 15px; border: 1px solid var(--glass-border);">
                        <img src="${project.thumbnail}" onerror="this.src='https://via.placeholder.com/600x400?text=Project+Thumbnail'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:15px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${project.description}</p>
                    <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px;">
                        ${(project.tags || []).slice(0, 3).map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    <a href="project.html?id=${project.id}" class="btn btn-success" style="text-decoration:none; display:block; text-align:center; background: linear-gradient(90deg, var(--accent-color), var(--success-color)); color: var(--primary-bg);">
                        View Details
                    </a>
                `;
                container.appendChild(card);
            });
        };

        render();
        searchInput.addEventListener('input', (e) => render(e.target.value.toLowerCase()));

    } catch (err) {
        console.error("System Error:", err);
        container.innerHTML = `<div class="loading-spinner" style="color:var(--danger-color)">Error loading project library.</div>`;
    }
});
