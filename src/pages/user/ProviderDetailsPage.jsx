import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetServiceProviderByIdQuery } from '../../redux/providerApi';
import { useGetAllProviderServiceForUserQuery } from '../../redux/providerServiceApi';
import ServiceRequestModal from '../../components/user/ServiceRequestModal';
import ProviderDetailsLoadingState from './providerDetails/ProviderDetailsLoadingState';
import ProviderDetailsNotFoundState from './providerDetails/ProviderDetailsNotFoundState';
import ProviderDetailsHeader from './providerDetails/ProviderDetailsHeader';
import ProviderDetailsAboutSection from './providerDetails/ProviderDetailsAboutSection';
import ProviderDetailsServicesSection from './providerDetails/ProviderDetailsServicesSection';
import ProviderDetailsAvailabilityCard from './providerDetails/ProviderDetailsAvailabilityCard';

export default function ProviderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetServiceProviderByIdQuery(id);
  const { data: servicesData, isLoading: isServicesLoading } = useGetAllProviderServiceForUserQuery(id);
  const services = servicesData?.services || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const provider = data?.provider;

  if (isLoading) {
    return <ProviderDetailsLoadingState />;
  }

  if (error || !provider) {
    return <ProviderDetailsNotFoundState onBack={() => navigate(-1)} />;
  }

  const handleBookService = (providerService) => {
    setSelectedService({
      id: providerService.service._id,
      name: providerService.service.serviceName,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background-light pt-(--height-navbar) pb-12">
      <ProviderDetailsHeader provider={provider} navigate={navigate} />

      <div className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <ProviderDetailsAboutSection provider={provider} />

          <ProviderDetailsServicesSection
            provider={provider}
            services={services}
            isServicesLoading={isServicesLoading}
            onBookService={handleBookService}
          />
        </div>

        <div className="space-y-8">
          <ProviderDetailsAvailabilityCard availability={provider.availability} />
        </div>
      </div>

      {selectedService && (
        <ServiceRequestModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          serviceId={selectedService.id}
          serviceName={selectedService.name}
          providerId={provider._id}
        />
      )}
    </div>
  );
}
