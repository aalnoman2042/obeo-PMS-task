// import InfoCard from "@/components/InfoCard";  // Importing the reusable InfoCard component
import DepartmentSaleCard from "@/features/Dashboard/Components/DepartmentSaleCard";
import AccountRecivableCard from "@/features/Dashboard/Components/AccountRecivableCard";
import InfoCard from "@/features/Dashboard/Components/InfoCard";

// Dummy data
const cashData = {
  cashInHand: 0.0,
  mBanking: 0.0,
  cashAtBank: 0.0,
};

const loanData = {
  cashInHand: 1.5,
  mBanking: 2.3,
  cashAtBank: 3.0,
};

const inventoryData = {
  cashInHand: 2.0,
  mBanking: 1.1,
  cashAtBank: 0.5,
};

  const revenueData = {
    roomRevenue: 12000.50,
    restaurantRevenue: 8500.00,
    banquetRevenue: 3000.75,
    otherRevenue: 1000.00,
  };
  const reciveORpay = {
    recivable: 15000.50,
    Payable: 12000.75,
  };
export function SectionCards() {
  return (
    <div className="grid grid-flow-col grid-rows-2 gap-5">
      <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
        {/* department sale card */}
        <DepartmentSaleCard revenueData={revenueData}></DepartmentSaleCard>
        {/* account card */}
        <AccountRecivableCard reciveORpay={reciveORpay}></AccountRecivableCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Reusable Info Cards */}
        <InfoCard
          title="Cash & Cash Equivalent"
          description="Cash & Cash Equivalent"
          data={cashData}
          color="bg-[#DBFDFF]"
        />
        <InfoCard
          title="Loans"
          description="Loans"
          data={loanData}
          color="bg-[#FAEAF8]"
        />
        <InfoCard
          title="Inventory"
          description="Inventory"
          data={inventoryData}
          color="bg-[#FBFDE3]"
        />
      </div>
    </div>
  );
}
