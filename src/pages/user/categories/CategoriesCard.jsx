import { ArrowRight, ChevronRight } from "lucide-react"
import { getCategoryStyle } from "./categoryStyles"

export default function CategoriesCard({ category, onClick }) {
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
        <div
          className={`w-8 h-8 rounded-full ${light} ${text} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0`}
        >
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
