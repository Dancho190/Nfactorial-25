import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { ExpenseContext } from '../context/ExpenseContext';
import './Chart.css';

const COLORS = ['#00C49F', '#FF444A']; // Income, Expense

const Chart = () => {
  const { expenses } = useContext(ExpenseContext); // Берем информацию с контекста

  const income = expenses // Из контекста дисплеиться income 
    .filter(e => e.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const data = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense },
  ];

  return (
    <div className="chart-container">
      <h2>Overview</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
      <div className="summary">
        <p><strong>Total Income:</strong> ${income.toFixed(2)}</p>
        <p><strong>Total Expense:</strong> ${expense.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Chart;
