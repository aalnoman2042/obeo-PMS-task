import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamic revenue data as an example
const DepartmentSaleCard = ({ revenueData }: { revenueData: { roomRevenue: number, restaurantRevenue: number, banquetRevenue: number, otherRevenue: number } }) => {
    return (
        <div>
            <Card className="@container/card">
                <CardHeader>
                    {/* Card description with fixed background color */}
                    <CardDescription className="bg-[#17A2B8] py-3 pl-3 text-white">Department Sale</CardDescription>

                    {/* Card Title with dynamic color matching revenue bars */}
                    <CardTitle className="text-xl font-semibold tabular-nums  w-[90%]">
                        <div className="flex">
                            {/* Room Revenue */}
                            <div className="flex items-center">
                                <div className="w-10 h-3 bg-[#7FDB9B]"></div>
                                <p className="ml-2">Room Revenue</p>
                            </div>
                            {/* Restaurant Revenue */}
                            <div className="flex items-center ml-4">
                                <div className="w-10 h-3 bg-[#83EDED]"></div>
                                <p className="ml-2">Restaurant Revenue</p>
                            </div>
                            {/* Banquet Revenue */}
                            <div className="flex items-center ml-4">
                                <div className="w-10 h-3 bg-[#CB7ECF]"></div>
                                <p className="ml-2">Banquet Revenue</p>
                            </div>
                            {/* Other Outlet Revenue */}
                            <div className="flex items-center ml-4">
                                <div className="w-10 h-3 bg-[#E7C16C]"></div>
                                <p className="ml-2">Other Outlet Revenue</p>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>

                {/* Display dynamic revenue values */}
                <div className="mx-auto">
                    <ul role="list" className="list-disc marker:text-black">
                        <li>Room Revenue: {revenueData.roomRevenue.toFixed(2)}৳</li>
                        <li>Restaurant Revenue: {revenueData.restaurantRevenue.toFixed(2)}৳</li>
                        <li>Banquet Revenue: {revenueData.banquetRevenue.toFixed(2)}৳</li>
                        <li>Other Outlets Revenue: {revenueData.otherRevenue.toFixed(2)}৳</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default DepartmentSaleCard;
