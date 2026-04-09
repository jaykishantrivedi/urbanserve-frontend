import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAdminCreateCategoryMutation } from "../../redux/adminDashboardApi"
import { AddCategoryActionsBar } from "./addCategory/AddCategoryActionsBar"
import { AddCategoryBasicInfoSection } from "./addCategory/AddCategoryBasicInfoSection"
import { AddCategoryImageSection } from "./addCategory/AddCategoryImageSection"
import { AddCategoryPageHeader } from "./addCategory/AddCategoryPageHeader"
import { AddCategoryStatusSection } from "./addCategory/AddCategoryStatusSection"

// ── Shared styles ───────────────────────────────────────────────────────
const inputClass = (hasErr) =>
    `w-full px-4 py-2.5 text-sm border ${
        hasErr ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors`

// ── Main Page ──────────────────────────────────────────────────────────
export function AdminAddCategoryPage() {
    const navigate = useNavigate()

    const [adminCreateCategory, { isLoading }] = useAdminCreateCategoryMutation()

    const [formData, setFormData] = useState({
        categoryName: "",
        slug: "",
        description: "",
        isActive: true,
    })
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
    const [categoryImage, setCategoryImage]           = useState(null)
    const [errors, setErrors]                         = useState({})

    // Auto-generate slug
    useEffect(() => {
        if (formData.categoryName && !slugManuallyEdited) {
            const generatedSlug = formData.categoryName
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim()
            setFormData(prev => ({ ...prev, slug: generatedSlug }))
        }
    }, [formData.categoryName, slugManuallyEdited])

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (categoryImage?.preview) URL.revokeObjectURL(categoryImage.preview)
        }
    }, [categoryImage])

    // Handlers
    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const handleSlugChange = (e) => {
        setFormData(prev => ({ ...prev, slug: e.target.value }))
        setSlugManuallyEdited(true)
        if (errors.slug) setErrors(prev => ({ ...prev, slug: "" }))
    }

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image must be smaller than 2MB")
                return
            }
            if (categoryImage?.preview) URL.revokeObjectURL(categoryImage.preview)
            setCategoryImage({ file, preview: URL.createObjectURL(file) })
        }
    }

    const removeImage = () => {
        if (categoryImage?.preview) URL.revokeObjectURL(categoryImage.preview)
        setCategoryImage(null)
    }

    const validateForm = () => {
        const e = {}
        if (!formData.categoryName.trim()) e.categoryName = "Category name is required"
        if (!formData.slug.trim())         e.slug         = "Slug is required"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        const fd = new FormData()
        fd.append("categoryName", formData.categoryName.trim())
        fd.append("slug", formData.slug.trim())
        fd.append("description", formData.description.trim())
        fd.append("isActive", String(formData.isActive))
        if (categoryImage?.file) fd.append("image", categoryImage.file)

        try {
            const res = await adminCreateCategory(fd).unwrap()
            toast.success(res.message || "Category created successfully")
            navigate("/admin/categories")
        } catch (err) {
            toast.error(err?.data?.message || "Failed to create category. Please try again.")
        }
    }

    const handleCancel = () => {
        if (formData.categoryName || formData.description || categoryImage) {
            if (!confirm("Discard changes and go back?")) return
        }
        navigate("/admin/categories")
    }

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-3xl">
            <AddCategoryPageHeader
                onBack={() => navigate("/admin/categories")}
                onGoToCategories={() => navigate("/admin/categories")}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <AddCategoryBasicInfoSection
                    formData={formData}
                    errors={errors}
                    slugManuallyEdited={slugManuallyEdited}
                    onInput={handleInput}
                    onSlugChange={handleSlugChange}
                    inputClass={inputClass}
                />

                <AddCategoryImageSection
                    categoryImage={categoryImage}
                    onImageUpload={handleImageUpload}
                    onRemoveImage={removeImage}
                />

                <AddCategoryStatusSection
                    isActive={formData.isActive}
                    onToggle={(v) => setFormData((p) => ({ ...p, isActive: v }))}
                />

                <AddCategoryActionsBar
                    isSubmitting={isLoading}
                    onCancel={handleCancel}
                />

            </form>
        </div>
    )
}
