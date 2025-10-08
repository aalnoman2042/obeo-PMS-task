"use client"

import DayChartOfRevenue from "@/features/account/Components/dashboard_components/dayChartOfRevenue"
import MonthlyRevenueChart from "@/features/account/Components/dashboard_components/MonthlyRevenueChart"
import DashboardOverview from "@/features/account/Components/dashboard_components/DashboardOverview"

export const description = "An interactive area chart"




export function ChartAreaInteractive() {
 


  return (
    
  <div>
    <DashboardOverview></DashboardOverview>
      <div className="grid md:grid-cols-2 grid-cols-1">
     <div className="">
      {/* chart of every day */}
       <DayChartOfRevenue  ></DayChartOfRevenue>
     </div>
      <div className="">
        {/* revenue chart of every month */}
        <MonthlyRevenueChart></MonthlyRevenueChart>
      </div>
    </div>
  </div>
  )
}
