
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ITEMS } from '@/lib/roles';
import { cn } from '@/lib/utils'; // Assuming cn exists or I'll implement it inline if not
import * as Icons from 'lucide-react';
import { LogOut } from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';

export default function Sidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    if (!session?.user) return null;

    const userRole = session.user.role;

    const allowedMenuItems = MENU_ITEMS.filter((item) =>
        item.roles.includes(userRole)
    );

    const LucideIcon = ({ name }: { name: string }) => {
        const Icon = (Icons as any)[name];
        return Icon ? <Icon className="mr-3 h-5 w-5" /> : null;
    };

    return (
        <div className="flex flex-col h-screen w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800">
            <div className="flex h-16 items-center px-6 border-b dark:border-gray-800">
                <h1 className="text-xl font-bold dark:text-white">Commodities<span className="text-indigo-600">App</span></h1>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {allowedMenuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                            )}
                        >
                            {item.icon && <LucideIcon name={item.icon} />}
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t p-4 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <ThemeToggle />
                </div>
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {session.user.name || session.user.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            {userRole}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="mt-4 flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
