import { ArrowLeft, Briefcase, Clock, MapPin, ShieldCheck } from "lucide-react";

export default function ProviderDetailsHeader({ provider, navigate }) {
  return (
    <div className="bg-(--color-primary) text-white py-12 px-4 shadow-sm relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 2px, transparent 2px)", backgroundSize: "30px 30px" }}
      ></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/90 hover:text-white mb-6 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl shadow-lg border-4 border-white/20 overflow-hidden shrink-0">
            {provider.profileImage ? (
              <img src={provider.profileImage} alt={provider.businessName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-(--color-primary) font-black text-5xl">
                {provider.businessName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{provider.businessName}</h1>
              {provider.isApproved && (
                <div className="bg-green-500 text-white p-1 rounded-full shadow-sm" title="Verified Provider">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <p className="text-white/90 mb-4 max-w-2xl leading-relaxed text-sm md:text-base">
              {provider.description || "Top-rated service provider specialized in delivering quality work."}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MapPin className="w-4 h-4" /> {provider.city} ({provider.serviceRadius}km radius)
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Briefcase className="w-4 h-4" /> {provider.experience}+ Years Exp.
              </div>
              {!provider.isAvailable && (
                <div className="flex items-center gap-1.5 bg-amber-500/90 text-white px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                  <Clock className="w-4 h-4" /> Currently Away
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
