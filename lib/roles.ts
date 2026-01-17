
export const ROLES = {
  MANAGER: 'MANAGER',
  STORE_KEEPER: 'STORE_KEEPER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface MenuItem {
  label: string;
  href: string;
  roles: Role[];
  icon?: string; // We can use lucide icon names here or actual components if we change this type
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    roles: [ROLES.MANAGER],
    icon: 'LayoutDashboard',
  },
  {
    label: 'Products',
    href: '/products',
    roles: [ROLES.MANAGER, ROLES.STORE_KEEPER],
    icon: 'Package',
  },
//   {
//     label: 'Add Product',
//     href: '/products/add',
//     roles: [ROLES.MANAGER, ROLES.STORE_KEEPER],
//     icon: 'PlusCircle',
//   },
];
