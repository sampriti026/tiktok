import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="bg-white shadow p-4 mb-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Card 1</h2>
                    <p className="text-gray-700">Content for card 1.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Card 2</h2>
                    <p className="text-gray-700">Content for card 2.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Card 3</h2>
                    <p className="text-gray-700">Content for card 3.</p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;