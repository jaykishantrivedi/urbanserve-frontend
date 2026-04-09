export default function SearchResultsDropdown({ items, onSelect, visible, renderItem }) {
  if (!visible || !items.length) return null

  return (
    <ul className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
      {items.map((item, i) => (
        <li
          key={i}
          onMouseDown={(e) => {
            e.preventDefault()
            onSelect(item)
          }}
          className="px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
        >
          {renderItem ? renderItem(item) : item}
        </li>
      ))}
    </ul>
  )
}
