import React from 'react';
import { X, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const PaymentModal = ({ 
  showPaymentModal, 
  setShowPaymentModal, 
  selectedCourse,
  paymentForm,
  setPaymentForm,
  paymentErrors,
  handlePaymentSubmit,
  handleFileChange,
  loading
}) => {
  if (!showPaymentModal || !selectedCourse) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
            <button 
              onClick={() => setShowPaymentModal(false)} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">Course: {selectedCourse.title}</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">${selectedCourse.price}</p>
        </div>

        <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
              Payment Instructions
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Bank Transfer:</strong></p>
              <p>Account Name: Forexism Trading Ltd</p>
              <p>Account Number: 1234567890</p>
              <p>Bank: International Bank</p>
              <p>SWIFT: INTLBANK123</p>
              <div className="my-3 border-t border-blue-200 pt-3">
                <p><strong>TRC20 (USDT):</strong></p>
                <p className="font-mono text-xs break-all bg-white p-2 rounded">
                  TXa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              value={paymentForm.paymentMethod}
              onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            >
              <option value="bank">Bank Transfer</option>
              <option value="trc20">TRC20 (USDT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount Paid ($)</label>
            <input
              type="number"
              value={paymentForm.amount}
              onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
              className={`w-full px-4 py-3 border ${paymentErrors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black`}
              placeholder={`${selectedCourse.price}`}
            />
            {paymentErrors.amount && <p className="text-red-500 text-sm mt-1">{paymentErrors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction ID / Reference Number
            </label>
            <input
              type="text"
              value={paymentForm.transactionId}
              onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
              className={`w-full px-4 py-3 border ${paymentErrors.transactionId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black`}
              placeholder="Enter transaction ID"
            />
            {paymentErrors.transactionId && <p className="text-red-500 text-sm mt-1">{paymentErrors.transactionId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Payment Screenshot
            </label>
            <div className={`border-2 border-dashed ${paymentErrors.screenshot ? 'border-red-500' : 'border-gray-300'} rounded-lg p-6 text-center`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="screenshot-upload"
              />
              <label htmlFor="screenshot-upload" className="cursor-pointer">
                {paymentForm.screenshotPreview ? (
                  <div className="space-y-3">
                    <img
                      src={paymentForm.screenshotPreview}
                      alt="Payment screenshot"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="text-gray-600">Click to upload payment screenshot</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </label>
            </div>
            {paymentErrors.screenshot && <p className="text-red-500 text-sm mt-1">{paymentErrors.screenshot}</p>}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> After submission, our admin team will verify your payment within 24 hours. 
              You will receive an email confirmation once verified.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Submit Payment</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;