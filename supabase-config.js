// ═══════════════════════════════════════════════════════
//  AQUATRAITE — Configuration Supabase
//  Remplace les valeurs ci-dessous par celles de ton projet
//  Supabase : Settings → API
// ═══════════════════════════════════════════════════════

const SUPABASE_URL  = 'https://uyuxmkgkncbwrmklglqz.supabase.co';
const SUPABASE_ANON = 'sb_publishable_AbmmH49Dhhlii1FmziQ6IQ_K8bll5de';

// ── Rôles de l'application ──────────────────────────────
const ROLES = {
  admin:    { label: 'Administrateur', color: '#FF2D55', icon: '🔴' },
  analyste: { label: 'Analyste',       color: '#00C8F0', icon: '🔵' },
  terrain:  { label: 'Agent Terrain',  color: '#00E87A', icon: '🟢' },
  lecteur:  { label: 'Lecteur',        color: '#F5A623', icon: '🟡' },
};

// ── Pages accessibles par rôle ──────────────────────────
const ROLE_PERMISSIONS = {
  admin:    ['dashboard','capteurs','carte','pipeline','traitement','historique','assistant','terrain','alertes','rapports','utilisateurs','api','parametres'],
  analyste: ['dashboard','capteurs','carte','pipeline','traitement','historique','assistant','terrain','alertes','rapports'],
  terrain:  ['dashboard','carte','terrain','alertes'],
  lecteur:  ['dashboard','carte','alertes','rapports'],
};
