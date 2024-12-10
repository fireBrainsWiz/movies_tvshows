import Image from "next/image";
import { CompanyType } from "../../ItemsSlide";
import { ImagePath } from "@/app/lib/types";
import getTailwindColorUsingNumber from "@/app/client/helpers/getTailwindColorsUsingNumber";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import useNetworkImagesViewerStore from "@/app/(__pages__)/stores/network-images-viewer-store/network-images-viewer-store";
import useCompanyImagesViewerStore from "@/app/(__pages__)/stores/company-images-viewer-store/company-images-viewer-store";
useCompanyImagesViewerStore

export function Company({
  result,
  companyOrNetwork
}: {
  result: CompanyType;
  companyOrNetwork: 'company' | 'network';
}) {

  const { setNetworkImagesTrigger } = useNetworkImagesViewerStore();
  const { setCompanyImagesTrigger } = useCompanyImagesViewerStore();


  return (
    <li className={ ` border border-gray-500 mb-10 rounded-md w-[350px] min-h-[220px] max-w-[350px]p max-h-[230px] my-4 mx-auto grid grid-cols-2 overflow-hidden p-2 ${getTailwindColorUsingNumber(result.id)} relative`}
    >
      <div className="bg-amber-500/10p flex justify-center items-center">
        <Image 
          src={result.logo_path? ImagePath + result.logo_path : '/no-image-2.webp'}
          alt="company image"
          width={200}
          height={200}
          className="w-[200px] h-[200px] object-contain"
        />
      </div>

      <div className="grid">
        <p className="max-h-[95px] p-1 text-2xl overflow-hidden overflow-y-auto break-words mt-5 pt-1">
          {result.name}
        </p>
        {
          result.origin_country? (
            <p className="bg-red-500p max-h-[50px] self-end pr-1 border-r  border-gray-500  relative">
              <span className="h-[0px] border-0 border-b  border-gray-500 absolute -top-[20px] right-0 w-full"/>
              
              <span className="bg-green-500p flex items justify-end text-right">
                {result.origin_country[0]}
              </span>
              <span className="bg-green-500p flex items justify-end text-right ">
                {result.origin_country[1]}
              </span>
            </p>
          ) : (
            <p className="bg-red-500p max-h-[50px] self-end pr-1 border-r  border-gray-500  relative">
              <span className="h-[0px] border-0 border-b  border-gray-500 absolute -top-[20px] right-0 w-full"/>

              <span className="bg-green-500p flex items justify-end text-right">
                Not
              </span>
              <span className="bg-green-500p flex items justify-end text-right ">
                available
              </span>
            </p>
          )
        }
      </div>

      {
        companyOrNetwork === 'network' ? (
          <button className="bg-red-500p absolute top-0 right-0 px-2 py-[2px]"
            onClick={() => {
              setNetworkImagesTrigger({
                isVisibleNetworkImagesViewer: true,
                networkId: result.id,
                logoPath: result.logo_path
              })
            }}>
            <TfiLayoutSliderAlt size="25"/> 
          </button>
        ) : (
          <button className="bg-red-500p absolute top-0 right-0 px-2 py-[2px]"
            onClick={() => {
              setCompanyImagesTrigger({
                isVisibleCompanyImagesViewer: true,
                companyId: result.id,
                logoPath: result.logo_path
              })
            }}>
            <TfiLayoutSliderAlt size="25"/> 
          </button>
        )
      }
    </li>
  );
}
