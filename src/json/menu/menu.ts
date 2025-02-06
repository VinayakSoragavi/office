import {
  LayoutDashboard,
  User,
  Users,
  Settings,
  CreditCard,
  FileText,
  FolderKanban,
  Store,
  BarChart,
  LineChart,
  PieChart,
  Layout,
  UserPlus,
  UserCog,
  Receipt,
  CreditCardIcon as BillingCard,
  Wallet,
} from "lucide-react"

export const menuItems = [
    // {
    //   title: "Dashboards",
    //   icon: LayoutDashboard,
    //   path: "/dashboard",
    //   submenu: [
    //     { title: "Analytics", icon: BarChart, path: "/dashboard/analytics" },
    //     { title: "Statistics", icon: LineChart, path: "/dashboard/statistics" },
    //     { title: "Reports", icon: PieChart, path: "/dashboard/reports" },
    //   ],
    // },
    {
      title: "Pages",
      isHeader: true,
      submenu: [
        // {
        //   title: "Profile",
        //   icon: User,
        //   path: "/profile",
        //   submenu: [
        //     { title: "Overview", icon: Layout, path: "/profile/overview" },
        //     { title: "Settings", icon: UserCog, path: "/profile/settings" },
        //   ],
        // },
        {
          title: "Visitor",
          icon: Users,
          path: "/users",
          submenu: [
            { title: "Visitor", icon: Users, path: "/visitor" },
            { title: "Pre Approvels", icon: UserPlus, path: "/preapproval" },
          ],
        },
        {
          title: "Contractor",
          icon: UserPlus,
          path: "/contractor",
        //   submenu: [
        //     { title: "Invoices", icon: Receipt, path: "/billing/invoices" },
        //     { title: "Cards", icon: BillingCard, path: "/billing/cards" },
        //     { title: "Transactions", icon: Wallet, path: "/billing/transactions" },
        //   ],
        },
        // { title: "Settings", icon: Settings, path: "/settings" },
        // { title: "Invoice", icon: FileText, path: "/invoice" },
        // { title: "Projects", icon: FolderKanban, path: "/projects" },
        // { title: "Pricing", icon: Store, path: "/pricing" },
      ],
    },
  ]