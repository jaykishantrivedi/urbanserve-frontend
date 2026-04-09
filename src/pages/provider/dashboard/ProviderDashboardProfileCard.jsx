export default function ProviderDashboardProfileCard({ profile, onEdit }) {
  return (
    <div className="auth-card p-6 flex flex-col items-center text-center animate-fade-in-up hover:-translate-y-1 transition-transform duration-300">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-[var(--color-surface-alt)] shadow-lg hover:shadow-xl transition-shadow">
        <img
          src={profile.profileImage || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl font-bold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] mb-1">{profile.businessName}</h2>
      <p className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] text-sm mb-4">{profile.city}</p>

      <div className="w-full divider-text mb-4">Stats</div>

      <div className="flex justify-around w-full mt-2">
        <div className="text-center p-3 rounded-xl hover:bg-[var(--color-background-light)] dark:hover:bg-[var(--color-background-dark)] transition-colors">
          <p className="text-3xl font-bold text-[var(--color-primary)]">{profile.experience}+</p>
          <p className="text-xs text-[var(--color-muted)] font-medium mt-1 uppercase tracking-widest">Years Exp.</p>
        </div>

        <div className="w-px bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]" />

        <div className="text-center p-3 rounded-xl hover:bg-[var(--color-background-light)] dark:hover:bg-[var(--color-background-dark)] transition-colors">
          <p className="text-3xl font-bold text-[var(--color-primary)]">{profile.serviceRadius}</p>
          <p className="text-xs text-[var(--color-muted)] font-medium mt-1 uppercase tracking-widest">km Radius</p>
        </div>
      </div>

      <button
        id="edit-profile-btn"
        onClick={onEdit}
        className="mt-6 w-full group flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #6d28d9 100%)' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Profile
        <svg className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
}
