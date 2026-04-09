import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    useGetAdminServiceByIdQuery,
    useGetAdminServiceCategoriesQuery,
    useAdminUpdateServiceMutation,
} from "../../redux/adminDashboardApi"
import { toast } from "react-toastify"
import { EditServiceActionsBar } from "./editService/EditServiceActionsBar"
import { EditServiceBasicInfoSection } from "./editService/EditServiceBasicInfoSection"
import { EditServiceCategorySection } from "./editService/EditServiceCategorySection"
import { EditServiceErrorState } from "./editService/EditServiceErrorState"
import { EditServiceLoadingState } from "./editService/EditServiceLoadingState"
import { EditServicePageHeader } from "./editService/EditServicePageHeader"
import { EditServiceStatusSection } from "./editService/EditServiceStatusSection"

// ── Shared input styles ────────────────────────────────────────────────
const inputClass = (hasErr) =>
    `w-full px-4 py-2.5 text-sm border ${
        hasErr ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-400 transition-colors`

// ── Main page ──────────────────────────────────────────────────────────
export function AdminEditServicePage() {
    const { serviceId } = useParams()
    const navigate      = useNavigate()

    const [formData, setFormData]   = useState(null)   // null until loaded
    const [errors, setErrors]       = useState({})
    const [submitting, setSubmitting] = useState(false)

    // Fetch existing service data
    const { data: svcData, isLoading: svcLoading, isError } = useGetAdminServiceByIdQuery(serviceId)

    // Fetch categories
    const { data: catData, isLoading: catsLoading } = useGetAdminServiceCategoriesQuery()
    const categories = catData?.categories || []

    const [adminUpdateService] = useAdminUpdateServiceMutation()

    // Populate form once service data arrives
    useEffect(() => {
        if (svcData?.service) {
            const s = svcData.service
            setFormData({
                serviceName: s.serviceName  || "",
                description: s.description  || "",
                category:    s.category?._id || "",
                isActive:    s.isActive ?? true,
            })
        }
    }, [svcData])

    // ── Handlers ──────────────────────────────────────────────────────
    const handle = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
    }

    // ── Validate ──────────────────────────────────────────────────────
    const validate = () => {
        const e = {}
        if (!formData.serviceName.trim()) e.serviceName = "Service name is required"
        if (!formData.category)           e.category    = "Please select a category"
        if (!formData.description.trim()) e.description = "Description is required"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    // ── Submit ────────────────────────────────────────────────────────
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if (!validate()) return

        setSubmitting(true)
        try {
            const res = await adminUpdateService({
                serviceId,
                serviceName: formData.serviceName.trim(),
                description: formData.description.trim(),
                category:    formData.category,
                isActive:    formData.isActive,
            }).unwrap()
            toast.success(res.message || "Service updated successfully")
            navigate("/admin/services")
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update service. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const handleCancel = () => {
        if (!confirm("Discard changes and go back?")) return
        navigate("/admin/services")
    }

    // ── Loading state ─────────────────────────────────────────────────
    if (svcLoading) return <EditServiceLoadingState />

    // ── Error / not found ─────────────────────────────────────────────
    if (isError || !svcData?.service) return <EditServiceErrorState onBack={() => navigate("/admin/services")} />

    // Wait until form is seeded
    if (!formData) return null

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-3xl">
            <EditServicePageHeader
                serviceName={svcData.service.serviceName}
                onBack={() => navigate("/admin/services")}
                onGoToServices={() => navigate("/admin/services")}
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                <EditServiceBasicInfoSection
                    formData={formData}
                    errors={errors}
                    slug={svcData.service.slug}
                    onChange={handle}
                    inputClass={inputClass}
                />

                <EditServiceCategorySection
                    formData={formData}
                    errors={errors}
                    categories={categories}
                    catsLoading={catsLoading}
                    onChange={handle}
                    inputClass={inputClass}
                />

                <EditServiceStatusSection
                    isActive={formData.isActive}
                    onToggle={(val) => setFormData((prev) => ({ ...prev, isActive: val }))}
                />

                <EditServiceActionsBar
                    submitting={submitting}
                    onCancel={handleCancel}
                />
            </form>
        </div>
    )
}
