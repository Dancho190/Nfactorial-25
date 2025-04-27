import React,{ useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import AddExpenseForm from '../components/AddExpenseForm'
import ExpenseCard from '../components/ExpenseCard'
import Chart from '../components/Chart'
import './Home.css'
import { useAuth } from '../context/AuthContext'
import EditExpenseForm from '../components/EditExpense'

const Home = () => {
    const { token } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Стейты
    const [showModal, setShowModal] = useState(false); // Модалка для создания Expense
    const [expenses, setExpenses] = useState([]); 
    const [editingExpense, setEditingExpense] = useState(null); // Модалка для Update Expense

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => { // Логика fetch-а всех expense-ов что вы создали
      const fetchExpenses = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/expenses', {
            headers: {
              'Authorization': `Bearer ${token}`, // Токен передается с коллекциями юзера.
            },
          });
          const data = await res.json();
          if (res.ok) {
            setExpenses(data); // Создает expense с данными в формате json.
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error fetching expenses:', error);
        }
      };
  
      fetchExpenses();
    }, [token]);
  
    // Когда добавили новый расход
    const handleExpenseAdded = (newExpense) => { 
      setExpenses(prev => [...prev, newExpense]); // Показывает новый расход на странице
    };


    // Обновление расхода 
    const handleEditClick = (expense) => { // Открывает модалку с Edit-ом расхода
      setEditingExpense(expense);
    };
    
    const handleCloseEdit = () => { // закрывает модалку
      setEditingExpense(null);
    };
    
    const handleExpenseUpdated = (updatedExpense) => { // Дисплеит обновленный расход на странице
      setExpenses(prevExpenses =>
        prevExpenses.map(exp =>
          exp._id === updatedExpense._id ? updatedExpense : exp
        )
      );
    };

    // Удаление расхода 
    const handleDeleteExpense = async (id) => {
      if (!window.confirm('Are you sure you want to delete this expense?')) return; // Модалка для подтверждения удаления
    
      try {
        const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const data = await res.json();
    
        if (res.ok) {
          setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    };
    
    return (
      <div className="home-wrapper">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}  showModal={() => setShowModal(true)}/>
        <div className="home-content">
          <Header toggleSidebar={toggleSidebar} />
          <div className="main-section">
            <Chart />
            {showModal && <AddExpenseForm onClose={() => setShowModal(false)} onExpenseAdded={handleExpenseAdded}/>}
            <div className="expense-list-fixed">
            {expenses.map((expense) => (
              <ExpenseCard 
                key={expense._id} 
                expense={expense} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteExpense} 
              />
            ))}
            {editingExpense && (
               <EditExpenseForm
                expense={editingExpense}
                onClose={handleCloseEdit}
                onExpenseUpdated={handleExpenseUpdated}
              />
            )}
       </div>
     </div>
    </div>
    </div>
    );
  };

export default Home
