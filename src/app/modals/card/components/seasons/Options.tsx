import { SeasonType } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";

export default function Options({
  options, 
  onchange
}: {
  options: SeasonType[];
  onchange: (id: number) => void
}) {
  return (
    <>
      {
        options.map((option, i) => {
          const abreviatedName = option.name.slice(0, 9);
          return (
            <li key={option.id}>
              <button
                className="py-2 px-4 bg-slate-800 my-1 whitespace-nowrap overflow-hidden w-[calc(95vw-16px)] xs:w-[300px]" 
                onClick={() => {
                  onchange(option.id)
                }}
              >
                {abreviatedName}
              </button>
            </li>
        )})
      }
    </>
  );
}
