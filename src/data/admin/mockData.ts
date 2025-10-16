export interface Order {
  id: string;
  customer: string;
  amount: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  orders: number;
  avatar: string;
}

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'John Doe', amount: 299.99, date: '2025-10-12', status: 'delivered' },
  { id: 'ORD-002', customer: 'Jane Smith', amount: 149.50, date: '2025-10-12', status: 'processing' },
  { id: 'ORD-003', customer: 'Bob Johnson', amount: 89.99, date: '2025-10-11', status: 'shipped' },
  { id: 'ORD-004', customer: 'Alice Brown', amount: 199.99, date: '2025-10-11', status: 'pending' },
  { id: 'ORD-005', customer: 'Charlie Wilson', amount: 449.99, date: '2025-10-10', status: 'delivered' },
  { id: 'ORD-006', customer: 'Eva Martinez', amount: 79.99, date: '2025-10-10', status: 'cancelled' },
  { id: 'ORD-007', customer: 'David Lee', amount: 329.99, date: '2025-10-09', status: 'delivered' },
  { id: 'ORD-008', customer: 'Sarah Taylor', amount: 159.99, date: '2025-10-09', status: 'processing' },
];

export const products: Product[] = [
  { id: 'PRD-001', name: 'Wireless Headphones', price: 79.99, stock: 45, category: 'Electronics', image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'PRD-002', name: 'Smart Watch', price: 199.99, stock: 23, category: 'Electronics', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'PRD-003', name: 'Laptop Stand', price: 49.99, stock: 67, category: 'Accessories', image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'PRD-004', name: 'USB-C Hub', price: 39.99, stock: 89, category: 'Accessories', image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'PRD-005', name: 'Mechanical Keyboard', price: 129.99, stock: 34, category: 'Electronics', image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'PRD-006', name: 'Wireless Mouse', price: 29.99, stock: 112, category: 'Electronics', image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'PRD-007', name: 'Monitor 27"', price: 349.99, stock: 18, category: 'Electronics', image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'PRD-008', name: 'Desk Lamp', price: 39.99, stock: 56, category: 'Furniture', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export const customers: Customer[] = [
  { id: 'CST-001', name: 'John Doe', email: 'john.doe@example.com', joinedDate: '2024-05-15', orders: 12, avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff' },
  { id: 'CST-002', name: 'Jane Smith', email: 'jane.smith@example.com', joinedDate: '2024-06-20', orders: 8, avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff' },
  { id: 'CST-003', name: 'Bob Johnson', email: 'bob.johnson@example.com', joinedDate: '2024-07-10', orders: 15, avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=f59e0b&color=fff' },
  { id: 'CST-004', name: 'Alice Brown', email: 'alice.brown@example.com', joinedDate: '2024-08-05', orders: 6, avatar: 'https://ui-avatars.com/api/?name=Alice+Brown&background=ef4444&color=fff' },
  { id: 'CST-005', name: 'Charlie Wilson', email: 'charlie.wilson@example.com', joinedDate: '2024-09-12', orders: 10, avatar: 'https://ui-avatars.com/api/?name=Charlie+Wilson&background=8b5cf6&color=fff' },
  { id: 'CST-006', name: 'Eva Martinez', email: 'eva.martinez@example.com', joinedDate: '2024-09-25', orders: 4, avatar: 'https://ui-avatars.com/api/?name=Eva+Martinez&background=ec4899&color=fff' },
  { id: 'CST-007', name: 'David Lee', email: 'david.lee@example.com', joinedDate: '2024-10-01', orders: 9, avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=06b6d4&color=fff' },
  { id: 'CST-008', name: 'Sarah Taylor', email: 'sarah.taylor@example.com', joinedDate: '2024-10-08', orders: 5, avatar: 'https://ui-avatars.com/api/?name=Sarah+Taylor&background=84cc16&color=fff' },
];

export const salesData = [
  { month: 'Jan', sales: 12000, orders: 120, revenue: 45000 },
  { month: 'Feb', sales: 19000, orders: 150, revenue: 52000 },
  { month: 'Mar', sales: 15000, orders: 135, revenue: 48000 },
  { month: 'Apr', sales: 22000, orders: 180, revenue: 61000 },
  { month: 'May', sales: 28000, orders: 220, revenue: 75000 },
  { month: 'Jun', sales: 25000, orders: 200, revenue: 68000 },
  { month: 'Jul', sales: 32000, orders: 250, revenue: 82000 },
  { month: 'Aug', sales: 35000, orders: 280, revenue: 91000 },
  { month: 'Sep', sales: 30000, orders: 240, revenue: 78000 },
  { month: 'Oct', sales: 38000, orders: 300, revenue: 98000 },
];

export const categoryData = [
  { name: 'Electronics', value: 45, sales: 125000 },
  { name: 'Accessories', value: 30, sales: 82000 },
  { name: 'Furniture', value: 15, sales: 45000 },
  { name: 'Other', value: 10, sales: 28000 },
];

export const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1500 },
  { month: 'Mar', users: 1800 },
  { month: 'Apr', users: 2300 },
  { month: 'May', users: 2800 },
  { month: 'Jun', users: 3200 },
  { month: 'Jul', users: 3800 },
  { month: 'Aug', users: 4200 },
  { month: 'Sep', users: 4600 },
  { month: 'Oct', users: 5100 },
];
