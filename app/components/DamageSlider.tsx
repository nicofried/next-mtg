
import React, { useState, useEffect, FC } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button'; // Update the path as necessary

interface DamageSliderProps {
    onConfirm: (value: number) => void; // Specify the type for onConfirm
    text?: string;
    //label: string;
  }

  const DamageSlider: FC<DamageSliderProps> = ({ onConfirm, text = 'Slider'}) => {
  const [value, setValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showValue, setShowValue] = useState(false);

  useEffect(() => {
    if (!isDragging && showValue) {
      const timer = setTimeout(() => {
        setShowValue(false);
        onConfirm(value);
        setValue(0); // Reset slider after confirmation
      }, 2000); // Show the value for 2 seconds before resetting
      return () => clearTimeout(timer);
    }
  }, [isDragging, value, onConfirm, showValue]);

  const handleValueChange = (newValue: number[]) => { // Explicitly type newValue
    setValue(newValue[0]);
    setShowValue(true); // Show the value whenever it's changed
  };

  const increment = () => handleValueChange([value + 1]);
  const decrement = () => handleValueChange([value - 1]);

  return (
    <div style={{ top: "50%", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
      <div style={{ top: "50%",padding:'1px',color: value > 0 ? 'limegreen' : value < 0 ? 'crimson' : '' }}>
        {showValue ? (value === 0 ? text : value > 0 ? "+" + value :  value) : text}
      </div>
  
      <div style={{top: "50%", display: 'flex', gap: '10px', alignItems: 'center', width: '100%', height:'100%', justifyContent: 'center'}}>
        <Button onClick={decrement} variant="secondary">-</Button>
        
        {/* Explicitly set a minimum height for the Slider container */}
        <div style={{ padding: "10px", top: "50%", flexGrow: 1, minHeight: '2em', transition: 'all' }}> 
          <Slider
            onValueChange={(value) => handleValueChange(value)}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)} 
            defaultValue={[0]} 
            min={-40} 
            max={40} 
            step={1} 
            value={[value]}
          />
        </div>
  
        <Button onClick={increment} variant="secondary">+</Button>
      </div>
    </div>
  );
};

export default DamageSlider;
