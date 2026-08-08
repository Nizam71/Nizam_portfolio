// Configuration
const supabaseUrl = 'https://evaxbwuhlnpwnmphzysq.supabase.co';
const supabaseKey = 'sb_publishable_JkWNRcw60a5euPsLlGCPFg_6x8KVbq4';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- Data Fetching and Rendering ---

async function fetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('project_number', { ascending: true });

  let projects = data;
  if (error || !data || data.length === 0) {
    // Default fallback
    projects = [
      {
        project_number: '01',
        title: 'TYPE MASTER',
        category: 'TYPING SPEED TEST APP',
        image: '/typemaster.png',
        link: 'https://nizam71.github.io/type-master/'
      },
      {
        project_number: '02',
        title: 'TERA 2K26 EEE',
        category: 'COLLEGE EVENT WEBSITE',
        image: '/tera2k26.png',
        link: 'https://nizam71.github.io/TERA_2K26_EEE/'
      },
      {
        project_number: '03',
        title: 'PORTFOLIO V1',
        category: 'PERSONAL WEBSITE',
        image: '/protflio.png',
        link: '#'
      }
    ];
  }

  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map((project, index) => {
    let imgPath = project.image || '';
    if (imgPath.includes('/Images/')) {
      imgPath = imgPath.replace('/Images/', '/');
    }
    // If it's a relative path from old react like ../assets or a bare filename
    if (imgPath.startsWith('../assets/images/')) {
      imgPath = imgPath.replace('../assets/images/', '/');
    } else if (imgPath.startsWith('/images/')) {
      imgPath = imgPath.replace('/images/', '/');
    } else if (imgPath.startsWith('/assets/images/')) {
      imgPath = imgPath.replace('/assets/images/', '/');
    } else if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
      // It might just be the filename
      imgPath = '/' + imgPath;
    }

    return `
      <a
        href="${project.link}"
        target="_blank"
        rel="noopener noreferrer"
        class="group block fade-in-up"
        style="transition-delay: ${index * 0.1}s;"
      >
        <div class="relative aspect-[16/10] mb-6 overflow-hidden bg-[#111] border-t-2 border-transparent group-hover:border-[#d91b23] transition-all duration-300">
          <img 
            src="${imgPath}" 
            alt="${project.title}" 
            class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            onerror="this.src='/protflio.png'"
          />
          <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>
        <div class="flex justify-between items-start pt-2">
          <div class="flex gap-4">
            <span class="text-[#d91b23] font-['Bebas_Neue'] text-[42px] leading-none mt-0">${project.project_number}</span>
            <div class="pt-1">
              <h3 class="text-white font-bold tracking-wider text-[15px] uppercase mb-1">${project.title}</h3>
              <p class="text-neutral-500 text-[10px] tracking-widest uppercase">${project.category}</p>
            </div>
          </div>
          <span class="text-neutral-600 group-hover:text-white transition-colors text-xl font-light mt-1">→</span>
        </div>
      </a>
    `;
  }).join('');
}

