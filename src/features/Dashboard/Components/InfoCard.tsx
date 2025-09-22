import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  description: string;
  data: { cashInHand: number; mBanking: number; cashAtBank: number };
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({  description, data, color }) => {
  const calculateTotal = (data: { cashInHand: number; mBanking: number; cashAtBank: number }) => {
    return (data.cashInHand + data.mBanking + data.cashAtBank).toFixed(2);
  };

  return (
    <Card className={`bg-white shadow-md rounded-lg ${color}`}>
      <CardHeader>
        <CardDescription className={`py-3 pl-3 bg-[#17A2B8] rounded-b-sm text-white`}>{description}</CardDescription>
        <CardTitle className={`text-2xl font-semibold tabular-nums  text-gray-800`}>
          <div>
            <div className="flex justify-between">
              <p>Cash in Hand</p>
              <p>{data.cashInHand}</p>
            </div>
            <div className="flex justify-between">
              <p>M-Banking</p>
              <p>{data.mBanking}</p>
            </div>
            <div className="flex justify-between">
              <p>Cash At Bank</p>
              <p>{data.cashAtBank}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4 border-t pt-2">
            <p className="font-semibold">Total:</p>
            <p className="font-semibold">{calculateTotal(data)}</p>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default InfoCard;
