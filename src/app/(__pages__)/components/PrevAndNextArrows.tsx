import { ImSpinner2, ImSpinner9} from "react-icons/im";

export function NextArrow(
    { className, style, onClick, isLoading }: {
      className?: string,
      style?: React.CSSProperties,
      onClick?: () => void,
      isLoading: boolean
    }
  ) {
  return (
    isLoading ? (
      <span className={'bg-red-600p w-5 h-5 absolute top-1/2 -right-[34px] -translate-x-1/2 -translate-y-1/2'}>
        <span 
        className={'animate-spin'}
        style={{ ...style, ...customStyles}}
        >
          <ImSpinner9 size={20}/>
        </span>
      </span> 

    ) : (
      <div
        className={className}
        style={{ ...style, ...customStyles}}
        onClick={onClick}
      />
    )
  );
}

export function PrevArrow(
  {className, style, onClick}: {
    className?: string,
    style?: React.CSSProperties,
    onClick?: () => void,
  }
) {
  return (
    <div
      className={className}
      style={{ ...style, ...customStyles}}
      onClick={onClick}
    />
  );
}

const customStyles = {
  height: "100%",
  display: "flex",
  alignItems: "center",
}