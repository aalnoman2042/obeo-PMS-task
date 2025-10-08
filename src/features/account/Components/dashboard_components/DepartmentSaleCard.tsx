import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamic revenue data as an example
const DepartmentSaleCard = ({ revenueData }: { revenueData: { roomRevenue: number, restaurantRevenue: number, banquetRevenue: number, otherRevenue: number } }) => {
    return (
        <div className=" w-full h-full mx-auto">
            <Card className="@container/card">
                <CardHeader>
                    {/* Card description with fixed background color */}
                    <CardDescription className="bg-[#17A2B8] py-3 pl-3 rounded-b-lg text-white">
                        Department Sale
                    </CardDescription>

                    {/* Card Title with dynamic color matching revenue bars */}
                    <CardTitle className="text-xl font-semibold tabular-nums w-full">
                        <div className="flex flex-wrap gap-4">
                            {/* Room Revenue */}
                            <div className="flex items-center">
                                <div className="w-10 h-3 bg-[#7FDB9B]"></div>
                                <p className="ml-2 text-sm">Room Revenue</p>
                            </div>
                            {/* Restaurant Revenue */}
                            <div className="flex items-center">
                                <div className="w-10 h-3 bg-[#83EDED]"></div>
                                <p className="ml-2 text-sm">Restaurant Revenue</p>
                            </div>
                            {/* Banquet Revenue */}
                            <div className="flex items-center">
                                <div className="w-10 h-3 bg-[#CB7ECF]"></div>
                                <p className="ml-2 text-sm">Banquet Revenue</p>
                            </div>
                            {/* Other Outlet Revenue */}
                            <div className="flex items-center">
                                <div className="w-10 h-3 bg-[#E7C16C]"></div>
                                <p className="ml-2 text-sm">Other Outlet Revenue</p>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>

                {/* Display dynamic revenue values */}
                <div className="mx-auto p-4">
                    <ul role="list" className="list-disc marker:text-black text-sm sm:text-base">
                        <li className="text-[#7FDB9B]">Room Revenue: {revenueData.roomRevenue.toFixed(2)}৳</li>
                        <li className="text-[#83EDED]">Restaurant Revenue: {revenueData.restaurantRevenue.toFixed(2)}৳</li>
                        <li className="text-[#CB7ECF]">Banquet Revenue: {revenueData.banquetRevenue.toFixed(2)}৳</li>
                        <li className="text-[#E7C16C]">Other Outlets Revenue: {revenueData.otherRevenue.toFixed(2)}৳</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default DepartmentSaleCard;
