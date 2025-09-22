import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reciveORpay } from "../types/types";


const AccountReceivableCard: React.FC<{ reciveORpay: reciveORpay }> = ({ reciveORpay }) => {
    return (
        <div className="w-full max-w-xl mx-auto">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="bg-[#17A2B8] rounded-b-lg pl-3 py-3 text-white">
                        Account Receivable / Payable
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums w-full">
                        <div className="flex flex-wrap gap-4 justify-between">
                            {/* Receivable */}
                            <div className="flex items-center">
                                <div className="w-10 h-3 bg-[#4BC0C0]"></div>
                                <p className="ml-2 text-sm sm:text-base">Receivable</p>
                            </div>
                            {/* Payable */}
                            <div className="flex items-center">
                                <div className="w-10 h-3 bg-[#36A2EB]"></div>
                                <p className="ml-2 text-sm sm:text-base">Payable</p>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>

                {/* Display dynamic revenue values */}
                <div className="mx-auto p-4">
                    <ul role="list" className="list-disc marker:text-black text-sm sm:text-base">
                        <li className="text-2xl text-[#4BC0C0]">Receivable: {reciveORpay.recivable.toFixed(2)}৳</li>
                        <li className="text-2xl text-[#36A2EB]">Payable: {reciveORpay.Payable.toFixed(2)}৳</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default AccountReceivableCard;
