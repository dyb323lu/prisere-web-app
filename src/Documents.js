import React from 'react';
import { FileText, MoreHorizontal } from 'lucide-react';

const DocumentTab = () => {
    return (
        <>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Disaster Declared in your state</h2>
                <p className="text-sm text-gray-500">Description + Time period</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Build Claim</button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Documents</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>

        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                <input type="checkbox" className="mr-2" />
                Name
              </th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 4].map((index) => (
              <tr key={index} className="border-b">
                <td className="p-3">
                  <input type="checkbox" className="mr-2" />
                  <span className="inline-block w-8 h-8 bg-gray-200 rounded-full mr-2"></span>
                  Expense {index} receipt
                </td>
                <td className="p-3">Cell Text</td>
                <td className="p-3">Cell Text</td>
                <td className="p-3">Cell Text</td>
                <td className="p-3">Cell Text</td>
                <td className="p-3"><span className="px-2 py-1 bg-gray-200 rounded-full text-xs">Badge</span></td>
                <td className="p-3"><MoreHorizontal /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
};

export default DocumentTab;