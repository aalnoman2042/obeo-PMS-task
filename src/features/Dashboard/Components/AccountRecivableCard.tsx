import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamic revenue data interface
interface reciveORpay {
  recivable: number;
  Payable: number;
}

const AccountReceivableCard: React.FC<{ reciveORpay: reciveORpay }> = ({ reciveORpay }) => {
    return (
        <div>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="bg-[#17A2B8] pl-3 py-3 text-white">
                        Account Receivable / Payable
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums  w-[90%]">
                        <div className="flex">
                            {/* Room Revenue */}
                            <div className="flex items-center">
                                <div className="w-10 h-3 bg-[#4BC0C0]"></div>
                                <p className="ml-2">Room Revenue</p>
                            </div>
                            {/* Restaurant Revenue */}
                            <div className="flex items-center ml-4">
                                <div className="w-10 h-3 bg-[#36A2EB]"></div>
                                <p className="ml-2">Restaurant Revenue</p>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>

                {/* Display dynamic revenue values */}
                <div className="mx-auto">
                    <ul role="list" className="list-disc marker:text-black">
                        <li>Room Revenue: {reciveORpay.recivable.toFixed(2)}৳</li>
                        <li>Restaurant Revenue: {reciveORpay.Payable.toFixed(2)}৳</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default AccountReceivableCard;
