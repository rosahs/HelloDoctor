import React from 'react';
import Image from 'next/image';

const categories = () => {
  const categoryData = [
    { name: 'Dentist', icon: '/tooth.svg' },
    { name: 'Cardiologist', icon: '/heart.svg' },
    { name: 'Orthopedic', icon: '/bone.svg' },
    { name: 'Neurologist', icon: '/brain.svg' },
    { name: 'Dermatologist', icon: '/skin.svg' },
    { name: 'Ophthalmologist', icon: '/eye.svg' },
    { name: 'Pediatrician', icon: '/baby.svg' },
    { name: 'Psychiatrist', icon: '/mental-health.svg' },
    { name: 'Surgeon', icon: '/scalpel.svg' },
    { name: 'Gynecologist', icon: '/woman.svg' },
    {name: 'Urologist', icon: '/kidney.svg'},
    {name: 'Plastic Surgeon', icon: '/plastic-surgery.svg'}
  ];

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categoryData.map((category, index) => (
            <a
              key={index}
              className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring bg-white"
              href="#"
            >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <Image
                  src={category.icon}
                  alt={`${category.name} Icon`}
                  width={100}
                  height={100}
                />
              </span>
              <h2 className="mt-2 font-bold text-primary-color">{category.name}</h2>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default categories;