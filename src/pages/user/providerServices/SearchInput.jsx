const SearchInput = ({
  icon: Icon,
  value,
  onChange,
  onFocus,
  placeholder,
  dropdownContent,
}) => (
  <div className="relative">
    <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200"
    />
    {dropdownContent}
  </div>
)

export default SearchInput
