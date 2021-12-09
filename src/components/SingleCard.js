import { createElement } from "react";
import '../ui/SingleCard.css'

export default function SingleCard({ card, handleChoice, cardFlipped, disabled }) {    // destructure card and handleChoice props from App
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className="tile">
      <div className={cardFlipped ? "flipped" : ""}>
        <img className="front" src={cardFlipped ? card.src : ""} alt="Tile front" />
        <img
          className="back"
          src="https://cdn.mwallpapers.com/photos/3d-abstract/abstract/sm/abstract-square-wallpaper-2019-2560-x-1920-preview-android-iphone-hd-wallpaper-background-downloadhd-wallpapers-desktop-background-android-iphone-1080p-4k-pmkcl.jpg"
          onClick={handleClick}
          alt="Tile back"
        />
      </div>
    </div>
  )
}
