/* eslint-disable no-unused-vars */
import React, { useReducer, useState } from 'react';
import { data } from '../data/data';
import Model from './Model';

const reducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const newPeople = [...state.people, action.payload];
        return {
            ...state,
            people: newPeople,
            isModelOpen: true,
            modelContent: "Item Added",
        };
    }
    if (action.type === 'NO_VALUE') {
        return {
            ...state,
            isModelOpen: true,
            modelContent: "Please Enter a Value",
        };
    }
    if (action.type === 'REMOVE_ITEM') {
        const filteredPeople = state.people.filter(person => person.id !== action.payload);
        return {
            ...state,
            people: filteredPeople,
            isModelOpen: true,
            modelContent: "Item Removed",
        };
    }
    if (action.type === 'CLOSE_MODEL') {
        return {
            ...state,
            isModelOpen: false,
        };
    } else {
        throw new Error('No Matching Action');
    }
};

const defaultState = {
    people: [],
    isModelOpen: false,
    modelContent: 'Model'
}

export default function Index() {
    const [name, setName] = useState('');
    const [state, dispatch] = useReducer(reducer, defaultState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            const newItem = { id: new Date().getTime().toString(), firstName: name };
            dispatch({ type: 'ADD_ITEM', payload: newItem });
            setName('');
        } else {
            dispatch({ type: "NO_VALUE" });
        }
    }

    const handleRemove = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    }

    const closeModel = () => {
        dispatch({ type: "CLOSE_MODEL" });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {state.isModelOpen && <Model modelContent={state.modelContent} closeModel={closeModel} />}
            <article className="p-4 max-w-md w-full">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" >Submit</button>
                </form>
            </article>
            <div className="p-4 max-w-4xl w-full mt-4">
                {state.people.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {state.people.map((person) => {
                            const { id, firstName } = person;
                            return (
                                <div key={id} className="bg-gray-200 p-4 rounded-md shadow-sm flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">{firstName}</h3>
                                    <button onClick={() => handleRemove(id)} className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Clear</button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No people added yet.</p>
                )}
            </div>
        </div>
    );
}
