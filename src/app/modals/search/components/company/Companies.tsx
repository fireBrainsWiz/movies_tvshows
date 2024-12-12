import { ResultType } from "@/app/lib/types";
import { CompanyType } from "../../ItemsSlide";
import { Company } from "./Company";

export function Companies({
  results,
  companyOrNetwork,
  hasTitle
}: {
  results: ResultType[] | CompanyType[];
  companyOrNetwork: 'company' | 'network';
  hasTitle?: boolean
}) {

  // if (('logo_path' in results[0])) {
  //   console.log(results, isNetwork)
  // }
  const companyWrapperClassname = hasTitle 
  ? "grid grid-flow-col overflow-x-auto justify-start gap-6 py-6 pb-10" 
  : "flex flex-wrap gap-6 ";

  return (
    <div className={`p-2  ${hasTitle ? 'my-10' : ''} flex justify-center flex-wrap border-b border-gray-500`}>
      {
        hasTitle && (
          <p className="text-2xl text-center w-full">
            {
              companyOrNetwork === 'company' 
              ? 'Production Compan' + (results.length > 1 ? 'ies' : 'y')
              : 'network' + (results.length > 1 ? 's' : '')
            }
          </p>
        )
      }
      <ul className={companyWrapperClassname}>
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


