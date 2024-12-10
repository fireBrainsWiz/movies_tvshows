import { ResultType } from "@/app/lib/types";
import { CompanyType } from "../../ItemsSlide";
import { Company } from "./Company";

export function Companies({
  results,
  companyOrNetwork
}: {
  results: ResultType[] | CompanyType[];
  companyOrNetwork: 'company' | 'network';
}) {

  // if (('logo_path' in results[0])) {
  //   console.log(results, isNetwork)
  // }

  return (
    <div className="p-2 my-10 flex justify-center flex-wrap border-b border-gray-500">
      <p className="text-2xl text-center w-full">
        {
          companyOrNetwork === 'company' 
          ? 'Production Compan' + (results.length > 1 ? 'ies' : 'y')
          : 'network' + (results.length > 1 ? 's' : '')
        }
      </p>
      <ul className="grid grid-flow-col overflow-x-auto justify-start gap-6 py-6 pb-10">
        {
          results.map((result, i) => (
            <Company
              key={i}
              result={result as CompanyType}
              companyOrNetwork={companyOrNetwork}
            />
          ))
        }
      </ul>
    </div>
  );
}


