export default function isIOS() {
  function iosQuirkPresent() {
    const audio = new Audio();
    audio.volume = 0.5;
    return audio.volume === 1;   // volume cannot be changed from "1" on iOS 12 and below
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAppleDevice = navigator.userAgent.includes('Macintosh');
  const isTouchScreen = navigator.maxTouchPoints >= 1;   // true for iOS 13 (and hopefully beyond)

  return isIOS || (isAppleDevice && (isTouchScreen || iosQuirkPresent()));
}