export default function Loading() {
  return (
    <div className="container flex items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-r-transparent" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
