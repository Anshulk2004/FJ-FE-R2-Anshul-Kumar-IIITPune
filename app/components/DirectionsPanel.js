import { useTheme } from './ThemeContext';

const DirectionsPanel = ({ directions }) => {
  const { theme } = useTheme();

  return (
    <div className={`
      absolute top-2 right-2 
      w-[90vw] md:w-80 
      max-h-[400px] overflow-auto 
      ${theme === 'dark' 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-800'
      }
      shadow-lg p-4 rounded-lg z-[1000]
      transition-colors duration-200
      scrollbar-thin 
      ${theme === 'dark'
        ? 'scrollbar-thumb-gray-600 scrollbar-track-gray-700'
        : 'scrollbar-thumb-gray-300 scrollbar-track-gray-100'
      }
    `}>
      <h3 className={`
        font-semibold text-lg mb-2
        ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
      `}>
        Route Directions
      </h3>
      <ul className="list-decimal list-inside text-sm space-y-2">
        {directions.map((step) => (
          <li key={step.id} className={`
            py-1 px-2 rounded
            ${theme === 'dark' 
              ? 'hover:bg-gray-700 text-white' 
              : 'hover:bg-gray-50 text-gray-800'
            }
          `}>
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              {step.text}
            </span>
            <span className={`
              ml-1 text-xs
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}
            `}>
              ({Math.round(step.distance)}m)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectionsPanel;