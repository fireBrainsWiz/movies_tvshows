'use client'

export default function Search() {

  return (
    <div className={`bg-rose-950/40  min-h-screen`}
    >
      <h1>Search</h1>
      <div>
        <form action="post">
          <input type="search" />
          <button>Go</button>
        </form>

        <div className="show-cards">
          <h2>Results</h2>
        </div>
      </div>
    </div>
  )
}