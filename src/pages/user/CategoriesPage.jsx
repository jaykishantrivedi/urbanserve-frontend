import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetAllCategoriesQuery } from '../../redux/categoryApi'
import CategoriesHeader from './categories/CategoriesHeader'
import CategoriesGridSection from './categories/CategoriesGridSection'

//  CategoriesPage 
const CategoriesPage = () => {
  const navigate     = useNavigate()
  const selectedCity = useSelector((state) => state.city.selectedCity)

  const [query, setQuery] = useState('')

  const { data, isLoading, isError } = useGetAllCategoriesQuery()

  const allCategories = data?.categories || []

  const filtered = useMemo(() => {
    if (!query.trim()) return allCategories
    const q = query.toLowerCase().trim()
    return allCategories.filter(cat =>
      cat.categoryName.toLowerCase().includes(q) ||
      cat.description?.toLowerCase().includes(q)
    )
  }, [allCategories, query])

  return (
    <div className="min-h-screen bg-gray-50/50">
      <CategoriesHeader
        navigate={navigate}
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
        isError={isError}
        allCategoriesLength={allCategories.length}
        filteredLength={filtered.length}
      />

      <CategoriesGridSection
        isError={isError}
        isLoading={isLoading}
        filtered={filtered}
        query={query}
        setQuery={setQuery}
        onCategoryClick={(category) => navigate(`/${selectedCity}/${category.slug}`)}
      />

    </div>
  )
}

export default CategoriesPage