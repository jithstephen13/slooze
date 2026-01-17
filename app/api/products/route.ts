
import { NextResponse } from 'next/server';

let products = [
    { id: '1', name: 'Premium Coffee Beans', sku: 'CB-001', stock: 150, price: 29.99, category: 'Beverages' },
    { id: '2', name: 'Organic Green Tea', sku: 'GT-002', stock: 85, price: 15.50, category: 'Beverages' },
    { id: '3', name: 'Raw Honey 500g', sku: 'RH-003', stock: 40, price: 12.00, category: 'Pantry' },
    { id: '4', name: 'Almond Milk 1L', sku: 'AM-004', stock: 200, price: 4.50, category: 'Beverages' },
    { id: '5', name: 'Oatmeal 1kg', sku: 'OM-005', stock: 120, price: 6.99, category: 'Breakfast' },
];

export async function GET() {
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        ...body,
    };
    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
}
