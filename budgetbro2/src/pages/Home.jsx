import React,{ useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import AddExpenseForm from '../components/AddExpenseForm'
import ExpenseCard from '../components/ExpenseCard'
import Chart from '../components/Chart'
import './Home.css'

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Стейты
    const [showModal, setShowModal] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const dummyExpenses = [
        { id: 1, amount: 30, category: 'Food', date: '2025-04-24', description: 'Pizza' },
        { id: 2, amount: 20, category: 'Transport', date: '2025-04-23', description: 'Metro ride' },
        { id: 3, amount: 100, category: 'Shopping', date: '2025-04-22', description: 'New jeans' },
      ];

    return (
      <div className="home-wrapper">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}  showModal={() => setShowModal(true)}/>
        <div className="home-content">
          <Header toggleSidebar={toggleSidebar} />
          <div className="main-section">
            <Chart />
            {showModal && <AddExpenseForm onClose={() => setShowModal(false)} />}
            <div className="expense-list-fixed">
             {dummyExpenses.map((expense) => (
           <ExpenseCard key={expense.id} expense={expense} onEdit={() => {}} onDelete={() => {}} />
         ))}
       </div>
     </div>
    </div>
    </div>
    );
  };

export default Home
