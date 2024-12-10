;import ColorThief from 'colorthief/dist/color-thief.mjs'

export const steal = (img) => {
  const colorThief = new ColorThief();
  // let color = [0,0,0]
  let color = [[0,0,0]]
  // const img = document.querySelector('img');

  // function __() {
  //   color = colorThief.getColor(img);
  //   console.log(88)
  // }
  // __()
  
  // if (img.complete) {
  //   __()
  // } else {
  //   img.addEventListener('load', __);
  // }

  try {
    // color = colorThief.getColor(img);
    color = colorThief.getPalette(img);
  } catch (error) {
    // console.log(error)
  }


  // color = colorThief.getColor(img);
  // color = colorThief.getPalette(img);

  return color
}

