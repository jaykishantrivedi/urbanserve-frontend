// ── Cloudinary Direct Upload Utility ──────────────────────────────
//
// Setup in Cloudinary Dashboard:
//  1. Settings → Upload → Upload Presets → Add upload preset
//  2. Set Signing mode: "Unsigned"
//  3. Optional: Set folder, allowed formats (jpg, png, webp)
//  4. Copy preset name → VITE_CLOUDINARY_UPLOAD_PRESET
//  5. Copy cloud name  → VITE_CLOUDINARY_CLOUD_NAME
//
// .env variables needed:
//   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
//   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// ── Validate env vars on import ────────────────────────────────────
if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.warn(
    "[Cloudinary] Missing env vars.\n" +
    "Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file."
  );
}

/**
 * Upload a single File object to Cloudinary.
 *
 * @param {File}   file          - The File object to upload
 * @param {string} folder        - Cloudinary folder path (e.g. "UrbanServe/profiles")
 * @param {Function} onProgress  - Optional (0-100) progress callback
 * @returns {Promise<string>}    - Resolves with the secure_url string
 *
 * @example
 * const url = await uploadToCloudinary(file, "UrbanServe/profiles", (p) => setProgress(p));
 */
export const uploadToCloudinary = (file, folder = "UrbanServe", onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) { reject(new Error("No file provided")); return; }

    // Validate file type
    const ALLOWED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!ALLOWED.includes(file.type)) {
      reject(new Error(`File type "${file.type}" is not allowed. Use JPG, PNG, or WebP.`));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("File size exceeds 5 MB. Please compress the image."));
      return;
    }

    const formData = new FormData();
    formData.append("file",           file);
    formData.append("upload_preset",  UPLOAD_PRESET);
    formData.append("folder",         folder);

    // Use XMLHttpRequest for upload progress tracking
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data.secure_url);
        } catch {
          reject(new Error("Invalid response from Cloudinary"));
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err?.error?.message || "Cloudinary upload failed"));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener("error",  () => reject(new Error("Network error during upload")));
    xhr.addEventListener("abort",  () => reject(new Error("Upload was cancelled")));

    xhr.open("POST", UPLOAD_URL);
    xhr.send(formData);
  });
};

/**
 * Upload multiple files concurrently to Cloudinary.
 *
 * @param {File[]}   files       - Array of File objects
 * @param {string}   folder      - Cloudinary folder
 * @param {Function} onProgress  - Optional (index, 0-100) progress callback per file
 * @returns {Promise<string[]>}  - Resolves with array of secure_url strings
 */
export const uploadMultipleToCloudinary = async (files, folder = "UrbanServe", onProgress) => {
  const promises = files.map((file, i) =>
    uploadToCloudinary(file, folder, (p) => onProgress?.(i, p))
  );
  return Promise.all(promises);
};

/**
 * Get a Cloudinary transformation URL for thumbnails.
 *
 * @param {string} url    - Original Cloudinary secure_url
 * @param {number} width  - Desired width in px (default 200)
 * @param {number} height - Desired height in px (default 200)
 * @returns {string}      - Transformed URL
 */
export const getCloudinaryThumb = (url, width = 200, height = 200) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    `/upload/c_fill,w_${width},h_${height},q_auto,f_auto/`
  );
};