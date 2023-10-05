import React, { useState } from 'react';
import usStates from 'us-state-codes';




function StateSelector() {
    console.log(usStates);

    const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <div>
      <label>State</label>
      <select id="state" name="state" value={selectedState} onChange={handleStateChange}>
        <option value="">Choose...</option>
        {Object.entries(usStates).map(([abbr, name]) => (
          <option key={abbr} value={abbr}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StateSelector;
