import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetAllServicesQuery } from '../../redux/serviceApi'
import { useCreateProviderServiceMutation } from '../../redux/providerServiceApi'
import AddServiceActions from './addService/AddServiceActions'
import AddServiceDescriptionField from './addService/AddServiceDescriptionField'
import AddServiceExperienceField from './addService/AddServiceExperienceField'
import AddServiceHeader from './addService/AddServiceHeader'
import AddServicePriceInput from './addService/AddServicePriceInput'
import AddServicePriceTypeDropdown from './addService/AddServicePriceTypeDropdown'
import AddServiceServiceDropdown from './addService/AddServiceServiceDropdown'
import { PRICE_TYPE_OPTIONS } from './addService/addServiceOptions'

const AddServicePage = () => {
    const navigate = useNavigate()

    const { data: servicesData, isLoading: isServicesLoading } = useGetAllServicesQuery()
    const [createProviderService, { isLoading: isCreating }] = useCreateProviderServiceMutation()

    const [selectedService, setSelectedService] = useState(null)
    const [priceType, setPriceType] = useState('fixed')
    const [price, setPrice] = useState('')
    const [experience, setExperience] = useState('')
    const [description, setDescription] = useState('')

    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false)
    const [isPriceTypeDropdownOpen, setIsPriceTypeDropdownOpen] = useState(false)

    const serviceDropdownRef = useRef(null)
    const priceTypeDropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) {
                setIsServiceDropdownOpen(false)
            }
            if (priceTypeDropdownRef.current && !priceTypeDropdownRef.current.contains(event.target)) {
                setIsPriceTypeDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const finalPrice = priceType === 'inspection' ? 0 : Number(price)

        if (!selectedService || (priceType !== 'inspection' && price === '') || !priceType) {
            toast.error('Please fill in all required fields (Service, Price, Price Type).')
            return
        }

        try {
            await createProviderService({
                service: selectedService._id,
                price: finalPrice,
                priceType,
                experience: Number(experience) || 0,
                description,
            }).unwrap()

            toast.success('Service added successfully!')
            navigate('/provider/dashboard')
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to add service.')
        }
    }

    return (
        <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <AddServiceHeader />

            <div className="auth-card p-6 sm:p-10 animate-fade-in-up shadow-xl" style={{ animationDelay: '100ms' }}>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <AddServiceServiceDropdown
                        selectedService={selectedService}
                        setSelectedService={setSelectedService}
                        isOpen={isServiceDropdownOpen}
                        setIsOpen={setIsServiceDropdownOpen}
                        dropdownRef={serviceDropdownRef}
                        isServicesLoading={isServicesLoading}
                        services={servicesData?.service || []}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-40">
                        <AddServicePriceTypeDropdown
                            priceType={priceType}
                            setPriceType={setPriceType}
                            options={PRICE_TYPE_OPTIONS}
                            isOpen={isPriceTypeDropdownOpen}
                            setIsOpen={setIsPriceTypeDropdownOpen}
                            dropdownRef={priceTypeDropdownRef}
                        />

                        <div className="space-y-4 relative z-30">
                            <AddServicePriceInput
                                priceType={priceType}
                                price={price}
                                setPrice={setPrice}
                            />
                        </div>
                    </div>

                    <AddServiceExperienceField
                        experience={experience}
                        setExperience={setExperience}
                    />

                    <AddServiceDescriptionField
                        description={description}
                        setDescription={setDescription}
                    />

                    <AddServiceActions
                        onCancel={() => navigate('/provider/dashboard')}
                        isCreating={isCreating}
                    />
                </form>
            </div>
        </div>
    )
}

export default AddServicePage
