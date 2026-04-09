export default function BecomeProviderStepAvailability({ availability, toggleDay, updateTime }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Set your working hours</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">Customers will only be matched with you during your available hours.</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
        {Object.keys(availability).map((day) => {
          const data = availability[day]

          return (
            <div
              key={day}
              className={`flex items-center p-4 sm:px-6 border-b border-gray-100 last:border-0 transition-colors ${
                !data.open ? "bg-gray-50/50" : "bg-white hover:bg-gray-50/30"
              }`}
            >
              <span className={`w-14 font-extrabold text-sm ${data.open ? "text-gray-900" : "text-gray-400"}`}>{day}</span>

              <label className="relative inline-flex items-center cursor-pointer mr-6 shrink-0">
                <input type="checkbox" checked={data.open} onChange={() => toggleDay(day)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500 transition-colors"></div>
              </label>

              {data.open ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={data.start}
                    onChange={(e) => updateTime(day, "start", e.target.value)}
                    className="w-full sm:w-32 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-3 py-1.5 text-sm font-semibold outline-none transition-all shadow-sm"
                  />
                  <span className="text-gray-400 text-sm font-bold">to</span>
                  <input
                    type="time"
                    value={data.end}
                    onChange={(e) => updateTime(day, "end", e.target.value)}
                    className="w-full sm:w-32 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 px-3 py-1.5 text-sm font-semibold outline-none transition-all shadow-sm"
                  />
                </div>
              ) : (
                <span className="text-sm text-gray-400 font-bold tracking-wide uppercase">Day off</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
