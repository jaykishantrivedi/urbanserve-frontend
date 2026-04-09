import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetCategoryBySlugQuery, } from '../../redux/categoryApi'
import { useGetServicesByCategoryQuery } from '../../redux/serviceApi'
import { getCategoryStyle } from './categories/categoryStyles'
import CategoryServicesHeader from './categoryServices/CategoryServicesHeader'
import CategoryServicesGridSection from './categoryServices/CategoryServicesGridSection'

// ── CategoryServicesPage ───────────────────────────────────────────
const CategoryServicesPage = () => {
  const { city, categorySlug } = useParams()
  const navigate               = useNavigate()
  const selectedCity           = useSelector((state) => state.city.selectedCity)

  // Use city from URL param, fall back to Redux
  const activeCity = city || selectedCity

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError
  } = useGetCategoryBySlugQuery(categorySlug)

  const {
    data: servicesData,
    isLoading: isServicesLoading,
    isError: isServicesError
  } = useGetServicesByCategoryQuery(categorySlug)

  const category      = categoryData?.category
  const services      = servicesData?.service || []
  const isLoading     = isCategoryLoading || isServicesLoading
  const isError       = isCategoryError || isServicesError
  const categoryStyle = getCategoryStyle(category?.categoryName || "")
  const { icon: Icon, gradient, text, light } = categoryStyle

  return (
    <div className="min-h-screen bg-gray-50/50">
      <CategoryServicesHeader
        navigate={navigate}
        isCategoryLoading={isCategoryLoading}
        category={category}
        categorySlug={categorySlug}
        categoryStyle={categoryStyle}
        activeCity={activeCity}
        isServicesLoading={isServicesLoading}
        isServicesError={isServicesError}
        servicesLength={services.length}
      />

      <CategoryServicesGridSection
        isError={isError}
        isLoading={isLoading}
        services={services}
        category={category}
        categorySlug={categorySlug}
        activeCity={activeCity}
        categoryStyle={categoryStyle}
        navigate={navigate}
      />

    </div>
  )
}

export default CategoryServicesPage