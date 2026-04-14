import React, { useState } from 'react'
import { uploadToCloudinary } from '../../utils/cloudinary'
import { useCreateProviderProfileMutation } from '../../redux/providerApi'
import BecomeProviderSubmittedState from './becomeProvider/BecomeProviderSubmittedState'
import BecomeProviderProgressBar from './becomeProvider/BecomeProviderProgressBar'
import BecomeProviderStepActions from './becomeProvider/BecomeProviderStepActions'
import BecomeProviderStepBasicInfo from './becomeProvider/BecomeProviderStepBasicInfo'
import BecomeProviderStepLocation from './becomeProvider/BecomeProviderStepLocation'
import BecomeProviderStepAvailability from './becomeProvider/BecomeProviderStepAvailability'
import BecomeProviderStepDocumentsReview from './becomeProvider/BecomeProviderStepDocumentsReview'

export default function BecomeProviderPage() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const [createProviderProfile, { isLoading: isSubmitting }] = useCreateProviderProfileMutation()

  const [formData, setFormData] = useState({
    businessName: '',
    experienceYears: '',
    serviceRadius: 10,
    profilePicture: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    availability: {
      Mon: { open: true, start: '09:00', end: '18:00' },
      Tue: { open: true, start: '09:00', end: '18:00' },
      Wed: { open: true, start: '09:00', end: '18:00' },
      Thu: { open: true, start: '09:00', end: '18:00' },
      Fri: { open: true, start: '09:00', end: '18:00' },
      Sat: { open: true, start: '09:00', end: '18:00' },
      Sun: { open: false, start: '09:00', end: '18:00' },
    },
    documents: [],
    gallery: [],
    agreedToTerms: false
  })

  // Local state for add document/gallery inputs
  const [docInput, setDocInput] = useState('')
  const [galleryInput, setGalleryInput] = useState('')

  const [isUploadingProfile, setIsUploadingProfile] = useState(false)
  const [isUploadingDoc, setIsUploadingDoc] = useState(false)
  const [isUploadingGallery, setIsUploadingGallery] = useState(false)

  const handleProfileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingProfile(true);
    try {
      const url = await uploadToCloudinary(file, "LocalEase/Profiles");
      setFormData({...formData, profilePicture: url});
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploadingProfile(false);
    }
  }

  const handleDocUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingDoc(true);
    try {
      const url = await uploadToCloudinary(file, "LocalEase/Documents");
      handleAddItem('documents', url, setDocInput);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploadingDoc(false);
    }
  }

  const handleGalleryUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingGallery(true);
    try {
      const url = await uploadToCloudinary(file, "LocalEase/Gallery");
      handleAddItem('gallery', url, setGalleryInput);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploadingGallery(false);
    }
  }

  const handleNext = () => {
    let errors = {}
    if (step === 1) {
      if (!formData.businessName) errors.businessName = "Business Name is required."
    } else if (step === 2) {
      if (!formData.city.trim()) errors.city = "City is required."
      if (!formData.address.trim()) errors.address = "Address is required."
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    setStep((prev) => prev + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.documents.length === 0) {
      setFormErrors({ documents: "Please add at least one document (ID proof or certificate)." })
      return
    }

    const payload = {
      businessName: formData.businessName,
      experience: formData.experienceYears ? Number(formData.experienceYears) : 0,
      city: formData.city,
      address: formData.address,
      profileImage: formData.profilePicture,
      description: "Service Provider Profile",
      serviceRadius: formData.serviceRadius,
      latitude: formData.latitude,
      longitude: formData.longitude,
      documents: formData.documents,
      gallery: formData.gallery,
      availability: formData.availability
    }

    try {
      await createProviderProfile(payload).unwrap();
      setIsSubmitted(true);
    } catch (err) {
      alert(err.data?.message || err.error || "Failed to submit provider application");
    }
  }

  const handleAddItem = (field, value, setValue) => {
    if (!value) return
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value]
    }))
    setValue('')
  }

  const handleRemoveItem = (field, index) => {
    setFormData(prev => {
      const copy = [...prev[field]]
      copy.splice(index, 1)
      return { ...prev, [field]: copy }
    })
  }

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          open: !prev.availability[day].open
        }
      }
    }))
  }

  const updateTime = (day, field, val) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: val
        }
      }
    }))
  }

  const steps = [
    "Basic Info",
    "Location",
    "Availability",
    "Documents & Review"
  ]

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  if (isSubmitted) {
    return <BecomeProviderSubmittedState />
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 pb-20">
      <BecomeProviderProgressBar steps={steps} step={step} />

      <div className="max-w-[680px] mx-auto mt-10 px-4">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 border border-gray-100">
          {step === 1 && (
            <BecomeProviderStepBasicInfo
              formData={formData}
              formErrors={formErrors}
              isUploadingProfile={isUploadingProfile}
              onFieldChange={handleFieldChange}
              onProfileUpload={handleProfileUpload}
            />
          )}

          {step === 2 && (
            <BecomeProviderStepLocation
              formData={formData}
              formErrors={formErrors}
              onFieldChange={handleFieldChange}
            />
          )}

          {step === 3 && (
            <BecomeProviderStepAvailability
              availability={formData.availability}
              toggleDay={toggleDay}
              updateTime={updateTime}
            />
          )}

          {step === 4 && (
            <BecomeProviderStepDocumentsReview
              formData={formData}
              formErrors={formErrors}
              docInput={docInput}
              onDocInputChange={setDocInput}
              onAddDocumentUrl={() => handleAddItem('documents', docInput, setDocInput)}
              galleryInput={galleryInput}
              onGalleryInputChange={setGalleryInput}
              onAddGalleryUrl={() => handleAddItem('gallery', galleryInput, setGalleryInput)}
              onRemoveItem={handleRemoveItem}
              isUploadingDoc={isUploadingDoc}
              onDocUpload={handleDocUpload}
              isUploadingGallery={isUploadingGallery}
              onGalleryUpload={handleGalleryUpload}
              onAgreedChange={(checked) => handleFieldChange('agreedToTerms', checked)}
            />
          )}

          <BecomeProviderStepActions
            step={step}
            totalSteps={steps.length}
            agreedToTerms={formData.agreedToTerms}
            isSubmitting={isSubmitting}
            onBack={() => setStep((prev) => prev - 1)}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />

        </div>
      </div>
    </div>
  )
}
