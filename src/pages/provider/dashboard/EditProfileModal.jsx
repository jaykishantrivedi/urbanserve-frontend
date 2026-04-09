import { useEffect, useRef, useState } from 'react';
import { useUpdateProviderProfileMutation } from '../../../redux/providerApi';
import { uploadToCloudinary } from '../../../utils/cloudinary';

export default function EditProfileModal({ profile, onClose, onSaved }) {
  const [updateProviderProfile, { isLoading: isSaving }] = useUpdateProviderProfileMutation();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    businessName: profile.businessName || '',
    description: profile.description || '',
    experience: String(profile.experience ?? ''),
    city: profile.city || '',
    address: profile.address || '',
    profileImage: profile.profileImage || '',
    serviceRadius: String(profile.serviceRadius ?? '10'),
    isAvailable: profile.isAvailable !== undefined ? Boolean(profile.isAvailable) : true,
  });

  const [uploadState, setUploadState] = useState({
    isUploading: false,
    progress: 0,
    previewUrl: profile.profileImage || '',
    error: '',
  });

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!uploadState.isUploading) {
      setUploadState((state) => ({ ...state, previewUrl: form.profileImage }));
    }
  }, [form.profileImage, uploadState.isUploading]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [name]: value }));
    setFormError('');
    setFormSuccess('');
  };

  const handleToggle = (name) => {
    setForm((state) => ({ ...state, [name]: !state[name] }));
    setFormError('');
    setFormSuccess('');
  };

  const handleFileSelected = async (file) => {
    if (!file) return;

    setFormError('');
    setUploadState({
      isUploading: true,
      progress: 0,
      previewUrl: uploadState.previewUrl,
      error: '',
    });

    const localUrl = URL.createObjectURL(file);
    setUploadState((state) => ({ ...state, previewUrl: localUrl }));

    try {
      const url = await uploadToCloudinary(file, 'LocalEase/Profiles', (progress) => {
        setUploadState((state) => ({ ...state, progress }));
      });
      setForm((state) => ({ ...state, profileImage: url }));
      setUploadState({ isUploading: false, progress: 100, previewUrl: url, error: '' });
    } catch (error) {
      setUploadState({
        isUploading: false,
        progress: 0,
        previewUrl: profile.profileImage || '',
        error: error.message,
      });
      setForm((state) => ({ ...state, profileImage: profile.profileImage || '' }));
    }
  };

  const handleFileInput = (event) => handleFileSelected(event.target.files?.[0]);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileSelected(event.dataTransfer.files?.[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.businessName.trim()) {
      setFormError('Business name is required.');
      return;
    }

    if (!form.city.trim()) {
      setFormError('City is required.');
      return;
    }

    if (uploadState.isUploading) {
      setFormError('Please wait for the photo to finish uploading.');
      return;
    }

    try {
      await updateProviderProfile({
        businessName: form.businessName,
        description: form.description,
        experience: Number(form.experience) || 0,
        city: form.city,
        address: form.address,
        profileImage: form.profileImage,
        serviceRadius: Number(form.serviceRadius) || 10,
        isAvailable: form.isAvailable,
      }).unwrap();

      await onSaved();
      setFormSuccess('Profile updated successfully!');
      setTimeout(onClose, 1200);
    } catch (error) {
      setFormError(error?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (uploadState.progress / 100) * circumference;

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={handleBackdrop}
    >
      <div
        className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in-up"
        style={{
          background: 'var(--color-surface, #fff)',
          animationDuration: '0.22s',
          border: '1px solid var(--color-border)',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="relative px-7 pt-7 pb-6 rounded-t-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #6d28d9 100%)' }}
        >
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-8 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
          />

          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Edit Business Profile</h2>
              <p className="text-white/70 text-sm mt-0.5">Update your provider information</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-6">
          <div className="flex flex-col items-center">
            <div
              className={`relative w-28 h-28 rounded-full cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'ring-4 ring-offset-2 ring-[var(--color-primary)] scale-105'
                  : 'hover:scale-105'
              }`}
              onClick={() => !uploadState.isUploading && fileInputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <img
                src={uploadState.previewUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                alt="Profile preview"
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
              />

              {uploadState.isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                  <svg className="w-16 h-16" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      fill="none"
                      stroke="white"
                      strokeWidth="5"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.3s' }}
                    />
                    <text x="40" y="45" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                      {uploadState.progress}%
                    </text>
                  </svg>
                </div>
              )}

              {!uploadState.isUploading && (
                <div
                  className="absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), #6d28d9)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileInput}
              disabled={uploadState.isUploading}
            />

            <p className="mt-3 text-xs text-[var(--color-muted)] text-center">
              {uploadState.isUploading
                ? `Uploading… ${uploadState.progress}%`
                : 'Click or drag a photo · JPG, PNG, WebP · max 5 MB'}
            </p>

            {uploadState.error && <p className="mt-1.5 text-xs text-red-500 font-medium text-center">{uploadState.error}</p>}

            {!uploadState.isUploading && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-xs font-semibold text-[var(--color-primary)] hover:underline"
              >
                Change Photo
              </button>
            )}
          </div>

          <div className="relative flex items-center">
            <div className="flex-1 border-t border-[var(--color-border)]" />
            <span className="mx-3 text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">Business Info</span>
            <div className="flex-1 border-t border-[var(--color-border)]" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="edit-businessName" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
              Business Name <span className="text-[var(--color-danger)] font-black">*</span>
            </label>
            <input
              id="edit-businessName"
              name="businessName"
              type="text"
              required
              value={form.businessName}
              onChange={handleChange}
              placeholder="e.g. Sharma Electricals"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-sm placeholder:text-[var(--color-placeholder)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="edit-description" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Tell customers what makes your business special…"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-sm placeholder:text-[var(--color-placeholder)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all resize-none leading-relaxed"
            />
            <p className="text-right text-xs text-[var(--color-muted)]">{form.description.length} chars</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="edit-experience" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Years of Experience
              </label>
              <div className="relative">
                <input
                  id="edit-experience"
                  name="experience"
                  type="number"
                  min="0"
                  max="60"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="w-full px-3.5 py-2.5 pr-14 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-sm placeholder:text-[var(--color-placeholder)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-muted)] pointer-events-none">yrs</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="edit-city" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                City <span className="text-[var(--color-danger)] font-black">*</span>
              </label>
              <input
                id="edit-city"
                name="city"
                type="text"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-sm placeholder:text-[var(--color-placeholder)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="edit-serviceRadius" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Service Radius
            </label>
            <div className="relative">
              <input
                id="edit-serviceRadius"
                name="serviceRadius"
                type="number"
                min="1"
                max="200"
                value={form.serviceRadius}
                onChange={handleChange}
                placeholder="10"
                className="w-full px-3.5 py-2.5 pr-12 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-sm placeholder:text-[var(--color-placeholder)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-muted)] pointer-events-none">km</span>
            </div>
            <p className="text-xs text-[var(--color-muted)]">How far you're willing to travel for a booking.</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="edit-address" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Address
            </label>
            <input
              id="edit-address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, area, landmark…"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)] text-sm placeholder:text-[var(--color-placeholder)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
            />
          </div>

          <div className="relative flex items-center">
            <div className="flex-1 border-t border-[var(--color-border)]" />
            <span className="mx-3 text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">Availability Settings</span>
            <div className="flex-1 border-t border-[var(--color-border)]" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] transition-colors hover:border-[var(--color-primary)]/40">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${form.isAvailable ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]">Availability Status</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">
                  {form.isAvailable ? 'You are visible and accepting requests' : 'You are hidden from new booking requests'}
                </p>
              </div>
            </div>
            <button
              type="button"
              id="toggle-isAvailable"
              onClick={() => handleToggle('isAvailable')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] ${
                form.isAvailable ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label="Toggle availability"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${form.isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {formError && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 animate-fade-in">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
                <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">{formError}</p>
            </div>
          )}

          {formSuccess && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 animate-fade-in">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">{formSuccess}</p>
            </div>
          )}

          <div className="flex gap-3 pt-1 pb-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-[var(--color-border)] text-[var(--color-muted)] font-semibold text-sm hover:bg-[var(--color-background-light)] hover:text-[var(--color-foreground)] transition-all disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || uploadState.isUploading}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #6d28d9 100%)' }}
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving…
                </>
              ) : uploadState.isUploading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Uploading Photo…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