async function fetchExperience() {
  // Fetch Skills
  const { data: skillsData, error: skillsError } = await supabase
    .from('skills')
    .select('name')
    .order('id', { ascending: true });

  let skills = skillsData?.map(s => s.name);
  if (skillsError || !skills || skills.length === 0) {
    skills = ['WEB DESIGN', 'UI/UX DESIGN', 'REACT', 'HTML/CSS', 'JAVASCRIPT', 'TAILWIND CSS', 'NODE.JS', 'TYPESCRIPT', 'FULL STACK', 'GITHUB'];
  }

  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer) {
    skillsContainer.innerHTML = skills.map((skill, i) => `
      <span 
        class="px-4 py-[6px] text-[10px] font-medium text-neutral-400 border border-neutral-800 rounded-sm hover:border-[#d91b23] hover:text-white transition-colors cursor-default tracking-widest bg-transparent zoom-in"
        style="transition-delay: ${i * 0.05}s;"
      >
        ${skill}
      </span>
    `).join('');
  }

  // Fetch Processes
  const { data: processData, error: processError } = await supabase
    .from('processes')
    .select('*')
    .order('step_number', { ascending: true });

  let processes = processData?.map(p => ({ icon_name: p.icon_name, title: p.title, desc: p.description }));
  if (processError || !processes || processes.length === 0) {
    processes = [
      { icon_name: 'search', title: 'DISCOVER', desc: 'Understanding goals, audience, and project requirements.' },
      { icon_name: 'lightbulb', title: 'IDEATE', desc: 'Planning, wireframing, and creating the right concept.' },
      { icon_name: 'pen-tool', title: 'DESIGN', desc: 'Crafting visual design with a focus on user experience.' },
      { icon_name: 'code', title: 'DEVELOP', desc: 'Building fast, responsive, and high-performing websites.' },
      { icon_name: 'rocket', title: 'DELIVER', desc: 'Testing, optimizing, and launching with perfection.' }
    ];
  }

  const processContainer = document.getElementById('processes-container');
  if (processContainer) {
    processContainer.innerHTML = processes.map((proc, idx) => `
      <div class="relative pl-12 group fade-in-right" style="transition-delay: ${idx * 0.1}s;">
        <div class="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#050505] border border-neutral-800 group-hover:border-[#d91b23] flex items-center justify-center transition-colors duration-300">
          <i data-lucide="${proc.icon_name.toLowerCase()}" class="w-3 h-3 text-neutral-500 group-hover:text-[#d91b23] transition-colors duration-300"></i>
        </div>
        <div class="absolute -left-12 top-0 text-[#d91b23] font-['Bebas_Neue'] text-[28px] leading-none transition-colors duration-300">0${idx + 1}</div>
        <h4 class="text-[#d91b23] font-bold text-[11px] tracking-widest uppercase mb-2 transition-colors duration-300 pt-1">${proc.title}</h4>
        <p class="text-neutral-400 text-xs leading-relaxed max-w-[220px]">${proc.desc}</p>
      </div>
    `).join('');

    // Re-initialize lucide icons for newly added elements
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// --- Interactivity and Modals ---

let isAdminLoggedIn = false;

function setupModals() {
  const btnOpenCollabFixed = document.getElementById('btn-open-collab-fixed');
  const btnOpenAdmin = document.getElementById('btn-open-admin');
  const adminBtnText = document.getElementById('admin-btn-text');

  const adminModal = document.getElementById('admin-modal');
  const collabModal = document.getElementById('collab-modal');

  // Open Admin
  btnOpenAdmin.addEventListener('click', () => {
    adminModal.classList.remove('hidden');
    if (isAdminLoggedIn) {
      document.getElementById('admin-login-view').classList.add('hidden');
      document.getElementById('admin-dashboard-view').classList.remove('hidden');
      fetchMessages();
    } else {
      document.getElementById('admin-login-view').classList.remove('hidden');
      document.getElementById('admin-dashboard-view').classList.add('hidden');
    }
  });

  // Open Collab
  btnOpenCollabFixed.addEventListener('click', () => {
    collabModal.classList.remove('hidden');
  });

  // Close Modals
  document.querySelectorAll('.btn-close, .modal-backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      adminModal.classList.add('hidden');
      collabModal.classList.add('hidden');
    });
  });

  // Admin Login Form
  const adminForm = document.getElementById('admin-form');
  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    if (email === 'shaikmahammadnizam@gmail.com' && password === 'nizam123@123') {
      isAdminLoggedIn = true;
      document.getElementById('admin-error').classList.add('hidden');

      document.getElementById('admin-login-view').classList.add('hidden');
      document.getElementById('admin-dashboard-view').classList.remove('hidden');

      btnOpenAdmin.classList.add('bg-[#d91b23]', 'text-white');
      btnOpenAdmin.classList.remove('text-neutral-500', 'border', 'border-white/10', 'hover:border-white/30');
      adminBtnText.textContent = 'Admin Dashboard';

      fetchMessages();
    } else {
      document.getElementById('admin-error').classList.remove('hidden');
    }
  });

  // Admin Logout
  document.getElementById('btn-logout').addEventListener('click', () => {
    isAdminLoggedIn = false;
    document.getElementById('admin-email').value = '';
    document.getElementById('admin-password').value = '';

    document.getElementById('admin-login-view').classList.remove('hidden');
    document.getElementById('admin-dashboard-view').classList.add('hidden');

    btnOpenAdmin.classList.remove('bg-[#d91b23]', 'text-white');
    btnOpenAdmin.classList.add('text-neutral-500', 'border', 'border-white/10', 'hover:border-white/30');
    adminBtnText.textContent = 'Admin';
  });
}

async function handleCollabSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.submit-btn');
  const originalText = btn.innerHTML;

  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...`;
  btn.disabled = true;
  if (window.lucide) window.lucide.createIcons();

  const newMsg = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const { error } = await supabase
    .from('collaborations')
    .insert([newMsg]);

  btn.disabled = false;
  btn.innerHTML = originalText;

  if (error) {
    alert('Error saving message: ' + error.message + '\n\nPlease ensure you have created the "collaborations" table in Supabase.');
  } else {
    alert('Thank you for your message! I will get back to you soon.');
    document.getElementById('collab-modal').classList.add('hidden');
    form.reset();
    if (isAdminLoggedIn) {
      fetchMessages();
    }
  }
}

async function fetchMessages() {
  const container = document.getElementById('admin-messages');
  container.innerHTML = `<div class="flex items-center gap-2 text-neutral-400 p-4"><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Loading messages...</div>`;
  if (window.lucide) window.lucide.createIcons();

  const { data, error } = await supabase
    .from('collaborations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    container.innerHTML = `<p class="text-[#d91b23] text-sm">Failed to load messages.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = `<p class="text-neutral-500 text-sm italic">No collaboration requests yet.</p>`;
    return;
  }

  container.innerHTML = data.map(msg => `
    <div class="bg-[#111] p-4 rounded-xl border border-white/5">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h4 class="text-white font-bold">${msg.name}</h4>
          <a href="mailto:${msg.email}" class="text-[#d91b23] text-xs hover:underline">${msg.email}</a>
        </div>
        <span class="text-neutral-600 text-[10px]">${msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}</span>
      </div>
      <p class="text-neutral-300 text-sm mt-3 bg-[#0a0a0a] p-3 rounded-lg">${msg.message}</p>
    </div>
  `).join('');
}

// --- Scroll Animations (Intersection Observer) ---

function setupScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-right, .zoom-in');
  elements.forEach(el => observer.observe(el));

  // Re-run for dynamically injected elements later
  return observer;
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', async () => {
  setupModals();

  const collabForms = document.querySelectorAll('form');
  collabForms.forEach(f => {
    if (f.id !== 'admin-form') {
      f.addEventListener('submit', handleCollabSubmit);
    }
  });

  const observer = setupScrollAnimations();

  await Promise.all([
    fetchProjects(),
    fetchExperience()
  ]);

  // Observe dynamically added elements
  document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-right, .zoom-in').forEach(el => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
});
