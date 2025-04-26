import { createContext, useContext, useEffect, useState } from 'react';
import ExpenseCard from '../components/ExpenseCard';
import Chart from '../components/Chart';

export const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

 // const fetchExpenses = async () => {
    // try {
      //const res = await fetch('/api/expenses');
     // const data = await res.json();
     // setExpenses(data);
   // } catch (err) {
    //  console.error('Failed to fetch expenses', err);
   // }
 // };

  const addExpense = (expense) => setExpenses((prev) => [...prev, expense]);
  const deleteExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  //useEffect(() => {
  //  fetchExpenses();
  //}, []);

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}> {/* fetchExpenses*/}
      {children}
      <ExpenseCard />
    </ExpenseContext.Provider>
  );
};