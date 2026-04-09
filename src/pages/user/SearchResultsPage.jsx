import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchProvidersQuery, useSearchCitiesQuery } from '../../redux/searchApi'
import { useSearchServiceQuery } from '../../redux/serviceApi'
import { useCreateServiceRequestMutation, useSendRequestToProvidersMutation } from '../../redux/serviceRequestApi'
import { setCity } from '../../redux/citySlice'
import SearchResultsTopSection from './searchResults/SearchResultsTopSection'
import SearchResultsResultsSection from './searchResults/SearchResultsResultsSection'
import SearchResultsEnquiryModal from './searchResults/SearchResultsEnquiryModal'

// ── Debounce ───────────────────────────────────────────────────────
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// ── SearchResultsPage ──────────────────────────────────────────────
const SearchResultsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedCity = useSelector((state) => state.city.selectedCity)

  // Read initial values from URL
  const initService = searchParams.get('service') || ''
  const initCity    = searchParams.get('city') || selectedCity

  const [serviceInput, setServiceInput] = useState(initService)
  const [cityInput, setCityInput]       = useState(initCity)
  const [showServices, setShowServices] = useState(false)
  const [showCities, setShowCities]     = useState(false)

  // Sync if URL changes externally
  useEffect(() => {
    setServiceInput(searchParams.get('service') || '')
    setCityInput(searchParams.get('city') || selectedCity)
  }, [searchParams.toString()])

  const serviceRef = useRef(null)
  const cityRef    = useRef(null)

  const debouncedService = useDebounce(serviceInput, 300)
  const debouncedCity    = useDebounce(cityInput, 300)

  const { data: cityData }    = useSearchCitiesQuery(debouncedCity, { skip: debouncedCity.trim().length < 1 })
  const { data: svcData }     = useSearchServiceQuery(debouncedService, { skip: debouncedService.trim().length < 1 })
  const citySuggestions       = cityData?.cities || []
  const serviceSuggestions    = svcData?.service || []

  // ── Filters ────────────────────────────────────────────────────
  const [showFilters, setShowFilters] = useState(false)
  const [sortParam, setSortParam]     = useState('recommended')
  const blank = { minPrice: '', maxPrice: '', priceType: '', minRating: '', experience: '' }
  const [filters, setFilters]         = useState(blank)
  const [activeFilters, setActiveFilters] = useState(blank)

  const applyFilters  = () => { setActiveFilters({ ...filters }); setShowFilters(false) }
  const resetFilters  = () => { setFilters(blank); setActiveFilters(blank); setShowFilters(false) }
  const removeFilter  = (key) => { const f = { ...activeFilters, [key]: '' }; setActiveFilters(f); setFilters(f) }

  // ── Current search query (from URL params) ─────────────────────
  const queryService = searchParams.get('service') || ''
  const queryCity    = searchParams.get('city') || ''

  const { data, isLoading, isError } = useSearchProvidersQuery(
    { service: queryService, city: queryCity, sort: sortParam, ...activeFilters },
    { skip: !queryService && !queryCity }
  )
  const results = data?.results || []

  // ── Enquiry modal ──────────────────────────────────────────────
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [enquiryForm, setEnquiryForm] = useState({
    location: queryCity || selectedCity || '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  const [createRequest, { isLoading: isCreating }]  = useCreateServiceRequestMutation()
  const [sendToProvider, { isLoading: isSending }]  = useSendRequestToProvidersMutation()

  const openEnquiry  = (result) => {
    setSelectedProvider(result)
    setEnquiryForm(p => ({ ...p, location: queryCity || selectedCity || '' }))
  }
  const closeEnquiry = () => {
    setSelectedProvider(null)
    setEnquiryForm({ location: queryCity || selectedCity || '', address: '', preferredDate: '', preferredTime: '', message: '' })
  }
  const submitEnquiry = async (e) => {
    e.preventDefault()
    try {
      const { serviceRequest } = await createRequest({
        service: selectedProvider.service._id,
        ...enquiryForm
      }).unwrap()
      await sendToProvider({ requestId: serviceRequest._id, providerId: selectedProvider.provider._id }).unwrap()
      alert('Enquiry sent successfully!')
      closeEnquiry()
    } catch (err) {
      alert(err.data?.message || 'Failed to send enquiry.')
    }
  }

  // ── Search submit ──────────────────────────────────────────────
  const handleSearch = (e) => {
    e.preventDefault()
    const p = {}
    if (serviceInput.trim()) p.service = serviceInput.trim()
    if (cityInput.trim()) {
      p.city = cityInput.trim()
      dispatch(setCity(cityInput.trim()))
    }
    setSearchParams(p)
  }

  // Close dropdowns on outside click
  useEffect(() => {
    const h = (e) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target)) setShowServices(false)
      if (cityRef.current    && !cityRef.current.contains(e.target))    setShowCities(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SearchResultsTopSection
        navigate={navigate}
        queryCity={queryCity}
        queryService={queryService}
        isLoading={isLoading}
        isError={isError}
        resultsLength={results.length}
        sortParam={sortParam}
        onSortChange={setSortParam}
        handleSearch={handleSearch}
        serviceRef={serviceRef}
        serviceInput={serviceInput}
        onServiceInputChange={(value) => {
          setServiceInput(value)
          setShowServices(true)
        }}
        onServiceFocus={() => setShowServices(true)}
        serviceSuggestions={serviceSuggestions}
        showServices={showServices}
        onSelectService={(service) => {
          setServiceInput(service.serviceName)
          setShowServices(false)
        }}
        cityRef={cityRef}
        cityInput={cityInput}
        onCityInputChange={(value) => {
          setCityInput(value)
          setShowCities(true)
        }}
        onCityFocus={() => setShowCities(true)}
        citySuggestions={citySuggestions}
        showCities={showCities}
        onSelectCity={(city) => {
          setCityInput(city)
          setShowCities(false)
        }}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        activeFilters={activeFilters}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
        removeFilter={removeFilter}
      />

      <SearchResultsResultsSection
        queryService={queryService}
        queryCity={queryCity}
        isLoading={isLoading}
        isError={isError}
        results={results}
        navigate={navigate}
        openEnquiry={openEnquiry}
      />

      <SearchResultsEnquiryModal
        selectedProvider={selectedProvider}
        closeEnquiry={closeEnquiry}
        enquiryForm={enquiryForm}
        setEnquiryForm={setEnquiryForm}
        submitEnquiry={submitEnquiry}
        isCreating={isCreating}
        isSending={isSending}
      />
    </div>
  )
}

export default SearchResultsPage