/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import {
  IconCamera,

  IconDashboard,

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
import { NavDocuments } from "./nav-documents"
import { NavSecondary } from "./nav-secondary"
import { NavMain } from "./nav-main"
import FinanceYear from "@/features/account/pages/FinanceYear"

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
