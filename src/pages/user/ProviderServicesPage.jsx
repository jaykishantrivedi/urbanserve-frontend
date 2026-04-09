import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  MapPin,
  Search,
  ChevronRight,
  Home,
  SlidersHorizontal,
  MessagesSquare,
} from 'lucide-react'
import { useGetServiceBySlugQuery, useSearchServiceQuery } from '../../redux/serviceApi'
import { useSearchCitiesQuery, useSearchProvidersQuery } from '../../redux/searchApi'
import {
  useCreateServiceRequestMutation,
  useSendRequestToProvidersMutation,
} from '../../redux/serviceRequestApi'
import { setCity } from '../../redux/citySlice'
import ServiceRequestModal from '../../components/user/ServiceRequestModal'
import Dropdown from './providerServices/Dropdown'
import SearchInput from './providerServices/SearchInput'
import ProviderFiltersPanel from './providerServices/ProviderFiltersPanel'
import ActiveFiltersChips from './providerServices/ActiveFiltersChips'
import ProviderResultsGrid from './providerServices/ProviderResultsGrid'
import EnquiryModal from './providerServices/EnquiryModal'

const INITIAL_FILTERS = {
  minPrice: '',
  maxPrice: '',
  priceType: '',
  minRating: '',
  experience: '',
}

const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

