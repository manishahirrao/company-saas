import React from 'react';
import { Upload,Zap } from 'lucide-react';

const CustomLLM = () => (
  <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Custom LLM</h1>
      <p className="text-gray-500">Train and deploy your custom language models</p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Model</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
              <input
                type="text"
                placeholder="Enter model name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Model</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>GPT-3.5 Turbo</option>
                <option>GPT-4</option>
                <option>Claude</option>
                <option>Llama 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Training Data</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Drop your training files here or click to browse</p>
                <button className="mt-2 px-4 py-2 text-blue-600 hover:text-blue-700">
                  Browse Files
                </button>
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
              <Zap className="h-5 w-5 mr-2" />
              Start Training
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Models</h3>
          <div className="space-y-3">
            {[
              { name: "Content Writer v2", status: "Active", accuracy: "94%" },
              { name: "SEO Optimizer", status: "Training", accuracy: "89%" },
              { name: "Ad Copy Generator", status: "Active", accuracy: "91%" }
            ].map((model, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{model.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    model.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {model.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Accuracy: {model.accuracy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CustomLLM;
