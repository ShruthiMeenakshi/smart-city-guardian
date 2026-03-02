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
    <div className="revenue-page">
      <h1 className="revenue-page__title">♻️ Revenue Calculator</h1>
      <p className="revenue-page__description">Estimate potential revenue from recyclable waste. Enter quantities (kg) for each type. <button className="revenue-page__toggle" onClick={() => setShowRates(r => !r)}>{showRates ? 'Hide' : 'Show'} Rates</button></p>
      <form className="space-y-4">
        {Object.keys(quantities).map(type => (
          <div key={type} className="revenue-page__row">
            <label className="revenue-page__label" htmlFor={type}>{type}</label>
            <input
              id={type}
              type="number"
              min="0"
              step="any"
              className="revenue-page__input"
              placeholder="0"
              value={quantities[type as keyof typeof quantities]}
              onChange={e => handleQtyChange(type, e.target.value)}
            />
            {showRates && (
              <input
                type="number"
                min="0"
                step="any"
                className="revenue-page__rate-input"
                value={rates[type as keyof typeof rates]}
                onChange={e => handleRateChange(type, e.target.value)}
                title="Market rate per kg"
              />
            )}
            {showRates && <span className="revenue-page__unit">₹/kg</span>}
          </div>
        ))}
      </form>
      <div className="revenue-page__summary">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Summary</h2>
        <table className="revenue-page__table">
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
