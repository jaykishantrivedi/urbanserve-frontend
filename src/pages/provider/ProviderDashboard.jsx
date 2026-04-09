import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProviderProfileQuery } from '../../redux/providerApi';
import ContactDetailsSection from './dashboard/ContactDetailsSection';
import EditProfileModal from './dashboard/EditProfileModal';
import ProviderDashboardBusinessDetails from './dashboard/ProviderDashboardBusinessDetails';
import ProviderDashboardErrorState from './dashboard/ProviderDashboardErrorState';
import ProviderDashboardHeader from './dashboard/ProviderDashboardHeader';
import ProviderDashboardLoadingState from './dashboard/ProviderDashboardLoadingState';
import ProviderDashboardProfileCard from './dashboard/ProviderDashboardProfileCard';
import ProviderDashboardQuickActions from './dashboard/ProviderDashboardQuickActions';
import ProviderDashboardWalletWarning from './dashboard/ProviderDashboardWalletWarning';

const ProviderDashboard = () => {
  const { data, isLoading, error, refetch } = useGetProviderProfileQuery();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  if (isLoading) return <ProviderDashboardLoadingState />;

  if (error || !data?.profile) {
    console.error('Dashboard error:', error);
    return <ProviderDashboardErrorState />;
  }

  const { profile } = data;

  return (
    <>
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSaved={refetch}
        />
      )}

      <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 mt-16 max-w-6xl mx-auto">
        <ProviderDashboardHeader
          profile={profile}
          onAddService={() => navigate('/provider/services/add')}
        />

        {profile.walletBalance < 100 && (
          <ProviderDashboardWalletWarning onGoWallet={() => navigate('/provider/wallet')} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProviderDashboardProfileCard
              profile={profile}
              onEdit={() => setShowEditModal(true)}
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ProviderDashboardBusinessDetails profile={profile} />
            <ContactDetailsSection />
            <ProviderDashboardQuickActions
              onManageServices={() => navigate('/provider/services')}
              onBookings={() => navigate('/provider/bookings')}
              onReviews={() => navigate('/provider/reviews')}
              onWallet={() => navigate('/provider/wallet')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderDashboard;
