
import { UserFileUploader } from '../components/UserFileUploader';
import { useAuth } from '../contexts/AuthContext';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col">
      <PageHeader 
        eyebrow="Profile"
        title="Profile Dashboard" 
        intro="Manage your personal files and account settings"
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900">Welcome</h2>
              <p className="text-stone-600 mt-1">{user?.email}</p>
            </div>
            <button 
              onClick={() => signOut()}
              className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
            <UserFileUploader />
          </div>
        </Reveal>
      </main>
    </div>
  );
}
