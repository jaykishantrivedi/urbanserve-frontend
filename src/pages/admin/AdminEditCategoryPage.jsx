import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {
    useGetAdminCategoryByIdQuery,
    useAdminUpdateCategoryMutation
} from "../../redux/adminDashboardApi"
import { EditCategoryActionsBar } from "./editCategory/EditCategoryActionsBar"
import { EditCategoryBasicInfoSection } from "./editCategory/EditCategoryBasicInfoSection"
import { EditCategoryErrorState } from "./editCategory/EditCategoryErrorState"
import { EditCategoryImageSection } from "./editCategory/EditCategoryImageSection"
import { EditCategoryLoadingState } from "./editCategory/EditCategoryLoadingState"
import { EditCategoryPageHeader } from "./editCategory/EditCategoryPageHeader"
import { EditCategoryStatusSection } from "./editCategory/EditCategoryStatusSection"

//  Shared styles 
const inputClass = (hasErr) =>
    `w-full px-4 py-2.5 text-sm border ${
        hasErr ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors`

//  Main Page 
export function AdminEditCategoryPage() {
    const { categoryId } = useParams()
    const navigate = useNavigate()

    const { data: catData, isLoading: catLoading, isError } = useGetAdminCategoryByIdQuery(categoryId)
    const [adminUpdateCategory, { isLoading: isSubmitting }] = useAdminUpdateCategoryMutation()

    const [formData, setFormData] = useState(null)
    const [categoryImage, setCategoryImage] = useState(null)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (catData?.category) {
            const c = catData.category
            setFormData({
                categoryName: c.categoryName || "",
                slug: c.slug || "",
                description: c.description || "",
                isActive: c.isActive ?? true,
                existingImageUrl: c.iconUrl || null
            })
        }
    }, [catData])

    useEffect(() => {
        return () => {
            if (categoryImage?.preview) URL.revokeObjectURL(categoryImage.preview)
        }
    }, [categoryImage])

    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image must be smaller than 2MB")
                return
            }
            if (categoryImage?.preview) URL.revokeObjectURL(categoryImage.preview)
            setCategoryImage({ file, preview: URL.createObjectURL(file) })
        }
    }

    const removeNewImage = () => {
        if (categoryImage?.preview) URL.revokeObjectURL(categoryImage.preview)
        setCategoryImage(null)
    }

    const validateForm = () => {
        const e = {}
        if (!formData.categoryName.trim()) e.categoryName = "Category name is required"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        const fd = new FormData()
        fd.append("categoryName", formData.categoryName.trim())
        // Cannot update slug manually here, backend updates it based on name
        fd.append("description", formData.description.trim())
        fd.append("isActive", String(formData.isActive))
        if (categoryImage?.file) fd.append("image", categoryImage.file)

        try {
            const res = await adminUpdateCategory({ categoryId, formData: fd }).unwrap()
            toast.success(res.message || "Category updated successfully")
            navigate("/admin/categories")
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update category. Please try again.")
        }
    }

    const handleCancel = () => {
        if (!confirm("Discard changes and go back?")) return
        navigate("/admin/categories")
    }

    if (catLoading) return <EditCategoryLoadingState />

    if (isError || !catData?.category) return <EditCategoryErrorState onBack={() => navigate("/admin/categories")} />

    if (!formData) return null

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-3xl">
            <EditCategoryPageHeader
                categoryName={catData.category.categoryName}
                onBack={() => navigate("/admin/categories")}
                onGoToCategories={() => navigate("/admin/categories")}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <EditCategoryBasicInfoSection
                    formData={formData}
                    errors={errors}
                    onInput={handleInput}
                    inputClass={inputClass}
                />

                <EditCategoryImageSection
                    categoryImage={categoryImage}
                    existingImageUrl={formData.existingImageUrl}
                    onImageUpload={handleImageUpload}
                    onRemoveImage={removeNewImage}
                />

                <EditCategoryStatusSection
                    isActive={formData.isActive}
                    onToggle={(v) => setFormData((p) => ({ ...p, isActive: v }))}
                />

                <EditCategoryActionsBar
                    isSubmitting={isSubmitting}
                    onCancel={handleCancel}
                />

            </form>
        </div>
    )
}
