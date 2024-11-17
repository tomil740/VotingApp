
const VerticalProgressBar = ({ currentValue, maxValue, header,imgUrl }) => {
  // Calculate the percentage of progress
  const progressPercentage = (currentValue / maxValue) * 100;

  return (
    <div className="progressBarContainer">
      {/* Header */}
      <div className="progressBarHeader">
       {header}
      <img src={imgUrl}></img>
      </div>

      {/* Vertical Progress Bar */}
      <div className="progressBar">
        <div
          className="progressFill"
          style={{ height: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Display current and max value */}
      <div className="progressValues">
        <span>Current: {currentValue}</span>
        <span>Max: {maxValue}</span>
      </div>
    </div>
  );
};

export default VerticalProgressBar;
