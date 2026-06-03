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
} from "lucide-react";

export const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    activePath: ["/dashboard"],
  },

  {
    name: "User Management",
    icon: Users,
    path: "#",
    activePath: ["/user-management/"],

    children: [
      {
        name: "Users",
        path: "/user-management/users",
        icon: List,
        activePath: ["/user-management/users/"],
      },
      {
        name: "Role & Permissions",
        path: "/user-management/roles",
        icon: UserPlus,
      },
    ],
  },

  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
    activePath: ["/admin/orders"],
  },

  {
    name: "Products",
    icon: Package,
    path: "/admin/products",
    activePath: [
      "/admin/products",
      "/admin/products/create",
      "/admin/products/edit",
    ],

    children: [
      {
        name: "All Products",
        path: "/admin/products",
        icon: List,
      },
      {
        name: "Add Product",
        path: "/admin/products/create",
        icon: Plus,
      },
    ],
  },

  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
    activePath: ["/admin/settings"],
  },
];
