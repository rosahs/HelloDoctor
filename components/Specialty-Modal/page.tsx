import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSelectSpecialty: (specialty: string) => void;
  position: { top: number; left: number; width: number };
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onSelectSpecialty, position }) => {
  const doctorTypes = [
    'Immunology', 'Cardiology', 'Cosmetic Surgery', 'Dentist', 'Dermatology',
    'Gastroenterology', 'Hematology', 'Nephrology', 'Neurology', 'Obstetrics-Gynecology',
    'Oncology', 'Orthopedics', 'Pathology', 'Pediatrics', 'Preventative Medicine',
    'Psychiatry', 'Pulmonology', 'Surgery', 'Urology'
  ];

  if (!show) return null;

  return (
    <div
      className="absolute z-50 bg-white rounded-lg p-4 shadow-xl"
      style={{
        top: position.top,
        left: position.left,
        width: position.width, // Set modal width to match input width
      }}
    >
      <h2 className="text-xl font-bold mb-2">Select a Specialty</h2>
      <div className="max-h-60 overflow-y-auto">
        <ul className="space-y-2">
          {doctorTypes.map((type) => (
            <li
              key={type}
              className="cursor-pointer text-lg text-blue-600 hover:underline"
              onClick={() => {
                onSelectSpecialty(type);
                onClose();
              }}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-4 w-full bg-gray-800 text-white py-1 rounded-lg"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default Modal;