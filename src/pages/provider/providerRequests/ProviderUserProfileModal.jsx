import { Mail, Phone, User, X } from 'lucide-react';

export default function ProviderUserProfileModal({ viewingUser, onClose }) {
  if (!viewingUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm relative z-10 overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 pt-8 pb-14 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/70 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
          <p className="text-indigo-100 text-xs font-semibold uppercase tracking-widest mb-3">Customer Profile</p>
        </div>

        <div className="flex justify-center -mt-10 mb-3 relative z-10">
          {viewingUser.pfpUrl ? (
            <img
              src={viewingUser.pfpUrl}
              alt={viewingUser.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-indigo-100 border-4 border-white shadow-lg flex items-center justify-center">
              <User size={32} className="text-indigo-400" />
            </div>
          )}
        </div>

        <div className="px-6 pb-7 text-center">
          <h2 className="text-xl font-extrabold text-gray-900">{viewingUser.name}</h2>

          <div className="mt-5 space-y-3 text-left">
            {viewingUser.email && (
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={15} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email</p>
                  <p className="text-sm font-semibold text-gray-800 break-all">{viewingUser.email}</p>
                </div>
              </div>
            )}

            {viewingUser.phone ? (
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Phone</p>
                  <p className="text-sm font-semibold text-gray-800">{viewingUser.phone}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 opacity-50">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Phone</p>
                  <p className="text-sm text-gray-400 italic">Not provided</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-2.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
