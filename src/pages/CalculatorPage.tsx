import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

function CalculatorPage() {
  // State for input values
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);

  // State for calculated values
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Handle down payment percentage change
  useEffect(() => {
    const calculatedDownPayment = (loanAmount * downPaymentPercent) / 100;
    setDownPayment(calculatedDownPayment);
  }, [loanAmount, downPaymentPercent]);

  // Handle down payment amount change
  const handleDownPaymentChange = (value: number) => {
    setDownPayment(value);
    setDownPaymentPercent((value / loanAmount) * 100);
  };

  // Calculate mortgage payments
  useEffect(() => {
    // Principal loan amount after down payment
    const principal = loanAmount - downPayment;
    
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Total number of payments
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment using the formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    if (monthlyRate > 0) {
      const monthlyPaymentValue = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      setMonthlyPayment(monthlyPaymentValue);
      setTotalPayment(monthlyPaymentValue * numberOfPayments);
      setTotalInterest(monthlyPaymentValue * numberOfPayments - principal);
    } else {
      setMonthlyPayment(principal / numberOfPayments);
      setTotalPayment(principal);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
   
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Mortgage Calculator</h1>
          <p className="text-gray-600">Estimate your monthly mortgage payments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Loan Information</h2>
            
            <div className="space-y-6">
              {/* Home Price Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Home Price: {formatCurrency(loanAmount)}
                </label>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$50,000</span>
                  <span>$2,000,000</span>
                </div>
              </div>
              
              {/* Down Payment Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Down Payment: {formatCurrency(downPayment)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={loanAmount * 0.5}
                    step="5000"
                    value={downPayment}
                    onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Down Payment: {downPaymentPercent.toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Interest Rate Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.1%</span>
                  <span>15%</span>
                </div>
              </div>
              
              {/* Loan Term Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (years)</label>
                <div className="flex space-x-4">
                  {[15, 20, 30].map((term) => (
                    <button
                      key={term}
                      type="button"
                      className={`py-2 px-4 rounded-md ${
                        loanTerm === term
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setLoanTerm(term)}
                    >
                      {term} years
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-1">Principal & Interest</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrency(monthlyPayment)}<span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-medium">{formatCurrency(loanAmount - downPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Down Payment:</span>
                <span className="font-medium">{formatCurrency(downPayment)} ({downPaymentPercent.toFixed(0)}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span className="font-medium">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Payment:</span>
                <span className="font-medium">{formatCurrency(totalPayment)}</span>
              </div>
            </div>
            
            {/* Payment Breakdown Chart */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Breakdown</h3>
              <div className="h-4 rounded-full overflow-hidden bg-gray-200">
                <div 
                  className="h-full bg-blue-600" 
                  style={{ width: `${(loanAmount - downPayment) / totalPayment * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-blue-600">Principal: {((loanAmount - downPayment) / totalPayment * 100).toFixed(0)}%</span>
                <span className="text-gray-600">Interest: {(totalInterest / totalPayment * 100).toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This calculator provides an estimate. Actual loan terms may vary. 
                Contact Austin for personalized mortgage advice.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Ready to take the next step?</h2>
          <p className="text-blue-700 mb-6">
            Get pre-approved for a mortgage and start your home buying journey with Austin McClain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:austin@reafco.com" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Contact Austin
            </a>
            <a 
              href="tel:+16147104827" 
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              Call (614) 710-4827
            </a>
          </div>
        </div>
      </div>
  
  );
}

export default CalculatorPage;
