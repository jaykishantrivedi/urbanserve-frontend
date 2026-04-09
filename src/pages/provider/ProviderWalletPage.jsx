import { useState } from 'react';
import {
  useCreateWalletOrderMutation,
  useDebitWalletMutation,
  useGetWalletDetailsQuery,
  useVerifyWalletPaymentMutation,
} from '../../redux/walletApi';
import { useGetProviderProfileQuery } from '../../redux/providerApi';
import { useGetAdminSettingsQuery } from '../../redux/adminDashboardApi';
import ProviderWalletBalanceCard from './wallet/ProviderWalletBalanceCard';
import ProviderWalletHeader from './wallet/ProviderWalletHeader';
import ProviderWalletLoadingState from './wallet/ProviderWalletLoadingState';
import ProviderWalletRechargeForm from './wallet/ProviderWalletRechargeForm';
import ProviderWalletSuccessAlert from './wallet/ProviderWalletSuccessAlert';
import ProviderWalletTransactionsCard from './wallet/ProviderWalletTransactionsCard';
import ProviderWalletWithdrawForm from './wallet/ProviderWalletWithdrawForm';

const ProviderWalletPage = () => {
  const { data: walletData, isLoading: walletLoading, refetch } = useGetWalletDetailsQuery();
  const { data: providerData } = useGetProviderProfileQuery();
  const [createOrder, { isLoading: isOrdering }] = useCreateWalletOrderMutation();
  const [verifyPayment, { isLoading: isVerifying }] = useVerifyWalletPaymentMutation();
  const [debitWallet, { isLoading: isDebiting }] = useDebitWalletMutation();
  const { data: settingData } = useGetAdminSettingsQuery();

  const [amount, setAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [withdrawErrorMsg, setWithdrawErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleAddMoney = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!amount || amount < 10) {
      setErrorMsg('Please enter a valid amount (minimum Rs10).');
      return;
    }

    try {
      const orderData = await createOrder({ amount: Number(amount) }).unwrap();

      if (!orderData || !orderData.order) {
        throw new Error('Failed to create order');
      }

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        setErrorMsg('Razorpay SDK failed to load');
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || 'YOUR_TEST_KEY',
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'Platform Wallet',
        description: 'Wallet Recharge',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyPayload = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount,
            };

            await verifyPayment(verifyPayload).unwrap();
            setAmount('');
            setSuccessMsg('Money added successfully!');
            refetch();
          } catch (verifyErr) {
            setErrorMsg(verifyErr?.data?.message || 'Payment Verification Failed');
          }
        },
        prefill: {
          name: providerData?.profile?.businessName || 'Provider',
        },
        theme: {
          color: '#2563EB',
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', function (response) {
        setErrorMsg(response.error.description || 'Payment Failed');
      });

      rzp1.open();
    } catch (err) {
      setErrorMsg(err?.data?.message || err.message || err?.error?.description || 'An error occurred while adding money.');
    }
  };

  const handleWithdrawMoney = async (event) => {
    event.preventDefault();
    setWithdrawErrorMsg('');
    setSuccessMsg('');

    if (!withdrawAmount || withdrawAmount < 10) {
      setWithdrawErrorMsg('Minimum withdrawal amount is Rs10.');
      return;
    }

    try {
      await debitWallet({ amount: Number(withdrawAmount), description: 'Wallet Withdrawal' }).unwrap();
      setWithdrawAmount('');
      setSuccessMsg('Withdrawal processed successfully!');
    } catch (err) {
      setWithdrawErrorMsg(err?.data?.message || err.message || 'An error occurred during withdrawal.');
    }
  };

  if (walletLoading) return <ProviderWalletLoadingState />;

  const balance = walletData?.balance || 0;
  const transactions = walletData?.transactions || [];
  const minimumWalletBalance = settingData?.settings?.minimumWalletBalance || 0;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ProviderWalletHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <ProviderWalletBalanceCard
            balance={balance}
            minimumWalletBalance={minimumWalletBalance}
          />

          <ProviderWalletSuccessAlert successMsg={successMsg} />

          <ProviderWalletRechargeForm
            errorMsg={errorMsg}
            amount={amount}
            setAmount={setAmount}
            isOrdering={isOrdering}
            isVerifying={isVerifying}
            onSubmit={handleAddMoney}
          />

          <ProviderWalletWithdrawForm
            withdrawErrorMsg={withdrawErrorMsg}
            withdrawAmount={withdrawAmount}
            setWithdrawAmount={setWithdrawAmount}
            isDebiting={isDebiting}
            onSubmit={handleWithdrawMoney}
          />
        </div>

        <div className="lg:col-span-2">
          <ProviderWalletTransactionsCard transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default ProviderWalletPage;
