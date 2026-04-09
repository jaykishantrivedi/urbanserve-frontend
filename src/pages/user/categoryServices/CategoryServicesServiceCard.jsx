import { ArrowRight } from "lucide-react"

export default function CategoryServicesServiceCard({ service, categoryStyle, onClick }) {
  const { icon: Icon, gradient, text } = categoryStyle

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        {service.imageUrl ? (
          <>
            <img
              src={service.imageUrl}
              alt={service.serviceName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <div className="flex flex-col items-center gap-3 opacity-80">
              <Icon className="text-white" size={48} />
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full" />
            <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/10 rounded-full" />
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{service.serviceName}</h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 min-h-[2.5rem]">
          {service.description || `Professional ${service.serviceName.toLowerCase()} services at your doorstep`}
        </p>

        <div
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl ${text} bg-gray-50 group-hover:bg-opacity-80 transition-all duration-200 text-sm font-semibold`}
        >
          <span>View Providers</span>
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  )
}
