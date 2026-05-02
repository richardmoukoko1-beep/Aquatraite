// ═══════════════════════════════════════════════════════
//  GUARD DE SESSION — À coller au tout début du bloc <script>
//  de aquatraite-v5.html (juste après <script>)
// ═══════════════════════════════════════════════════════

// 1. Lire la session stockée par auth.html
const AQ_USER = (() => {
  try {
    const raw = sessionStorage.getItem('aq_user');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) { return null; }
})();

// 2. Si pas de session → rediriger vers auth.html
if (!AQ_USER) {
  window.location.replace('auth.html');
  // Le code en dessous ne s'exécute pas
}

// 3. Si connecté → afficher les infos utilisateur dans l'interface
//    (ajouter après que le DOM soit chargé)
window.addEventListener('DOMContentLoaded', () => {
  if (!AQ_USER) return;

  // Nom dans la topbar (bouton 👤)
  const userBtn = document.querySelector('[onclick="openUserModal()"]');
  if (userBtn) {
    const roleConfig = (typeof ROLES !== 'undefined' && ROLES[AQ_USER.role]) || {};
    userBtn.title = `${AQ_USER.name} · ${roleConfig.label || AQ_USER.role}`;
    userBtn.textContent = '👤';
  }

  // Appliquer les restrictions de pages selon le rôle
  applyRoleRestrictions();

  console.log(`✅ AquaTraite — Connecté : ${AQ_USER.name} [${AQ_USER.role}]`);
});

// 4. Restrictions de navigation par rôle
function applyRoleRestrictions() {
  if (!AQ_USER || typeof ROLE_PERMISSIONS === 'undefined') return;
  const allowed = ROLE_PERMISSIONS[AQ_USER.role] || ['dashboard'];

  // Masquer les items de nav non autorisés
  document.querySelectorAll('.nav-item').forEach(item => {
    const onclick = item.getAttribute('onclick') || '';
    const match = onclick.match(/goPage\('([^']+)'\)/);
    if (match && !allowed.includes(match[1])) {
      item.style.display = 'none';
    }
  });

  // Sécuriser goPage() — empêcher accès direct via URL ou console
  const _originalGoPage = window.goPage;
  window.goPage = function(id) {
    if (!allowed.includes(id)) {
      console.warn(`Accès refusé à la page "${id}" pour le rôle "${AQ_USER.role}"`);
      return;
    }
    _originalGoPage(id);
  };
}

// 5. Déconnexion — à appeler depuis un bouton "Déconnexion"
async function logoutUser() {
  sessionStorage.removeItem('aq_user');
  if (typeof supabase !== 'undefined' && typeof SUPABASE_URL !== 'undefined') {
    try {
      const { createClient } = supabase;
      const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
      await sb.auth.signOut();
    } catch(e) {}
  }
  window.location.replace('auth.html');
}

// ═══════════════════════════════════════════════════════
//  FIN DU GUARD — Le reste de ton code aquatraite-v5.html
//  continue normalement en dessous
// ═══════════════════════════════════════════════════════
