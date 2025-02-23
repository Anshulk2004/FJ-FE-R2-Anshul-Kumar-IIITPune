const DirectionsPanel = ({ directions }) => {
  return (
    <div className="absolute top-2 right-2 w-80 max-h-[400px] overflow-auto bg-white shadow-lg p-4 rounded-lg z-[1000]">
      <h3 className="font-semibold text-lg mb-2">Route Directions</h3>
      <ul className="list-decimal list-inside text-sm">
        {directions.map((step) => (
          <li key={step.id} className="mb-1">
            {step.text} ({Math.round(step.distance)}m)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectionsPanel;
