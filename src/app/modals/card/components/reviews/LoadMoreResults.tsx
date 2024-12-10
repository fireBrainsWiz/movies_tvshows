export default function LoadMoreResults({
  setShowAddMoreResults,
  setPage,
}: {
  setShowAddMoreResults: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}) {

  return (
    <div className='flex justify-center'>
      <button
        onClick={() => {
          setPage((prev) => prev + 1)
          setShowAddMoreResults(false)
        }}
        className='py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-900'
      >
        Load More
      </button>
    </div>
  )
}