const ProviderServicesPage = () => {
  const { city, categorySlug, serviceSlug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedCity = useSelector((state) => state.city.selectedCity)

  const { data: serviceData } = useGetServiceBySlugQuery(serviceSlug)
  const serviceName = serviceData?.service?.serviceName || ''

  const [cityInput, setCityInput] = useState(city || selectedCity || '')
  const [serviceInput, setServiceInput] = useState('')
  const [showCities, setShowCities] = useState(false)
  const [showServices, setShowServices] = useState(false)

  const [showFilters, setShowFilters] = useState(false)
  const [sortParam, setSortParam] = useState('recommended')
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS)

  const [isMassEnquiryOpen, setIsMassEnquiryOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [enquiryForm, setEnquiryForm] = useState({
    location: city || selectedCity || '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  })

  const [createRequest, { isLoading: isCreating }] = useCreateServiceRequestMutation()
  const [sendToProvider, { isLoading: isSending }] = useSendRequestToProvidersMutation()

  const cityRef = useRef(null)
  const serviceRef = useRef(null)

  useEffect(() => {
    if (serviceName) setServiceInput(serviceName)
  }, [serviceName])

  useEffect(() => {
    setCityInput(city || selectedCity || '')
  }, [city, selectedCity])

  const debouncedCity = useDebounce(cityInput, 300)
  const debouncedService = useDebounce(serviceInput, 300)

  const { data: cityData } = useSearchCitiesQuery(debouncedCity, {
    skip: debouncedCity.trim().length < 1,
  })

  const { data: searchServiceData } = useSearchServiceQuery(debouncedService, {
    skip: debouncedService.trim().length < 1,
  })

  const citySuggestions = cityData?.cities || []
  const serviceSuggestions = searchServiceData?.service || []

  const { data: resultsData, isLoading, isError } = useSearchProvidersQuery(
    { service: serviceSlug, city, sort: sortParam, ...activeFilters },
    { skip: !serviceSlug || !city }
  )

  const results = resultsData?.results || []

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setShowCities(false)
      }
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setShowServices(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const applyFilters = () => {
    setActiveFilters({ ...filters })
    setShowFilters(false)
  }

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS)
    setActiveFilters(INITIAL_FILTERS)
    setShowFilters(false)
  }

  const removeFilter = (keys) => {
    const keysToRemove = Array.isArray(keys) ? keys : [keys]
    const nextFilters = { ...activeFilters }

    keysToRemove.forEach((key) => {
      nextFilters[key] = ''
    })

    setActiveFilters(nextFilters)
    setFilters(nextFilters)
  }

  const handleCitySelect = (nextCity) => {
    if (!nextCity) return

    setCityInput(nextCity)
    setShowCities(false)
    dispatch(setCity(nextCity))
    navigate(`/${nextCity}/${categorySlug}/${serviceSlug}`)
  }

  const handleServiceSelect = (service) => {
    setServiceInput(service.serviceName)
    setShowServices(false)

    const newCategorySlug = service.category?.slug
    const newServiceSlug = service.slug

    if (!newCategorySlug || !newServiceSlug) return

    const routeCity = cityInput || city || selectedCity
    if (!routeCity) return

    navigate(`/${routeCity}/${newCategorySlug}/${newServiceSlug}`)
  }

  const handleEnquiryClick = (providerResult) => {
    setSelectedProvider(providerResult)
    setEnquiryForm((prev) => ({
      ...prev,
      location: city || selectedCity || '',
    }))
  }

  const closeEnquiryModal = () => {
    setSelectedProvider(null)
    setEnquiryForm({
      location: city || selectedCity || '',
      address: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    })
  }

  const handleEnquiryFieldChange = (field, value) => {
    setEnquiryForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleEnquirySubmit = async (event) => {
    event.preventDefault()

    if (!selectedProvider) return

    try {
      const createResponse = await createRequest({
        service: selectedProvider.service._id,
        ...enquiryForm,
      }).unwrap()

      await sendToProvider({
        requestId: createResponse.serviceRequest._id,
        providerId: selectedProvider.provider._id,
      }).unwrap()

      alert('Enquiry sent successfully!')
      closeEnquiryModal()
    } catch (error) {
      console.error(error)
      alert(error.data?.message || 'Failed to send enquiry. Please try again.')
    }
  }

  const hasActiveFilters = Object.values(activeFilters).some((value) => value !== '')
  const categoryLabel = categorySlug.replace(/-/g, ' ')

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <nav className="flex items-center gap-1 mb-8 flex-wrap" aria-label="Breadcrumb">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 transition-colors duration-150 px-2 py-1 rounded-lg hover:bg-blue-50"
            >
              <Home size={13} />
              <span>Home</span>
            </button>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <button
              onClick={() => navigate('/categories')}
              className="text-sm text-gray-400 hover:text-blue-600 transition-colors duration-150 px-2 py-1 rounded-lg hover:bg-blue-50"
            >
              Categories
            </button>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <button
              onClick={() => navigate(`/${city}/${categorySlug}`)}
              className="text-sm text-gray-400 hover:text-blue-600 transition-colors duration-150 px-2 py-1 rounded-lg hover:bg-blue-50 capitalize"
            >
              {categoryLabel}
            </button>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <span className="text-sm font-semibold text-gray-700 px-2 py-1">
              {serviceName || serviceSlug.replace(/-/g, ' ')}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                  <MapPin size={11} />
                  {city}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                {serviceName || serviceSlug.replace(/-/g, ' ')}
              </h1>
              <p className="text-gray-500 mt-3 text-sm md:text-base max-w-lg">
                Browse and connect with verified professionals near you for a luxury grooming experience at home.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setIsMassEnquiryOpen(true)}
                className="hidden sm:flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm whitespace-nowrap"
              >
                <MessagesSquare size={16} />
                Request all providers
              </button>
              <div className="relative inline-block w-full sm:w-auto">
                <select
                  value={sortParam}
                  onChange={(event) => setSortParam(event.target.value)}
                  className="appearance-none w-full bg-white border border-gray-200 hover:border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronRight size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-4xl">
            <div ref={serviceRef} className="flex-1">
              <SearchInput
                icon={Search}
                value={serviceInput}
                placeholder="Search service..."
                onChange={(event) => {
                  setServiceInput(event.target.value)
                  setShowServices(true)
                }}
                onFocus={() => setShowServices(true)}
                dropdownContent={
                  <Dropdown
                    items={serviceSuggestions}
                    visible={showServices && serviceInput.trim().length > 0}
                    onSelect={handleServiceSelect}
                    renderItem={(service) => (
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">{service.serviceName}</span>
                        <span className="text-xs text-gray-400 shrink-0">{service.category?.categoryName}</span>
                      </div>
                    )}
                  />
                }
              />
            </div>

            <div ref={cityRef} className="flex-1">
              <SearchInput
                icon={MapPin}
                value={cityInput}
                placeholder="Enter city..."
                onChange={(event) => {
                  setCityInput(event.target.value)
                  setShowCities(true)
                }}
                onFocus={() => setShowCities(true)}
                dropdownContent={
                  <Dropdown
                    items={citySuggestions}
                    visible={showCities && cityInput.trim().length > 0}
                    onSelect={handleCitySelect}
                  />
                }
              />
            </div>

            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 h-12.5 shrink-0 ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 border-transparent hover:bg-blue-700'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
              }`}
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>

          <button
            onClick={() => setIsMassEnquiryOpen(true)}
            className="sm:hidden flex items-center justify-center gap-2 w-full mt-3 px-5 py-3.5 bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 rounded-2xl font-bold text-sm transition-all duration-300 shadow-sm"
          >
            <MessagesSquare size={16} />
            Request all providers
          </button>

          <ProviderFiltersPanel
            show={showFilters}
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
            onApply={applyFilters}
          />

          <ActiveFiltersChips
            visible={!isLoading && !isError && results.length > 0}
            resultsCount={results.length}
            activeFilters={activeFilters}
            onRemoveFilter={removeFilter}
          />
        </div>
      </div>

      <ProviderResultsGrid
        isLoading={isLoading}
        isError={isError}
        results={results}
        city={city}
        serviceName={serviceName || serviceSlug}
        onViewProfile={(providerId) => navigate(`/providers/${providerId}`)}
        onEnquiry={handleEnquiryClick}
      />

      <EnquiryModal
        selectedProvider={selectedProvider}
        enquiryForm={enquiryForm}
        onChange={handleEnquiryFieldChange}
        onClose={closeEnquiryModal}
        onSubmit={handleEnquirySubmit}
        isSubmitting={isCreating || isSending}
      />

      {results.length > 0 && serviceData?.service && (
        <ServiceRequestModal
          isOpen={isMassEnquiryOpen}
          onClose={() => setIsMassEnquiryOpen(false)}
          serviceId={serviceData.service._id}
          serviceName={serviceName || serviceSlug}
        />
      )}
    </div>
  )
}

export default ProviderServicesPage
