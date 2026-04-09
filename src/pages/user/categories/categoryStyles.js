import {
  Wrench,
  Zap,
  Sparkles,
  Wind,
  Hammer,
  Paintbrush,
  Leaf,
  Bug,
  Droplets,
  Flame,
  Shield,
  Truck,
  Home,
  Scissors,
} from "lucide-react"

const categoryStyleMap = {
  plumbing: { icon: Droplets, gradient: "from-blue-500 to-blue-600", light: "bg-blue-50", text: "text-blue-600", border: "hover:border-blue-300" },
  electrical: {
    icon: Zap,
    gradient: "from-yellow-400 to-orange-500",
    light: "bg-yellow-50",
    text: "text-yellow-600",
    border: "hover:border-yellow-300",
  },
  cleaning: {
    icon: Sparkles,
    gradient: "from-purple-500 to-purple-600",
    light: "bg-purple-50",
    text: "text-purple-600",
    border: "hover:border-purple-300",
  },
  "ac & appliance": {
    icon: Wind,
    gradient: "from-cyan-500 to-cyan-600",
    light: "bg-cyan-50",
    text: "text-cyan-600",
    border: "hover:border-cyan-300",
  },
  carpentry: {
    icon: Hammer,
    gradient: "from-orange-500 to-orange-600",
    light: "bg-orange-50",
    text: "text-orange-600",
    border: "hover:border-orange-300",
  },
  painting: {
    icon: Paintbrush,
    gradient: "from-pink-500 to-pink-600",
    light: "bg-pink-50",
    text: "text-pink-600",
    border: "hover:border-pink-300",
  },
  gardening: {
    icon: Leaf,
    gradient: "from-green-500 to-green-600",
    light: "bg-green-50",
    text: "text-green-600",
    border: "hover:border-green-300",
  },
  "pest control": {
    icon: Bug,
    gradient: "from-red-500 to-red-600",
    light: "bg-red-50",
    text: "text-red-600",
    border: "hover:border-red-300",
  },
  gas: {
    icon: Flame,
    gradient: "from-orange-400 to-red-500",
    light: "bg-orange-50",
    text: "text-orange-600",
    border: "hover:border-orange-300",
  },
  security: {
    icon: Shield,
    gradient: "from-slate-500 to-slate-700",
    light: "bg-slate-50",
    text: "text-slate-600",
    border: "hover:border-slate-300",
  },
  moving: {
    icon: Truck,
    gradient: "from-indigo-500 to-indigo-600",
    light: "bg-indigo-50",
    text: "text-indigo-600",
    border: "hover:border-indigo-300",
  },
  "home repair": {
    icon: Home,
    gradient: "from-teal-500 to-teal-600",
    light: "bg-teal-50",
    text: "text-teal-600",
    border: "hover:border-teal-300",
  },
  salon: {
    icon: Scissors,
    gradient: "from-rose-500 to-rose-600",
    light: "bg-rose-50",
    text: "text-rose-600",
    border: "hover:border-rose-300",
  },
  health: {
    icon: Sparkles,
    gradient: "from-emerald-500 to-green-600",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    border: "hover:border-emerald-300",
  },
  welding: {
    icon: Wrench,
    gradient: "from-gray-500 to-gray-700",
    light: "bg-gray-50",
    text: "text-gray-600",
    border: "hover:border-gray-300",
  },
}

const defaultStyle = {
  icon: Wrench,
  gradient: "from-gray-500 to-gray-600",
  light: "bg-gray-50",
  text: "text-gray-600",
  border: "hover:border-gray-300",
}

export function getCategoryStyle(categoryName) {
  const key = categoryName?.toLowerCase().trim()
  if (categoryStyleMap[key]) return categoryStyleMap[key]

  const partialKey = Object.keys(categoryStyleMap).find((k) => key.includes(k) || k.includes(key))
  return partialKey ? categoryStyleMap[partialKey] : defaultStyle
}
