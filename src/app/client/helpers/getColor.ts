const getColor = (color = 'rgb(22 6 6 / 1)') => {
  let regexpMatchArr = 
  color.match(/^rgb?\((\d+)\s*(\d+)\s*(\d+)\s\/\s*(\d+)\)$/) as RegExpMatchArray
  return `rgb(${regexpMatchArr[1]},${regexpMatchArr[2]},${regexpMatchArr[3]})`
}

export default getColor