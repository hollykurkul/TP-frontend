import "./LivingRoom.css";

export default function LivingRoom() {
  return (
    <div className="living-room">
      <div className="living-room-scene">
        <div className="lr-wall" />
        <div className="lr-floor" />
        <div className="lr-window">
          <div className="lr-window-pane" />
          <div className="lr-moon" />
          <div className="lr-window-cross-v" />
          <div className="lr-window-cross-h" />
        </div>
        <div className="lr-curtain lr-curtain-left" />
        <div className="lr-curtain lr-curtain-right" />
        <div className="lr-picture-frame" />
        <div className="lr-tv">
          <div className="lr-tv-screen" />
          <div className="lr-tv-stand" />
        </div>
        <div className="lr-lamp">
          <div className="lr-lamp-shade" />
          <div className="lr-lamp-glow" />
          <div className="lr-lamp-pole" />
          <div className="lr-lamp-base" />
        </div>
        <div className="lr-sofa">
          <div className="lr-sofa-back" />
          <div className="lr-sofa-seat" />
          <div className="lr-sofa-arm lr-sofa-arm-left" />
          <div className="lr-sofa-arm lr-sofa-arm-right" />
          <div className="lr-cushion lr-cushion-one" />
          <div className="lr-cushion lr-cushion-two" />
        </div>
        <div className="lr-rug" />
        <div className="lr-pet-bed">
          <div className="lr-pet-bed-cushion" />
        </div>
        <div className="lr-toy-ball" />
      </div>
    </div>
  );
}
