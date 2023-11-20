import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface SettingsProps {
  onLevelsChange: (newLevels: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ onLevelsChange }) => {
  const [levels, setLevels] = useState<number>(1); // Initial state

  const handleLevelsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLevels = parseInt(event.target.value, 10);
    setLevels(newLevels);
    onLevelsChange(newLevels); // Emit the state to the parent
  };

  return (
    <div>
      <b>Levels per round:</b> <br />
      <TextField
        type="number"
        value={levels}
        onChange={handleLevelsChange}
        inputProps={{ min: 1 }} // Set the minimum value for the input
      />
    </div>
  );
};

export default Settings;
