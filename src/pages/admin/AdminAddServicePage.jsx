import AddServiceActions from "./addService/AddServiceActions"
import AddServicePageHeader from "./addService/AddServicePageHeader"
import BasicInfoSection from "./addService/BasicInfoSection"
import CategorySelectionSection from "./addService/CategorySelectionSection"
import ServiceImagesSection from "./addService/ServiceImagesSection"
import ServiceStatusSection from "./addService/ServiceStatusSection"
import { useAdminAddServiceController } from "./addService/useAdminAddServiceController"

export function AdminAddServicePage() {
  const {
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
  } = useAdminAddServiceController()

  return (
    <div className="p-5 sm:p-6 space-y-6 max-w-3xl">
      <AddServicePageHeader onBackToServices={() => navigate("/admin/services")} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <BasicInfoSection
          formData={formData}
          errors={errors}
          onFieldChange={handleFieldChange}
          onSlugChange={handleSlugChange}
        />

        <CategorySelectionSection
          value={formData.category}
          categories={categories}
          isLoading={catsLoading}
          error={errors.category}
          onChange={handleFieldChange}
        />

        <ServiceImagesSection
          images={images}
          onImagesChange={handleImagesChange}
          onRemoveImage={handleRemoveImage}
        />

        <ServiceStatusSection
          isActive={formData.isActive}
          onToggle={(val) => setFormData((prev) => ({ ...prev, isActive: val }))}
        />

        <AddServiceActions submitting={submitting} onCancel={handleCancel} />
      </form>
    </div>
  )
}
