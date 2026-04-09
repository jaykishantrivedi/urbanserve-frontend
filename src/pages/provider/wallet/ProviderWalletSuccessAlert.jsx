export default function ProviderWalletSuccessAlert({ successMsg }) {
  if (!successMsg) return null;

  return (
    <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200 animate-fade-in">
      {successMsg}
    </div>
  );
}
