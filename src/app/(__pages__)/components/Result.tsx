import { ResultType, PLACEHOLDER_IMAGE } from '@/app/lib/types';
import Image from 'next/legacy/image';
import Link from 'next/link';

type ResultProps = {
  item: ResultType
}

export default function Result({ item }: ResultProps) {
  // console.log(item)
  return (
    <Link href={`/card?title=${item.title}&id=${item.id}`}>
      <Image 
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        width={170}
        height={255}
        alt='image'
        placeholder='blur'
        blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
        priority
      />
    </Link>
  )
}


const abc = 1