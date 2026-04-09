import { useState, useEffect } from "react";
import {
  DollarSign,
  Mail,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { useGetAdminSettingsQuery, useUpdateAdminSettingsMutation } from "../../redux/adminDashboardApi";
import { toast } from "react-toastify";
import FinancialSettingsSection from "./settings/FinancialSettingsSection";
import IntegrationsSection from "./settings/IntegrationsSection";
import NotificationChannelsSection from "./settings/NotificationChannelsSection";
import PlatformSettingsSection from "./settings/PlatformSettingsSection";
import SettingsPageHeader from "./settings/SettingsPageHeader";

export function AdminSettingsPage() {
  const { data, isLoading } = useGetAdminSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateAdminSettingsMutation();

  const [platformName, setPlatformName] = useState("UrbanServe");
  const [currency, setCurrency] = useState("INR");
  const [timeFormat, setTimeFormat] = useState("12-hour");
  const [commission, setCommission] = useState(15);
  const [minimumWalletBalance, setMinimumWalletBalance] = useState(100);
  const [maximumCashLimit, setMaximumCashLimit] = useState(5000);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    if (data?.settings) {
      setPlatformName(data.settings.platformName || "UrbanServe");
      setCurrency(data.settings.currency || "INR");
      setTimeFormat(data.settings.timeFormat || "12-hour");
      setCommission(data.settings.platformCommission ?? 15);
      setMinimumWalletBalance(data.settings.minimumWalletBalance ?? 100);
      setMaximumCashLimit(data.settings.maximumCashLimit ?? 5000);
      setEmailNotifications(data.settings.emailNotifications ?? true);
      setSmsNotifications(data.settings.smsNotifications ?? true);
      setPushNotifications(data.settings.pushNotifications ?? false);
    }
  }, [data]);

  const integrations = [
    {
      name: "Email Service",
      provider: "Nodemailer",
      status: "Active",
      icon: Mail,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
    },
    {
      name: "Google Authentication",
      provider: "Firebase",
      status: "Enabled",
      icon: CheckCircle,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-50",
    },
    {
      name: "Payment Gateway",
      provider: "Razorpay",
      status: "Connected",
      icon: DollarSign,
      iconColor: "text-indigo-600",
      iconBgColor: "bg-indigo-50",
    },
    {
      name: "SMS Service",
      provider: "Twilio",
      status: "Active",
      icon: MessageSquare,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
    },
  ];

  const handleSavePlatformSettings = async () => {
    try {
      await updateSettings({ platformName, currency, timeFormat }).unwrap();
      toast.success("Platform settings saved successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save platform settings");
    }
  };

  const handleSaveCommissionSettings = async () => {
    try {
      await updateSettings({
        platformCommission: commission,
        minimumWalletBalance: Number(minimumWalletBalance),
        maximumCashLimit: Number(maximumCashLimit),
      }).unwrap();
      toast.success("Commission & Financial rules saved successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save financial settings");
    }
  };

  const handleSaveNotificationSettings = async () => {
    try {
      await updateSettings({ emailNotifications, smsNotifications, pushNotifications }).unwrap();
      toast.success("Notification preferences saved successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save notification settings");
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading backend settings mapping...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <SettingsPageHeader />

      <PlatformSettingsSection
        platformName={platformName}
        onPlatformNameChange={setPlatformName}
        currency={currency}
        onCurrencyChange={setCurrency}
        timeFormat={timeFormat}
        onTimeFormatChange={setTimeFormat}
        onSave={handleSavePlatformSettings}
        isUpdating={isUpdating}
      />

      <FinancialSettingsSection
        commission={commission}
        onCommissionChange={setCommission}
        minimumWalletBalance={minimumWalletBalance}
        onMinimumWalletBalanceChange={setMinimumWalletBalance}
        maximumCashLimit={maximumCashLimit}
        onMaximumCashLimitChange={setMaximumCashLimit}
        currency={currency}
        onSave={handleSaveCommissionSettings}
        isUpdating={isUpdating}
      />

      <NotificationChannelsSection
        emailNotifications={emailNotifications}
        onEmailNotificationsChange={setEmailNotifications}
        smsNotifications={smsNotifications}
        onSmsNotificationsChange={setSmsNotifications}
        pushNotifications={pushNotifications}
        onPushNotificationsChange={setPushNotifications}
        onSave={handleSaveNotificationSettings}
        isUpdating={isUpdating}
      />

      <IntegrationsSection integrations={integrations} />
    </div>
  );
}

export default AdminSettingsPage;
