
export interface DashboardMetrics {
  totalSales: number;
  activeUsers: number;
  cartUsage: number;
  timestamp: string;
}

export interface SalesData {
  date: string;
  amount: number;
  category: string;
}

let listeners: ((data: DashboardMetrics) => void)[] = [];

// Simulated initial data
const generateInitialSalesData = (): SalesData[] => {
  const categories = ['Groceries', 'Electronics', 'Clothing', 'Home'];
  const data: SalesData[] = [];
  
  for (let i = 0; i < 30; i++) {
    categories.forEach(category => {
      data.push({
        date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        amount: Math.floor(Math.random() * 10000) + 1000,
        category
      });
    });
  }
  
  return data;
};

export const salesData = generateInitialSalesData();

// Simulated real-time updates
export const startRealtimeUpdates = (callback: (data: DashboardMetrics) => void) => {
  listeners.push(callback);
  
  // Initial data
  const sendUpdate = () => {
    const metrics: DashboardMetrics = {
      totalSales: Math.floor(Math.random() * 50000) + 10000,
      activeUsers: Math.floor(Math.random() * 100) + 20,
      cartUsage: Math.floor(Math.random() * 80) + 10,
      timestamp: new Date().toISOString()
    };
    
    listeners.forEach(listener => listener(metrics));
  };

  // Send updates every 5 seconds
  const interval = setInterval(sendUpdate, 5000);
  sendUpdate(); // Initial update

  // Cleanup function
  return () => {
    clearInterval(interval);
    listeners = listeners.filter(l => l !== callback);
  };
};

