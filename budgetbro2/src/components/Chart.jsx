import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';
import './Chart.css'; // стили

const COLORS = ['#ff6384', '#36a2eb'];

const Chart = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const expenses = await res.json();

        if (res.ok) {
          const expensesTotal = expenses
            .filter(e => e.type === 'expense')
            .reduce((sum, e) => sum + parseFloat(e.amount), 0);
          const incomesTotal = expenses
            .filter(e => e.type === 'income')
            .reduce((sum, e) => sum + parseFloat(e.amount), 0);

          setData([
            { name: 'Expenses', value: expensesTotal },
            { name: 'Incomes', value: incomesTotal },
          ]);
        } else {
          console.error(expenses.message);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="chart-container">
      <h2>Income vs Expense</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Chart;
