// import { useState, useRef, useEffect } from 'react'
// import { ArrowRight, MapPin, Search } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import { useSearchCitiesQuery } from '../../redux/searchApi'
// import { useSearchServiceQuery } from '../../redux/serviceApi'
// import Button from '../../components/ui/Button'

// // ── Debounce hook ──────────────────────────────────────────────────
// const useDebounce = (value, delay = 300) => {
//   const [debounced, setDebounced] = useState(value)
//   useEffect(() => {
//     const timer = setTimeout(() => setDebounced(value), delay)
//     return () => clearTimeout(timer)
//   }, [value, delay])
//   return debounced
// }

// // ── Autocomplete Dropdown ──────────────────────────────────────────
// const Dropdown = ({ items, onSelect, visible }) => {
//   if (!visible || !items.length) return null

//   return (
//     <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
//       {items.map((item, i) => (
//         <li
//           key={i}
//           onMouseDown={(e) => {
//             e.preventDefault() // prevent input blur before click registers
//             onSelect(item)
//           }}
//           className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150"
//         >
//           {item}
//         </li>
//       ))}
//     </ul>
//   )
// }

// // ── Hero Section ───────────────────────────────────────────────────
// const HeroSection = () => {
//   const [city, setCity]               = useState('')
//   const [service, setService]         = useState('')
//   const [showCities, setShowCities]   = useState(false)
//   const [showServices, setShowServices] = useState(false)

//   const cityRef    = useRef(null)
//   const serviceRef = useRef(null)
//   const navigate   = useNavigate()

//   const debouncedCity    = useDebounce(city, 300)
//   const debouncedService = useDebounce(service, 300)

//   // ── Queries — only fire when input has value ───────────────────
//   const { data: cityData } = useSearchCitiesQuery(debouncedCity, {
//     skip: debouncedCity.trim().length < 1
//   })

//   const { data: serviceData } = useSearchServiceQuery(debouncedService, {
//     skip: debouncedService.trim().length < 1
//   })

//   const citySuggestions    = cityData?.cities || []
//   const serviceSuggestions = serviceData?.service?.map(s => s.serviceName) || []

//   // ── Close dropdowns on outside click ──────────────────────────
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (cityRef.current && !cityRef.current.contains(e.target)) {
//         setShowCities(false)
//       }
//       if (serviceRef.current && !serviceRef.current.contains(e.target)) {
//         setShowServices(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClick)
//     return () => document.removeEventListener('mousedown', handleClick)
//   }, [])

//   // ── Search handler ─────────────────────────────────────────────
//   const handleSearch = (e) => {
//     e.preventDefault()
//     const params = new URLSearchParams()
//     if (service.trim()) params.set('service', service.trim())
//     if (city.trim()) params.set('city', city.trim())
//     navigate(`/services?${params.toString()}`)
//   }

//   return (
//     <section id="home" className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">

//       {/* Background Design */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
//         <div className="absolute top-40 left-1/4 w-72 h-72 border border-blue-200/30 rounded-3xl rotate-12" />
//         <div className="absolute bottom-20 right-1/4 w-64 h-64 border border-purple-200/30 rounded-3xl -rotate-12" />
//       </div>

//       <div className="max-w-5xl mx-auto">
//         <div className="text-center space-y-8">

//           {/* Heading */}
//           <div className="space-y-4">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//               Book Trusted Local Services{' '}
//               <span className="bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//                 Near You
//               </span>
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
//               Connect with verified professionals for all your home service needs.
//               Fast, reliable, and affordable solutions at your fingertips.
//             </p>
//           </div>

//           {/* Search Card */}
//           <form
//             onSubmit={handleSearch}
//             className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto border border-gray-100"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

//               {/* City Input */}
//               <div ref={cityRef}>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
//                   Your City
//                 </label>
//                 <div className="relative">
//                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                   <input
//                     type="text"
//                     placeholder="Enter your city"
//                     value={city}
//                     onChange={(e) => {
//                       setCity(e.target.value)
//                       setShowCities(true)
//                     }}
//                     onFocus={() => setShowCities(true)}
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
//                   />
//                   <Dropdown
//                     items={citySuggestions}
//                     visible={showCities && city.trim().length > 0}
//                     onSelect={(val) => {
//                       setCity(val)
//                       setShowCities(false)
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Service Input */}
//               <div ref={serviceRef}>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
//                   Select Service
//                 </label>
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                   <input
//                     type="text"
//                     placeholder="Search for a service"
//                     value={service}
//                     onChange={(e) => {
//                       setService(e.target.value)
//                       setShowServices(true)
//                     }}
//                     onFocus={() => setShowServices(true)}
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
//                   />
//                   <Dropdown
//                     items={serviceSuggestions}
//                     visible={showServices && service.trim().length > 0}
//                     onSelect={(val) => {
//                       setService(val)
//                       setShowServices(false)
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Search Button */}
//             <Button
//               type="submit"
//               variant="primary"
//               fullWidth
//               size="lg"
//               className="py-6 text-base shadow-lg hover:shadow-xl"
//             >
//               Search Services
//               <ArrowRight size={20} />
//             </Button>

