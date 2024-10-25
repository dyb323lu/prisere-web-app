import React from 'react';
import { Settings, Bell, Search, Home, FileText, Calculator, Users, Cog } from 'lucide-react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';

// Custom Card Components
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = '' }) => (
    <div className={`p-4 border-b ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children }) => (
    <h3 className="text-lg font-semibold">
        {children}
    </h3>
);

const CardContent = ({ children, className = '' }) => (
    <div className={`p-4 ${className}`}>
        {children}
    </div>
);

const Overview = () => {
    // Sample data for monthly sales
    const monthlyData = [
        { month: 'Mar', current: 7000, past: 9000 },
        { month: 'Apr', current: 4000, past: 6000 },
        { month: 'May', current: 6000, past: 8000 },
        { month: 'Jun', current: 5000, past: 7000 },
        { month: 'Jul', current: 5000, past: 7000 },
        { month: 'Aug', current: 4500, past: 6000 },
        { month: 'Sep', current: 3500, past: 4500 },
        { month: 'Oct', current: 4000, past: 5000 },
        { month: 'Nov', current: 4500, past: 6000 },
        { month: 'Dec', current: 5000, past: 7000 },
    ];

    // Sample data for expenses
    const expenseData = [
        { name: 'Expense 0', value: 1200000, color: '#475569' },
        { name: 'Expense 1', value: 800000, color: '#64748b' },
        { name: 'Expense 2', value: 645000, color: '#94a3b8' },
        { name: 'Expense 3', value: 590000, color: '#cbd5e1' },
        { name: 'Expense 4', value: 342000, color: '#e2e8f0' },
    ];

    // Sample data for customer distribution
    const customerData = [
        { name: 'Very Active', value: 40, color: '#475569' },
        { name: 'Inactive', value: 60, color: '#94a3b8' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Alert Card */}
            <Card className="mb-6">
                <CardContent className="flex justify-between items-center p-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText size={24} className="text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Disaster Declared in your state</h3>
                            <p className="text-gray-500 text-sm">Description + Time period</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        Build Claim
                    </button>
                </CardContent>
            </Card>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Revenue Impact */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <PieChart width={200} height={200}>
                            <Pie
                                data={[{ value: 67 }, { value: 33 }]}
                                cx={100}
                                cy={100}
                                startAngle={180}
                                endAngle={0}
                                innerRadius={60}
                                outerRadius={80}
                            >
                                <Cell fill="#475569" />
                                <Cell fill="#e2e8f0" />
                            </Pie>
                        </PieChart>
                    </CardContent>
                </Card>

                {/* Active Customers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Active Customers</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <PieChart width={200} height={200}>
                            <Pie
                                data={customerData}
                                cx={100}
                                cy={100}
                                outerRadius={80}
                                dataKey="value"
                            >
                                {customerData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </CardContent>
                </Card>

                {/* Risk Map */}
                <Card>
                    <CardHeader>
                        <CardTitle>Risk Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative h-48 bg-gray-100 rounded-lg">
                            <div className="absolute top-4 left-4 bg-gray-800 text-white p-2 rounded text-sm">
                                Suppliers in this region might be affected by the recent wildfires
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-3 gap-6">
                {/* Monthly Sales */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Monthly Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChart width={600} height={300} data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Bar dataKey="current" fill="#475569" name="Current Year" />
                            <Bar dataKey="past" fill="#e2e8f0" name="Past Year" />
                        </BarChart>
                    </CardContent>
                </Card>

                {/* Expenses */}
                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Expenses</CardTitle>
                        <button className="px-4 py-1 text-blue-600 border border-blue-600 rounded-md">
                            Add
                        </button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center mb-4">
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={expenseData}
                                    cx={100}
                                    cy={100}
                                    outerRadius={80}
                                    innerRadius={50}
                                    dataKey="value"
                                >
                                    {expenseData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="space-y-2">
                            {expenseData.map((expense, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: expense.color }}></div>
                                        <span>{expense.name}</span>
                                    </div>
                                    <span>${(expense.value / 1000).toFixed(0)}K</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default Overview;