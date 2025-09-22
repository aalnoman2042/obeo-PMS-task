import DepartmentSaleCard from "@/features/Dashboard/Components/DepartmentSaleCard";
import AccountRecivableCard from "@/features/Dashboard/Components/AccountRecivableCard";
import InfoCard from "@/features/Dashboard/Components/InfoCard";

// Dummy data
const cashData = [
  { name: "Cash in Hand", amount: 0.0 },
  { name: "M-Banking", amount: 0.0 },
  { name: "Cash At Bank", amount: 0.0 },
];

const loanData = [
  { name: "long term loans", amount: 0.00 },
  { name: "term loand (trust) A/c no.000", amount: 0.00 },
  { name: "short Term Loans", amount: 0.00 },
];

const inventoryData = [
  { name: "Tobacco", amount: 200.0 }, // Tobacco item with cost
  { name: "Cigarettes", amount: 150.5 }, // Another inventory item
  { name: "Alcohol", amount: 120.0 }, // Add more items as needed
];

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
        <DepartmentSaleCard revenueData={revenueData} />
        {/* account card */}
        <AccountRecivableCard reciveORpay={reciveORpay} />
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