//             {/* Popular Services Pills */}
//             <div className="mt-6">
//               <p className="text-sm text-gray-600 mb-3 text-left">Popular Services:</p>
//               <div className="flex flex-wrap gap-2">
//                 {['Plumber', 'Electrician', 'Cleaning', 'AC Repair', 'Carpenter', 'Painter'].map((srv) => (
//                   <button
//                     key={srv}
//                     type="button"
//                     onClick={() => setService(srv)}
//                     className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
//                   >
//                     {srv}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </form>

//           {/* Become a Provider CTA */}
//           <div className="flex justify-center pt-4">
//             <Button
//               variant="outline"
//               size="lg"
//               className="px-8 py-6 text-base"
//               onClick={() => navigate('/signup')}
//             >
//               Become a Provider
//             </Button>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default HeroSection

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, MapPin, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCity } from '../../redux/citySlice'
import { useSearchCitiesQuery } from '../../redux/searchApi'
import { useSearchServiceQuery } from '../../redux/serviceApi'
import Button from '../../components/ui/Button'

// ── Debounce hook ──────────────────────────────────────────────────
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// ── Autocomplete Dropdown ──────────────────────────────────────────
const Dropdown = ({ items, onSelect, visible }) => {
  if (!visible || !items.length) return null

  return (
    <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
      {items.map((item, i) => (
        <li
          key={i}
          onMouseDown={(e) => {
            e.preventDefault()
            onSelect(item)
          }}
          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

// ── Hero Section ───────────────────────────────────────────────────
const HeroSection = () => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  const selectedCity = useSelector((state) => state.city.selectedCity)

  const [city, setLocalCity]            = useState(selectedCity)
  const [service, setService]           = useState('')
  const [showCities, setShowCities]     = useState(false)
  const [showServices, setShowServices] = useState(false)

  const cityRef    = useRef(null)
  const serviceRef = useRef(null)

  // Keep local city in sync if Redux city changes externally
  useEffect(() => {
    setLocalCity(selectedCity)
  }, [selectedCity])

  const debouncedCity    = useDebounce(city, 300)
  const debouncedService = useDebounce(service, 300)

  const { data: cityData } = useSearchCitiesQuery(debouncedCity, {
    skip: debouncedCity.trim().length < 1
  })

  const { data: serviceData } = useSearchServiceQuery(debouncedService, {
    skip: debouncedService.trim().length < 1
  })

  const citySuggestions    = cityData?.cities || []
  const serviceSuggestions = serviceData?.service?.map(s => s.serviceName) || []

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) setShowCities(false)
      if (serviceRef.current && !serviceRef.current.contains(e.target)) setShowServices(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmedCity = city.trim()
    const trimmedService = service.trim()

    // Update Redux city if user changed it
    if (trimmedCity && trimmedCity !== selectedCity) {
      dispatch(setCity(trimmedCity))
    }

    const params = new URLSearchParams()
    if (trimmedService) params.set('service', trimmedService)
    if (trimmedCity) params.set('city', trimmedCity)
    navigate(`/services?${params.toString()}`)
  }

  return (
    <section id="home" className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Background Design */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/4 w-72 h-72 border border-blue-200/30 rounded-3xl rotate-12" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 border border-purple-200/30 rounded-3xl -rotate-12" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-8">

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Book Trusted Local Services{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Near You
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with verified professionals for all your home service needs.
              Fast, reliable, and affordable solutions at your fingertips.
            </p>
          </div>

          {/* Search Card */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

              {/* City Input */}
              <div ref={cityRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Your City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  <input
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => {
                      setLocalCity(e.target.value)
                      setShowCities(true)
                    }}
                    onFocus={() => setShowCities(true)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                  <Dropdown
                    items={citySuggestions}
                    visible={showCities && city.trim().length > 0}
                    onSelect={(val) => {
                      setLocalCity(val)
                      setShowCities(false)
                    }}
                  />
                </div>
              </div>

              {/* Service Input */}
              <div ref={serviceRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Select Service
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  <input
                    type="text"
                    placeholder="Search for a service"
                    value={service}
                    onChange={(e) => {
                      setService(e.target.value)
                      setShowServices(true)
                    }}
                    onFocus={() => setShowServices(true)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                  <Dropdown
                    items={serviceSuggestions}
                    visible={showServices && service.trim().length > 0}
                    onSelect={(val) => {
                      setService(val)
                      setShowServices(false)
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              className="py-6 text-base shadow-lg hover:shadow-xl"
            >
              Search Services
              <ArrowRight size={20} />
            </Button>

            {/* Popular Services Pills */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3 text-left">Popular Services:</p>
              <div className="flex flex-wrap gap-2">
                {['Plumber', 'Electrician', 'Cleaning', 'AC Repair', 'Carpenter', 'Painter'].map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setService(srv)}
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Become a Provider CTA */}
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base"
              onClick={() => navigate('/signup')}
            >
              Become a Provider
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection