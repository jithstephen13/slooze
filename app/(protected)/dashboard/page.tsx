
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROLES } from '@/lib/roles';
import { ShoppingCart, Package, DollarSign, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.user?.role && session.user.role !== ROLES.MANAGER) {
            router.push('/products'); // Redirect unauthorized roles to a safe page
        }
    }, [session, router]);

    if (!session || session.user.role !== ROLES.MANAGER) {
        return null; // Or a loading spinner while redirecting
    }

    const stats = [
        { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign },
        { name: 'Active Subscriptions', value: '+2350', change: '+180.1%', icon: TrendingUp },
        { name: 'Sales', value: '+12,234', change: '+19%', icon: ShoppingCart },
        { name: 'Active Now', value: '+573', change: '+201 since last hour', icon: Package },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {stat.name}
                            </h3>
                            <stat.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {stat.change} from last month
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    No recent activity to display.
                </p>
            </div>
        </div>
    );
}
