import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useDeleteProviderServiceMutation,
  useGetAllProviderServiceQuery,
  useToggleProviderServiceStatusMutation,
} from '../../redux/providerServiceApi';
import EditServiceModal from './manageServices/EditServiceModal';
import ManageServicesEmptyState from './manageServices/ManageServicesEmptyState';
import ManageServicesErrorState from './manageServices/ManageServicesErrorState';
import ManageServicesGrid from './manageServices/ManageServicesGrid';
import ManageServicesHeader from './manageServices/ManageServicesHeader';

const ManageServicesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetAllProviderServiceQuery();
  const [deleteService, { isLoading: isDeleting }] = useDeleteProviderServiceMutation();
  const [toggleService, { isLoading: isToggling }] = useToggleProviderServiceStatusMutation();
  const [editingService, setEditingService] = useState(null);

  const services = data?.services || [];

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await deleteService(id).unwrap();
      toast.success('Service deleted successfully');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete service');
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleService(id).unwrap();
      toast.success('Service status updated');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update service status');
    }
  };

  if (!isLoading && !isError && services.length === 0) {
    return <ManageServicesEmptyState onAddFirstService={() => navigate('/provider/services/add')} />;
  }

  return (
    <>
      {editingService && (
        <EditServiceModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onSaved={refetch}
        />
      )}

      <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 mt-5 max-w-7xl mx-auto">
        <ManageServicesHeader onAddService={() => navigate('/provider/services/add')} />

        {isError && <ManageServicesErrorState />}

        <ManageServicesGrid
          isLoading={isLoading}
          services={services}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={setEditingService}
          isToggling={isToggling}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};

export default ManageServicesPage;
