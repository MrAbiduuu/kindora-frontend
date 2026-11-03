export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        {/* Loading Spinner */}
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-[#F9E8E8] border-t-[#E83B5B]" />

          <div className="h-8 w-8 rounded-full " />
        </div>

        {/* Brand */}
        <h2 className="font-serif text-3xl font-bold text-[#6B5146]">
          Kindora<span className="text-[#E83B5B]">.</span>
        </h2>

        <p className="mt-2 text-sm text-[#8C7B73]">
          Small Acts. Greater Impact.
        </p>

        {/* Loading Message */}
        <p className="mt-6 text-sm font-medium text-[#6B5146]">
          Preparing something meaningful...
        </p>

        <p className="mt-1 text-xs text-[#A8958C]">Please wait a moment</p>
      </div>
    </div>
  );
}
