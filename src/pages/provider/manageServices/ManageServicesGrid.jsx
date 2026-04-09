import ManageServiceCard from './ManageServiceCard';
import ManageServicesSkeletonGrid from './ManageServicesSkeletonGrid';

export default function ManageServicesGrid({
  isLoading,
  services,
  onToggle,
  onDelete,
  onEdit,
  isToggling,
  isDeleting,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      {isLoading ? (
        <ManageServicesSkeletonGrid />
      ) : (
        services.map((providerService) => (
          <ManageServiceCard
            key={providerService._id}
            providerService={providerService}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            isToggling={isToggling}
            isDeleting={isDeleting}
          />
        ))
      )}
    </div>
  );
}
