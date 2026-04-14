import { Briefcase, Star } from "lucide-react";

export default function ProviderDetailsServicesSection({ provider, services, isServicesLoading, onBookService }) {
  return (
    <div className="auth-card p-6 md:p-8">
      <h2 className="text-xl font-bold text-foreground mb-4 pb-4 border-b border-(--color-border)">Provided Services</h2>
      {isServicesLoading ? (
        <div className="flex justify-center py-12">
          <span className="animate-spin text-4xl text-(--color-primary)"></span>
        </div>
      ) : services.length > 0 ? (
        <div className="space-y-5">
          {services.map((providerService) => (
            <div
              key={providerService._id}
              className="group flex flex-col sm:flex-row gap-5 p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
            >
              <div className="w-full sm:w-40 h-40 bg-gray-50 rounded-2xl overflow-hidden shrink-0 relative border border-gray-100">
                {providerService.service?.imageUrl?.[0] ? (
                  <img
                    src={providerService.service.imageUrl[0]}
                    alt={providerService.service?.serviceName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-200">
                    <Briefcase className="w-10 h-10" />
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-xl text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {providerService.service?.serviceName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl font-bold shadow-sm">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{provider.rating > 0 ? provider.rating.toFixed(1) : "New"}</span>
                      {provider.totalReviews > 0 && (
                        <span className="text-amber-600/70 text-xs ml-0.5 font-semibold">({provider.totalReviews})</span>
                      )}
                    </div>
                  </div>

                  {providerService.service?.category?.categoryName && (
                    <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider bg-blue-50/80 border border-blue-100 px-3 py-1 rounded-full mb-3 inline-block">
                      {providerService.service.category.categoryName}
                    </span>
                  )}

                  <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">
                    {providerService.description || providerService.service?.description || "No description provided."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto bg-gray-50/50 p-3 rounded-xl border border-gray-50 ">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 font-bold text-gray-900 text-lg">
                      {providerService.priceType === "inspection" ? (
                        <span className="text-[14px] bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
                          Price on Visit
                        </span>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-blue-900 leading-none">₹{providerService.price.toLocaleString("en-IN")}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                            {providerService.priceType === "hourly" ? "Per Hour" : "Fixed Price"}
                          </span>
                        </div>
                      )}
                    </div>

                    {providerService.experience > 0 && (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:block"></div>
                        <span className="text-xs text-gray-500 flex items-center gap-1.5 font-bold uppercase tracking-wide">
                          <Briefcase className="w-4 h-4 text-gray-400" /> {providerService.experience} yrs exp
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => onBookService(providerService)}
                    className="bg-gray-900 hover:bg-blue-600 text-white 
                                                 px-7 py-2.5 rounded-xl font-bold transition-all duration-300 active:scale-95 shadow-md shadow-gray-900/10 hover:shadow-blue-600/20 text-sm whitespace-nowrap"
                    disabled={!provider.isAvailable}
                  >
                    {!provider.isAvailable ? "Unavailable" : "Book Service"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500 font-semibold text-lg">No services listed yet</p>
          <p className="text-sm text-gray-400 mt-1">This provider hasn't added any specific services.</p>
        </div>
      )}
    </div>
  );
}
