
export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...customStyles}}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...customStyles}}
      onClick={onClick}
    />
  );
}

const customStyles = {
  display: "block", 
  height: "100%",
  display: "flex",
  alignItems: "center",
}