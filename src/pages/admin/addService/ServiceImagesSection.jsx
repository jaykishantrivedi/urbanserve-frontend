import { Image as ImageIcon, Upload, X } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function ServiceImagesSection({ images, onImagesChange, onRemoveImage }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionHeader
        icon={ImageIcon}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        title="Service Images"
        subtitle="Upload images to showcase the service (optional)"
      />

      <div className="mb-4">
        <label
          htmlFor="image-upload"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          Upload Images
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={onImagesChange}
          className="hidden"
        />
        <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, WEBP · Max 5 MB per image</p>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
            >
              <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onRemoveImage(img.id)}
                className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-200 rounded-xl text-center">
          <ImageIcon className="w-10 h-10 text-gray-300 mb-2" />
          <p className="text-sm text-gray-400 font-medium">No images uploaded yet</p>
          <p className="text-xs text-gray-300 mt-0.5">Click "Upload Images" to add photos</p>
        </div>
      )}
    </div>
  );
}
