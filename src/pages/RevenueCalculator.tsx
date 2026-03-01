import React, { useState } from 'react';

const DEFAULT_RATES = {
  plastic: 20, // per kg
  paper: 10,
  metal: 30,
  glass: 8,
  eWaste: 50,
  organic: 2,
};

const RevenueCalculator: React.FC = () => {
  const [quantities, setQuantities] = useState({
    plastic: '',
    paper: '',
    metal: '',
    glass: '',
    eWaste: '',
    organic: '',
  });
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [showRates, setShowRates] = useState(false);

  const handleQtyChange = (type: string, value: string) => {
    setQuantities(q => ({ ...q, [type]: value.replace(/[^\d.]/g, '') }));
  };
  const handleRateChange = (type: string, value: string) => {
    setRates(r => ({ ...r, [type]: Number(value) || 0 }));
  };

  const total = Object.keys(quantities).reduce((sum, type) => {
    const qty = parseFloat(quantities[type as keyof typeof quantities]) || 0;
    return sum + qty * rates[type as keyof typeof rates];
  }, 0);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-cyan-500">♻️ Revenue Calculator</h1>
      <p className="mb-6 text-gray-300">Estimate potential revenue from recyclable waste. Enter quantities (kg) for each type. <button className="underline text-cyan-400" onClick={() => setShowRates(r => !r)}>{showRates ? 'Hide' : 'Show'} Rates</button></p>
      <form className="space-y-4">
        {Object.keys(quantities).map(type => (
          <div key={type} className="flex items-center gap-4">
            <label className="w-24 capitalize text-gray-200" htmlFor={type}>{type}</label>
            <input
              id={type}
              type="number"
              min="0"
              step="any"
              className="flex-1 rounded px-3 py-2 bg-gray-900 border border-cyan-700 text-cyan-200 focus:outline-none"
              placeholder="0"
              value={quantities[type as keyof typeof quantities]}
              onChange={e => handleQtyChange(type, e.target.value)}
            />
            {showRates && (
              <input
                type="number"
                min="0"
                step="any"
                className="w-24 rounded px-2 py-1 bg-gray-800 border border-cyan-700 text-cyan-300 focus:outline-none"
                value={rates[type as keyof typeof rates]}
                onChange={e => handleRateChange(type, e.target.value)}
                title="Market rate per kg"
              />
            )}
            {showRates && <span className="text-xs text-gray-400 ml-1">₹/kg</span>}
          </div>
        ))}
      </form>
      <div className="mt-8 bg-cyan-900/30 border border-cyan-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Summary</h2>
        <table className="w-full text-left text-cyan-100 mb-2">
          <thead>
            <tr>
              <th className="py-1">Type</th>
              <th className="py-1">Qty (kg)</th>
              <th className="py-1">Rate (₹/kg)</th>
              <th className="py-1">Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(quantities).map(type => {
              const qty = parseFloat(quantities[type as keyof typeof quantities]) || 0;
              const rate = rates[type as keyof typeof rates];
              return (
                <tr key={type}>
                  <td className="capitalize py-1">{type}</td>
                  <td className="py-1">{qty}</td>
                  <td className="py-1">{rate}</td>
                  <td className="py-1">{(qty * rate).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-lg font-bold text-cyan-400 mt-2">Total Revenue: ₹ {total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
      </div>
    </div>
  );
};

export default RevenueCalculator;
