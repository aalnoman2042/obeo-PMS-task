
import * as React from "react"
import {
  IconCamera,



  IconFileAi,
  IconFileDescription,
  
  IconHelp,
  IconInnerShadowTop,

  IconSearch,
  IconSettings,
 
} from "@tabler/icons-react"

// import { NavMain } from "@/components/nav-main"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavMain } from "./nav-main"
import FinanceYear from "@/features/account/pages/FinanceYear"
import ContraVoucher from "@/features/account/pages/ContraVoucher"
import JournalVoucher from "@/features/account/pages/JournalVoucher"
import VoucherApproval from "@/features/account/pages/VoucherApproval"
import { BalanceSheetPage } from "@/features/account/Report/pages/BalanceSheetPage"
import { VoucherReport } from "@/features/account/Report/pages/VoucherReport"
import TrialBalanceReport from "@/features/account/Report/pages/TrialBalance"

const data = {
  
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      // icon: IconDashboard,
    },
    {
      title: "Finance year",
      Component: FinanceYear,
      url: "account/finance-year"
    },
    {
      title: "opening Balance",
      Component: FinanceYear,
      url: "account/opening-balance"
    },
    {
      title: "debit Voucher",
      Component: FinanceYear,
      url: "account/debit-voucher"
    },
    {
      title: "credit voucher",
      Component: FinanceYear,
      url: "account/credit-voucher"
    },
    {
      title: "contra voucher",
      Component: ContraVoucher,
      url: "account/contra-voucher"
    },
    {
      title: "Journal Voucher",
      Component: JournalVoucher,
      url: "account/journal-voucher"
    },
    {
      title: "Voucher approval",
      Component: VoucherApproval,
      url: "account/voucher-approval"
    },
    {
      title: "balance sheet",
      Component: BalanceSheetPage,
      url: "account/balance-sheet"
    },
    {
      title: "Voucher Report",
      Component: VoucherReport,
      url: "account/voucher-report"
    },
    {
      title: "trial Balance",
      Component: TrialBalanceReport,
      url: "account/trial-balance"
    },
    
    
   
    
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    
    
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-[#00273A]">
      <SidebarHeader className="bg-[#00273A]">
        <SidebarMenu >
          <SidebarMenuItem> 
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5 " />
                <span className="text-[#17A2B8] font-semibold">Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
