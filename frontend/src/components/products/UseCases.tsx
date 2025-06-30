
import React from 'react';

interface UseCase {
  title: string;
  description: string;
  example: string;
}

interface UseCasesProps {
  useCases: UseCase[];
}

const UseCases: React.FC<UseCasesProps> = ({ useCases }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-World Use Cases</h2>
          <p className="text-xl text-gray-600">See how companies are transforming their operations</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
              <p className="text-gray-600 mb-4">{useCase.description}</p>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 italic">
                "{useCase.example}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
