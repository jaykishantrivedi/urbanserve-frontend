const Dropdown = ({ items, onSelect, visible, renderItem }) => {
  if (!visible || !items.length) return null

  return (
    <ul className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
      {items.map((item, index) => (
        <li
          key={index}
          onMouseDown={(event) => {
            event.preventDefault()
            onSelect(item)
          }}
          className="px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150"
        >
          {renderItem ? renderItem(item) : item}
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
