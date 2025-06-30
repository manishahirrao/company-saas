import React, { useState } from 'react';

const OperationsPage: React.FC = () => {
  // Set default active box to "devops"
  const [activeBox, setActiveBox] = useState<string>('devops');

  const boxes = [
    { id: 'devops', src: '/Dev Ops.png', alt: 'Dev Ops', wireframe: '/wireframe2.png' },
    { id: 'it', src: '/IT.png', alt: 'IT Ops', wireframe: '/wireframe1.png' },
    { id: 'sales', src: '/sales.png', alt: 'Sales', wireframe: '/wireframe.png' },
  ];

  const selectedWireframe = boxes.find((box) => box.id === activeBox)?.wireframe;

  return (
    <section className="flex flex-col items-center justify-center py-20 bg-gray-50">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          How Different Teams Can Use AI
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-start gap-10">
          {/* Left: Clickable boxes */}
          <div className="flex flex-col justify-between h-[600px] w-[300px] gap-4">
            {boxes.map((box) => (
              <div
                key={box.id}
                onClick={() => setActiveBox(box.id)}
                className={`group h-1/3 w-full rounded-xl border overflow-hidden shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  activeBox === box.id
                    ? 'bg-gradient-to-br from-pink-200 to-purple-200 border-transparent shadow-lg'
                    : 'bg-white border-gray-200 hover:bg-gradient-to-br from-pink-100 via-white to-purple-100 hover:border-transparent hover:shadow-xl'
                }`}
              >
                <img
                  src={box.src}
                  alt={box.alt}
                  className="h-4/5 w-4/5 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Right: Wireframe Image */}
          {selectedWireframe && (
            <div className="w-full max-w-3xl">
              <img
                src={selectedWireframe}
                alt="Wireframe"
                className="w-full h-[600px] object-contain rounded-xl shadow-lg border border-gray-200"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OperationsPage;
