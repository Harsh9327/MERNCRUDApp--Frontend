import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const App = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
        setItems(res.data);
    };

    const addItem = async (e) => {

      e.preventDefault();
      if (!name.trim()) {
          return;
      }
        if (editId) {
            await axios.put(`${process.env.REACT_APP_API_URL}/${editId}`, { name });
            setEditId(null);
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}`, { name });
        }
        setName('');
        fetchItems();
    };

    const deleteItem = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
        fetchItems();
    };

    const editItem = (item) => {
        setName(item.name);
        setEditId(item._id);
    };

    return (
        <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">CRUD App</h1>
            <div className="w-full max-w-lg mb-6 bg-white p-6 rounded-lg shadow-lg">
                <input
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 border-gray-300 p-2 rounded-lg w-full mb-4"
                    placeholder="Enter item name"
                />
                <button
                    type="submit"
                    onClick={addItem}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {editId ? 'Update' : 'Add'} Item
                </button>
            </div>
            <div className="w-full max-w-lg">
                <ul className="grid grid-cols-1 gap-4">
                    {items.map(item => (
                        <li key={item._id} className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
                            <span className="flex-1">{item.name}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => editItem(item)}
                                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-700 transition duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteItem(item._id)}
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
