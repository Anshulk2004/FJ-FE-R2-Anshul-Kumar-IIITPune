const DirectionsPanel = ({ directions }) => {
  return (
    <div className="absolute top-0 right-0 w-72 h-80 overflow-auto bg-white shadow-md p-4 rounded-lg z-30">
      <h3 className="font-semibold text-lg mb-2">Route Directions</h3>
      <ul className="list-decimal list-inside text-sm">
        {directions.map((step) => (
          <li key={step.id} className="mb-1">
            {step.text} ({step.distance}m)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectionsPanel;
