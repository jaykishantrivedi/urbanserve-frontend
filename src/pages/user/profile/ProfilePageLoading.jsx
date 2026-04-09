export default function ProfilePageLoading() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-xl mb-8 w-1/3"></div>
            <div className="h-48 bg-gray-200 rounded-xl mb-8"></div>
            <div className="grid grid-cols-3 gap-6">
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="col-span-2 h-96 bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    )
}
