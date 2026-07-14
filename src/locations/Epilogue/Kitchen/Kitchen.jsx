import "./Kitchen.css";

export default function Kitchen() {
  return (
    <div className="kitchen">
      <div className="kitchen-scene">
        <div className="kitchen-wall" />
        <div className="kitchen-floor" />
        <div className="kitchen-window">
          <div className="window-night" />
          <div className="window-moon" />
          <div className="window-bar" />
        </div>
        <div className="fridge">
          <div className="fridge-handle" />
          <div className="fridge-magnet magnet-one" />
          <div className="fridge-magnet magnet-two" />
        </div>
        <div className="counter">
          <div className="counter-top" />
          <div className="cabinet cabinet-one" />
          <div className="cabinet cabinet-two" />
          <div className="cabinet cabinet-three" />
        </div>
        <div className="sink" />
        <div className="faucet" />
        <div className="stove">
          <div className="burner burner-left" />
          <div className="burner burner-right" />
        </div>
        <div className="upper-cabinet upper-left" />
        <div className="upper-cabinet upper-right" />
        <div className="hanging-pan" />
        <div className="hanging-pot" />
        <div className="treat-jar" />
        <div className="food-bowl">
          <div className="kibble" />
        </div>
        <div className="water-bowl" />
        <div className="moonlight" />
      </div>
    </div>
  );
}
