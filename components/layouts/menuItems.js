// components/layout/menuItems.js

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  Package,
  UserPlus,
  List,
  Plus,
  Vault,
  ChartBarStacked,
  Banknote,
  UtensilsCrossed,
  AlignVerticalSpaceBetween,
  PanelTopDashed,
  Dock,
} from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";

export const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    activePath: ["/dashboard"],
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/order",
    activePath: ["/order"],
  },

  {
    name: "Menu Management",
    icon: Dock,
    path: "#",
    activePath: ["/product-management/"],

    children: [
      {
        name: "Category",
        path: "/product-management/categories",
        icon: AlignVerticalSpaceBetween,
      },
      {
        name: "Menu Items",
        path: "/product-management/products",
        icon: UtensilsCrossed,
      },
    ],
  },

  {
    name: "Tables",
    icon: Vault,
    path: "/tables",
    activePath: ["/tables"],
  },
  {
    name: "Others Expense",
    icon: Banknote,
    path: "/expenses",
    activePath: ["/expenses"]
  },
   {
    name: "Users",
    icon: Users,
    path: "/user-management/users",
    activePath: ["/user-management/users"],
  },
   {
    name: "Packages",
    icon: Users,
    path: "/package-management",
    activePath: ["/user-management"],
  },
];
