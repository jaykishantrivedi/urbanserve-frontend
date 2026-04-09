export const inputClass = (hasErr) =>
  `w-full px-4 py-2.5 text-sm border ${
    hasErr ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-400 transition-colors`;
