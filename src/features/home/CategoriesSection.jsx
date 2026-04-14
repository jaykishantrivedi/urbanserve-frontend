import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Wrench, Zap, Sparkles, Wind, Hammer, Paintbrush,
  Leaf, Bug, Droplets, Flame, Shield, Truck,
  Home, Scissors, ChevronRight, ArrowRight
} from 'lucide-react'
import { useGetAllCategoriesQuery } from '../../redux/categoryApi'
import Button from '../../components/ui/Button'

//  Style map 
const categoryStyleMap = {
  "plumbing":       { icon: Droplets,   gradient: "from-blue-500 to-blue-600",     light: "bg-blue-50",   text: "text-blue-600",   border: "hover:border-blue-300" },
  "electrical":     { icon: Zap,        gradient: "from-yellow-400 to-orange-500", light: "bg-yellow-50", text: "text-yellow-600", border: "hover:border-yellow-300" },
  "cleaning":       { icon: Sparkles,   gradient: "from-purple-500 to-purple-600", light: "bg-purple-50", text: "text-purple-600", border: "hover:border-purple-300" },
  "ac & appliance": { icon: Wind,       gradient: "from-cyan-500 to-cyan-600",     light: "bg-cyan-50",   text: "text-cyan-600",   border: "hover:border-cyan-300" },
  "carpentry":      { icon: Hammer,     gradient: "from-orange-500 to-orange-600", light: "bg-orange-50", text: "text-orange-600", border: "hover:border-orange-300" },
  "painting":       { icon: Paintbrush, gradient: "from-pink-500 to-pink-600",     light: "bg-pink-50",   text: "text-pink-600",   border: "hover:border-pink-300" },
  "gardening":      { icon: Leaf,       gradient: "from-green-500 to-green-600",   light: "bg-green-50",  text: "text-green-600",  border: "hover:border-green-300" },
  "pest control":   { icon: Bug,        gradient: "from-red-500 to-red-600",       light: "bg-red-50",    text: "text-red-600",    border: "hover:border-red-300" },
  "gas":            { icon: Flame,      gradient: "from-orange-400 to-red-500",    light: "bg-orange-50", text: "text-orange-600", border: "hover:border-orange-300" },
  "security":       { icon: Shield,     gradient: "from-slate-500 to-slate-700",   light: "bg-slate-50",  text: "text-slate-600",  border: "hover:border-slate-300" },
  "moving":         { icon: Truck,      gradient: "from-indigo-500 to-indigo-600", light: "bg-indigo-50", text: "text-indigo-600", border: "hover:border-indigo-300" },
  "home repair":    { icon: Home,       gradient: "from-teal-500 to-teal-600",     light: "bg-teal-50",   text: "text-teal-600",   border: "hover:border-teal-300" },
  "salon":          { icon: Scissors,   gradient: "from-rose-500 to-rose-600",     light: "bg-rose-50",   text: "text-rose-600",   border: "hover:border-rose-300" },
  "health":         { icon: Sparkles,   gradient: "from-emerald-500 to-green-600", light: "bg-emerald-50",text: "text-emerald-600",border: "hover:border-emerald-300" },
  "welding":        { icon: Wrench,     gradient: "from-gray-500 to-gray-700",     light: "bg-gray-50",   text: "text-gray-600",   border: "hover:border-gray-300" },
}

const defaultStyle = {
  icon: Wrench,
  gradient: "from-gray-500 to-gray-600",
  light: "bg-gray-50",
  text: "text-gray-600",
  border: "hover:border-gray-300"
}

const getCategoryStyle = (categoryName) => {
  const key = categoryName?.toLowerCase().trim()
  if (categoryStyleMap[key]) return categoryStyleMap[key]
  const partialKey = Object.keys(categoryStyleMap).find(k => key.includes(k) || k.includes(key))
  return partialKey ? categoryStyleMap[partialKey] : defaultStyle
}

//  Skeleton 
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="flex items-start justify-between mb-5">
      <div className="w-14 h-14 bg-gray-200 rounded-2xl" />
      <div className="w-6 h-6 bg-gray-100 rounded-full" />
    </div>
    <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
    <div className="h-3 bg-gray-100 rounded w-full mb-2" />
    <div className="h-3 bg-gray-100 rounded w-4/5 mb-6" />
    <div className="h-px bg-gray-100 mb-4" />
    <div className="h-3 bg-gray-100 rounded w-1/3" />
  </div>
)

//  Category Card 
const CategoryCard = ({ category, onClick }) => {
  const { icon: Icon, gradient, light, text, border } = getCategoryStyle(category.categoryName)

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl border border-gray-100 ${border} p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

      <div className="flex items-start justify-between mb-5">
        <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <div className="absolute inset-0 rounded-2xl bg-white opacity-10" />
          <Icon className="text-white relative z-10" size={26} />
        </div>
        <div className={`w-8 h-8 rounded-full ${light} ${text} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0`}>
          <ArrowRight size={14} />
        </div>
      </div>

      <h3 className={`text-lg font-bold text-gray-900 mb-2 group-hover:${text} transition-colors duration-200`}>
        {category.categoryName}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
        {category.description || `Browse all ${category.categoryName.toLowerCase()} services`}
      </p>

      <div className="h-px bg-gray-100 my-4" />

      <p className={`text-xs font-semibold ${text} flex items-center gap-1`}>
        Explore services
        <ChevronRight size={12} />
      </p>
    </div>
  )
}

//  Main Section 
const CategoriesSection = () => {
  const navigate     = useNavigate()
  const selectedCity = useSelector((state) => state.city.selectedCity)

  const { data, isLoading, isError } = useGetAllCategoriesQuery()

  const categories = data?.categories?.slice(0, 6) || []
  const hasMore    = (data?.categories?.length || 0) > 6

  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4">
            What we offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Find the right professional for every home service need
          </p>
        </div>

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Failed to load categories. Please try again later.</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {isLoading && [...Array(6)].map((_, i) => <SkeletonCard key={i} />)}

          {!isLoading && !isError && categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onClick={() => navigate(`/${selectedCity}/${category.slug}`)}
            />
          ))}

          {!isLoading && !isError && categories.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-500">
              <p className="text-lg">No categories available at the moment.</p>
            </div>
          )}
        </div>

        {/* Browse All Button */}
        {!isLoading && (hasMore || categories.length > 0) && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/categories')}
              className="px-8"
            >
              Browse All Categories
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

      </div>
    </section>
  )
}

export default CategoriesSection