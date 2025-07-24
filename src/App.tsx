import React, { useState, useEffect } from 'react';
import paycheckImg from './assets/image1.png';
import cashImg from './assets/cash.png';
import bitcoinImg from './assets/Pasted.png';
import footerImg from './assets/image3.png';

function App() {
  // Local storage hook functionality
  const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : initialValue;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };

    return [storedValue, setValue] as const;
  };

  const [balance, setBalance] = useLocalStorage('balance', +(Math.random() * 1000).toFixed(2));
  const [savings, setSavings] = useLocalStorage('savings', +(Math.random() * 1000).toFixed(2));
  const [bitcoin, setBitcoin] = useLocalStorage('bitcoin', +(Math.random()).toFixed(2));
  const [currentTime, setCurrentTime] = useState('10:20');
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'add' | 'withdraw' | null;
  }>({ isOpen: false, type: null });
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastAddedAmount, setLastAddedAmount] = useState<number | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showTransferOptionsModal, setShowTransferOptionsModal] = useState(false);
  const [cashOutValue, setCashOutValue] = useState(0);
  const [lastWithdrawnAmount, setLastWithdrawnAmount] = useState<number | null>(null);
  const [transferType, setTransferType] = useState(''); // 'instant' or 'standard'

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddMoney = () => {
    setModalState({ isOpen: true, type: 'add' });
  };

  const handleWithdraw = () => {
    setWithdrawAmount(balance);
    setShowWithdrawModal(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAmount && selectedAmount > 0) {
      setLoading(true);
      setTimeout(() => {
        if (modalState.type === 'add') {
          setBalance(prev => prev + selectedAmount);
          setLastAddedAmount(selectedAmount);
        } else if (modalState.type === 'withdraw') {
          setBalance(prev => Math.max(0, prev - selectedAmount));
        }
        setSelectedAmount(null);
        closeModal();
        setLoading(false);
        if (modalState.type === 'add') {
          setShowSuccessModal(true);
        }
      }, 3000);
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
    setSelectedAmount(null);
  };

  const presetAmounts = [10, 25, 50, 75, 100];

  // SVG Icons
  const ChevronRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"></polyline>
    </svg>
  );

  const DollarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );

  const HomeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9,22 9,12 15,12 15,22"></polyline>
    </svg>
  );

  const CreditCardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="M21 21l-4.35-4.35"></path>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
  );

  const XIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const PaycheckIcon = () => (
    <img src={paycheckImg} alt="Paycheck" className="w-full h-full object-cover rounded-full" />
  );

  const PiggyBankIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2.5l-1.1 4.4c-.3 1.2-1.4 2.1-2.7 2.1h-4.4c-1.3 0-2.4-.9-2.7-2.1L4 7.5C3.8 6.4 2.5 5 1 5a1 1 0 0 0 0 2c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5a1 1 0 0 0 0 2c1.5 0 2.8-1.4 3-2.5"></path>
      <circle cx="15.5" cy="8.5" r="1.5"></circle>
    </svg>
  );

  const BitcoinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.5 8h3a1.5 1.5 0 0 1 0 3h-3m0-3V6m0 2v3m0 0h3a1.5 1.5 0 0 1 0 3h-3m0-3v3m0 0v2"></path>
    </svg>
  );

  const BitcoinChart = () => (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
      <path 
        d="M2 20 L8 18 L14 16 L20 14 L26 12 L32 10 L38 8 L44 6 L46 4" 
        stroke="#F59E0B" 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M2 20 L8 18 L14 16 L20 14 L26 12 L32 10 L38 8 L44 6 L46 4 L46 20 L2 20" 
        fill="url(#bitcoinGradient)" 
        fillOpacity="0.1"
      />
      <defs>
        <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );

  // Balance Card Component
  const BalanceCard = () => (
    <div className="rounded-2xl p-6 mx-4 mb-4 hover:opacity-90 transition-all duration-300 shadow-lg" style={{ backgroundColor: '#333' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-medium">Cash balance</h2>
        <div className="text-gray-400 hover:text-gray-300 transition-colors">
          <ChevronRightIcon />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-white text-4xl font-bold mb-2">
          ${balance.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
        </div>
        <div className="text-gray-500 text-sm">
          Account ****4907  Routing ****663
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={handleAddMoney}
          className="text-white py-3 rounded-xl text-center font-medium hover:opacity-80 transition-all duration-200 transform hover:scale-105 active:scale-95" style={{ backgroundColor: '#444' }}
        >
          Add money
        </button>
        <button 
          onClick={handleWithdraw}
          className="text-white py-3 rounded-xl text-center font-medium hover:opacity-80 transition-all duration-200 transform hover:scale-105 active:scale-95" style={{ backgroundColor: '#444' }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );

  // Paychecks Card Component
  const PaychecksCard = () => (
    <div className="rounded-2xl p-6 mx-4 mb-4 hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer" style={{ backgroundColor: '#333' }}>
      <div className="flex items-center">
        <div className="mr-4 relative overflow-hidden rounded-full" style={{ width: 48, height: 48 }}>
          <img src={paycheckImg} alt="Paycheck" className="absolute inset-0 w-full h-full object-cover rounded-full" />
        </div>
        <div className="flex-1">
          <h3 className="text-white text-lg font-medium">Paychecks</h3>
          <p className="text-gray-500 text-sm">Get benefits with direct deposit</p>
        </div>
        <div className="text-gray-400 hover:text-gray-300 transition-colors">
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );

  // Savings Card Component
  const SavingsCard = () => (
    <div className="rounded-2xl p-6 mx-4 mb-4 hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer" style={{ backgroundColor: '#333' }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white text-lg font-medium mb-2">Savings</h3>
          <div className="text-white text-4xl font-bold mb-1">
            ${savings.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
          </div>
          <div className="text-green-400 text-sm font-medium">
            1.5% interest
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 rounded-full relative overflow-hidden flex items-center justify-center" style={{ width: 48, height: 48 }}>
            <img src={cashImg} alt="Cash" className="absolute inset-0 w-full h-full object-cover rounded-full" />
          </div>
          <div className="text-gray-400 hover:text-gray-300 transition-colors">
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </div>
  );

  // Bitcoin Card Component
  const BitcoinCard = () => (
    <div className="rounded-2xl p-6 mx-4 mb-4 hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer" style={{ backgroundColor: '#333' }}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white text-lg font-medium mb-2">Bitcoin</h3>
          <div className="text-white text-4xl font-bold mb-2">
            ${bitcoin.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
          </div>
          <div className="text-red-400 text-sm flex items-center font-medium">
            <span>↓</span>
            <span className="ml-1">0.23% today</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative overflow-hidden rounded-full" style={{ width: 72, height: 72 }}>
            <img src={bitcoinImg} alt="Bitcoin" className="absolute inset-0 w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation Component
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 w-full z-50 bg-black p-4">
      <div className="flex justify-around items-center">
        <div className="text-white">
          <img src="https://avatars.githubusercontent.com/u/157549891?s=200&v=4" alt="Home" className="w-10 h-10 object-contain" />
        </div>
        <div className="text-gray-400">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="8" width="24" height="16" rx="4" stroke="white" strokeWidth="2"/>
            <circle cx="8" cy="12" r="2" fill="white"/>
          </svg>
        </div>
        <div className="text-gray-400">
          <img src={footerImg} alt="Dollar" className="w-15 h-16 object-contain" />
        </div>
        <div className="text-gray-400">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
        <div className="relative">
          <div className="text-gray-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: '0.75rem', height: '18px', width: '18px' }}>
            1
          </div>
        </div>
      </div>
      <div className="bg-white h-1 w-32 rounded-full mx-auto mt-4 opacity-60"></div>
    </div>
  );

  // Modal Component
  const Modal = () => {
    if (!modalState.isOpen) return null;

    return (
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={closeModal}
        />
        
        {/* Modal sliding from bottom */}
        <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl p-6 pb-32 transform transition-all duration-300 ease-out translate-y-0" style={{ backgroundColor: '#333', height: '50vh' }}>
          {/* Handle bar */}
          <div className="w-12 h-1 bg-gray-500 rounded-full mx-auto mb-6"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl font-semibold">
              {modalState.type === 'add' ? 'Add Cash' : 'Withdraw Cash'}
            </h2>
          </div>
          
          <form onSubmit={handleModalSubmit}>
            {/* Preset amount buttons */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-4 px-6 rounded-2xl text-xl font-bold transition-all duration-200 ${
                    selectedAmount === amount
                      ? 'bg-blue-600 text-white'
                      : 'text-white hover:bg-gray-600'
                  }`}
                  style={{ backgroundColor: selectedAmount === amount ? '#3B82F6' : '#444' }}
                >
                  ${amount}
                </button>
              ))}
              <button
                type="button"
                className="py-4 px-6 rounded-2xl text-xl font-bold text-white hover:bg-gray-600 transition-all duration-200"
                style={{ backgroundColor: '#444' }}
                onClick={() => setShowCustomAmountModal(true)}
              >
                ...
              </button>
            </div>
            
            {/* Add button */}
            <div className="px-4">
              <button
                type="submit"
                disabled={!selectedAmount}
                className="w-[98%] bg-[#22c55e] text-white py-2.5 rounded-full font-bold text-xl transition-all duration-200 disabled:cursor-not-allowed mx-auto block"
              >
                {modalState.type === 'add' ? 'Add' : 'Withdraw'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Withdraw Modal
  const WithdrawModal = () => {
    if (!showWithdrawModal) return null;
    return (
      <div className="fixed inset-0 z-[100] flex flex-col justify-end items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="w-full max-w-sm mx-auto flex flex-col items-center rounded-t-3xl" style={{ backgroundColor: '#000', height: '50vh' }}>
          <div className="w-full flex-1 flex flex-col items-center pt-8">
            <h2 className="text-white text-xl font-bold mb-2">Withdraw</h2>
            <div className="text-gray-400 text-base mb-6">${balance.toFixed(2)} available</div>
            <div className="text-white text-5xl font-extrabold mb-8">${Number(cashOutValue).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
            {/* Slider */}
            <input
              type="range"
              min={0}
              max={Math.floor(balance)}
              step={1}
              value={cashOutValue}
              onChange={e => setCashOutValue(Number(e.target.value))}
              className="w-full mb-8 accent-green-500 h-2"
              style={{ accentColor: '#22c55e' }}
            />
          </div>
          <div className="w-full px-4 pb-8">
            <button
              className="w-full bg-[#22c55e] text-white py-3 rounded-full font-bold text-xl transition-all duration-200 mx-auto block"
              disabled={Number(cashOutValue) <= 0}
              onClick={() => {
                setShowWithdrawModal(false);
                setWithdrawAmount(Number(cashOutValue));
                setShowTransferOptionsModal(true);
              }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Transfer Options Modal
  const TransferOptionsModal = () => {
    if (!showTransferOptionsModal) return null;
    return (
      <div className="fixed inset-0 z-[101] flex flex-col justify-end items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="w-full max-w-sm mx-auto rounded-t-3xl" style={{ backgroundColor: '#18181b' }}>
          <div className="px-0 pt-6 pb-2">
            <div className="text-white text-base font-bold mb-4 px-6">How would you like to transfer ${Number(cashOutValue).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} to your external bank?</div>
            <div className="border-t border-white/20" />
            <button className="w-full text-white text-base font-medium py-4 flex items-center justify-between px-6" style={{ border: 'none', background: 'transparent' }}
              onClick={() => {
                setShowTransferOptionsModal(false);
                setTransferType('standard');
                setLoading(true);
                setTimeout(() => {
                  setBalance(prev => prev - cashOutValue);
                  setLastWithdrawnAmount(cashOutValue);
                  setShowSuccessModal(true);
                  setLoading(false);
                }, 3000);
              }}
            >
              <span>Standard (Friday)</span>
            </button>
            <div className="border-t border-white/20" />
            <button className="w-full text-white text-base font-medium py-4 flex items-center justify-between px-6" style={{ border: 'none', background: 'transparent' }}
              onClick={() => {
                setShowTransferOptionsModal(false);
                setTransferType('instant');
                setLoading(true);
                setTimeout(() => {
                  setBalance(prev => prev - cashOutValue);
                  setLastWithdrawnAmount(cashOutValue);
                  setShowSuccessModal(true);
                  setLoading(false);
                }, 3000);
              }}
            >
              <span className="flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#fff"/>
                </svg>
                Instant
              </span>
              <span className="text-white text-xs font-bold">$0.25 FEE</span>
            </button>
            <div className="border-t border-white/20" />
            <button className="w-full text-white text-base font-medium py-4 flex items-center justify-center" style={{ border: 'none', background: 'transparent' }} onClick={() => setShowTransferOptionsModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-black">
      <div className="flex-1 pb-20 w-full max-w-5xl mx-auto overflow-y-auto">
        <div className="flex justify-between items-center px-4 py-6 mb-2">
          <h1 className="text-white text-2xl font-semibold">Money</h1>
          <div className="relative">
            <div className="bg-blue-600 rounded-full p-3 hover:bg-blue-700 transition-colors cursor-pointer">
              <UserIcon />
            </div>
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              1
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BalanceCard />
          <PaychecksCard />
        </div>
        
        <div className="px-4 mb-4 mt-8">
          <h2 className="text-white text-lg font-semibold">Save & invest</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SavingsCard />
          <BitcoinCard />
        </div>
        <div className="px-4 mb-4 mt-8">
          <h2 className="text-white text-lg font-semibold">Explore</h2>
        </div>
      </div>
      
      <BottomNav />
      <Modal />
      <WithdrawModal />
      <TransferOptionsModal />

      {/* Custom Amount Modal */}
      {showCustomAmountModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between items-center" style={{ backgroundColor: '#000' }}>
          <div className="w-full max-w-sm mx-auto flex flex-col items-center pt-8">
            <h2 className="text-white text-2xl font-bold mb-8">Add Cash</h2>
            <div className="text-[#22c55e] text-6xl font-extrabold mb-8">${customAmount || 0}</div>
            <div className="grid grid-cols-3 gap-6 w-full px-8 mb-8 select-none">
              {[...'123456789.0⌫'].map((key, idx) => (
                <button
                  key={idx}
                  className="text-white text-3xl py-4 rounded-full hover:bg-[#333] transition-all"
                  style={{ minWidth: 0 }}
                  onClick={() => {
                    if (key === '⌫') {
                      setCustomAmount(customAmount.slice(0, -1));
                    } else if (key === '.' && customAmount.includes('.')) {
                      return;
                    } else if (key === '.' && !customAmount) {
                      setCustomAmount('0.');
                    } else {
                      setCustomAmount(customAmount + key);
                    }
                  }}
                  tabIndex={-1}
                  type="button"
                >
                  {key === '⌫' ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="19 7 12 14 5 7" /><polyline points="5 17 12 10 19 17" /></svg>
                  ) : key}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full px-4 pb-8">
            <button
              className="w-full bg-[#22c55e] text-white py-3 rounded-full font-bold text-xl transition-all duration-200 disabled:cursor-not-allowed"
              disabled={!customAmount || isNaN(Number(customAmount)) || Number(customAmount) <= 0}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setSelectedAmount(Number(customAmount));
                  setShowCustomAmountModal(false);
                  setCustomAmount('');
                  setLastAddedAmount(Number(customAmount));
                  setLoading(false);
                  setShowSuccessModal(true);
                }, 3000);
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: '#000' }}>
          <svg className="animate-spin" width="80" height="80" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#22c55e"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="90 150"
            />
          </svg>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-[101] flex flex-col justify-between" style={{ backgroundColor: '#000' }}>
          <div className="pt-16 pl-8 flex flex-col items-start">
            <div className="bg-[#22c55e] rounded-full flex items-center justify-center mb-6" style={{ width: 48, height: 48 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 10 18 4 12" /></svg>
            </div>
            <div className="text-white font-extrabold text-lg mb-12" style={{ lineHeight: 1.2, textAlign: 'left' }}>
              {lastAddedAmount ? (
                <>You added ${lastAddedAmount.toLocaleString()} to your Cash App</>
              ) : lastWithdrawnAmount ? (
                <>You withdrew ${lastWithdrawnAmount.toLocaleString()} from your Cash App</>
              ) : null}
            </div>
          </div>
          <div className="w-full px-4 pb-8">
            <button
              className="w-full bg-[#22c55e] text-white py-4 rounded-full font-bold text-xl transition-all duration-200 mx-auto block"
              style={{maxWidth: '100%'}}
              onClick={() => { setShowSuccessModal(false); setLastAddedAmount(null); setLastWithdrawnAmount(null); }}
            >
              Done
            </button>
          </div>
        </div>
      )}
      {showSuccessModal && transferType === 'instant' && (
        <div className="fixed inset-0 z-[101] flex flex-col justify-between" style={{ backgroundColor: '#000' }}>
          <div className="pt-12 pl-8 flex flex-col items-start">
            <div className="bg-[#22c55e] rounded-full flex items-center justify-center mb-6" style={{ width: 40, height: 40 }}>
              {/* Thunder bolt SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#fff"/>
              </svg>
            </div>
            <div className="text-white font-bold text-lg mb-12" style={{ lineHeight: 1.2, textAlign: 'left' }}>
              ${lastWithdrawnAmount?.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} was instantly deposited to your bank account
            </div>
          </div>
          <div className="w-full px-4 pb-8">
            <button
              className="w-full bg-[#22c55e] text-white py-4 rounded-full font-bold text-xl transition-all duration-200 mx-auto block"
              style={{maxWidth: '100%'}}
              onClick={() => { setShowSuccessModal(false); setLastWithdrawnAmount(null); setTransferType(''); }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;