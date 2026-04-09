import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useAdminCreateServiceMutation,
  useGetAdminServiceCategoriesQuery,
} from "../../../redux/adminDashboardApi"

export function useAdminAddServiceController() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    serviceName: "",
    slug: "",
    slugManuallyEdited: false,
    description: "",
    category: "",
    isActive: true,
  })
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const { data: catData, isLoading: catsLoading } = useGetAdminServiceCategoriesQuery()
  const categories = catData?.categories || []

  const [adminCreateService] = useAdminCreateServiceMutation()

  useEffect(() => {
    if (!formData.slugManuallyEdited) {
      const slug = formData.serviceName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.serviceName, formData.slugManuallyEdited])

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSlugChange = (event) => {
    setFormData((prev) => ({ ...prev, slug: event.target.value, slugManuallyEdited: true }))
    if (errors.slug) setErrors((prev) => ({ ...prev, slug: "" }))
  }

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files || [])
    const items = files.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...items])
    event.target.value = ""
  }

  const handleRemoveImage = (id) => {
    setImages((prev) => {
      const img = prev.find((item) => item.id === id)
      if (img) URL.revokeObjectURL(img.preview)
      return prev.filter((item) => item.id !== id)
    })
  }

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview))
    }
  }, [images])

  const validate = () => {
    const e = {}
    if (!formData.serviceName.trim()) e.serviceName = "Service name is required"
    if (!formData.slug.trim()) e.slug = "Slug is required"
    if (!formData.category) e.category = "Please select a category"
    if (!formData.description.trim()) e.description = "Description is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append("serviceName", formData.serviceName.trim())
      fd.append("description", formData.description.trim())
      fd.append("category", formData.category)
      fd.append("isActive", formData.isActive)
      images.forEach((img) => fd.append("image", img.file))

      const res = await adminCreateService(fd).unwrap()
      toast.success(res.message || "Service created successfully")
      navigate("/admin/services")
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create service. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    const dirty = formData.serviceName || formData.description || formData.category || images.length > 0
    if (dirty && !window.confirm("Discard changes and go back?")) return
    navigate("/admin/services")
  }

  return {
    categories,
    catsLoading,
    formData,
    setFormData,
    images,
    errors,
    submitting,
    handleFieldChange,
    handleSlugChange,
    handleImagesChange,
    handleRemoveImage,
    handleSubmit,
    handleCancel,
    navigate,
  }
}
