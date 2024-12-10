
import { PLACEHOLDER_IMAGE } from "@/app/lib/types"
import Image from "next/image"

export default function MovieBanner({i}:{i:number}) {
  return (
    <div>
      <Image 
        src={`/_banners/${i+1}.png`} 
        alt="" 
        width={1920} height={230}
        priority
        placeholder="blur"
        blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
        className="max-w-full"
      />
    </div>
  )
}


/* 
Make sure that all the Babel plugins and presets you are using
are defined as dependencies or devDependencies in your package.json
file. It's possible that the missing plugin is loaded by a preset
you are using that forgot to add the plugin to its dependencies: you
can workaround this problem by explicitly adding the missing package
to your top-level package.json.eslint
 */