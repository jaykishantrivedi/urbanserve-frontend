import { Clock } from "lucide-react";

export default function IntegrationsSection({ integrations }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Clock className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
          <p className="text-sm text-gray-500">View active backend service bridges</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 ${integration.iconBgColor} rounded-lg`}>
                  <integration.icon className={`w-5 h-5 ${integration.iconColor}`} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{integration.name}</h4>
                  <p className="text-sm text-gray-600 mt-0.5">{integration.provider}</p>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  integration.status === "Optional"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {integration.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <span className="font-semibold">Note:</span> Integration keys and webhooks are secured internally via
          .env injection strings. Modifying active providers requires an application redeploy.
        </p>
      </div>
    </div>
  );
}
