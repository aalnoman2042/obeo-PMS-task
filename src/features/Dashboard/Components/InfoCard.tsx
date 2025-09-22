import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Modify the data structure to accept a dynamic list of items
interface InfoCardProps {
  title: string;
  description: string;
  data: { name: string; amount: number }[]; // Array of objects, each with a name and amount
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ description, data, color }) => {
  const calculateTotal = (data: { name: string; amount: number }[]) => {
    return data.reduce((total, item) => total + item.amount, 0).toFixed(2);
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2) + "৳";  // Format with Taka currency symbol
  };

  return (
    <Card className={`bg-white shadow-md rounded-lg ${color}`}>
      <CardHeader>
        <CardDescription className={`py-3 pl-3 bg-[#17A2B8] rounded-b-sm text-white`}>{description}</CardDescription>
        <CardTitle className={`text-2xl font-semibold tabular-nums text-gray-800`}>
          <div>
            {/* Dynamically display each inventory or loan item */}
            {data.map((item) => (
              <div key={item.name} className="flex justify-between">
                <p>{item.name}</p>
                <p>{formatCurrency(item.amount)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 border-t pt-2">
            <p className="font-semibold">Total:</p>
            <p className="font-semibold">{formatCurrency(parseFloat(calculateTotal(data)))}</p>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default InfoCard;
