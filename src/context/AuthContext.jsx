import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('khojiUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('khojiUser');
            }
        }
        setIsLoading(false);
    }, []);

    // Get all users from localStorage
    const getAllUsers = () => {
        const users = localStorage.getItem('khojiUsers');
        return users ? JSON.parse(users) : [];
    };

    // Save all users to localStorage
    const saveAllUsers = (users) => {
        localStorage.setItem('khojiUsers', JSON.stringify(users));
    };

    // Signup function
    const signup = (name, email, password) => {
        const users = getAllUsers();

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            throw new Error('Email already registered');
        }

        // Validate inputs
        if (!name || !email || !password) {
            throw new Error('All fields are required');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In production, this should be hashed!
            createdAt: new Date().toISOString()
        };

        // Save to users list
        users.push(newUser);
        saveAllUsers(users);

        // Auto-login after signup
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        localStorage.setItem('khojiUser', JSON.stringify(userWithoutPassword));

        return userWithoutPassword;
    };

    // Login function
    const login = (email, password) => {
        const users = getAllUsers();

        const foundUser = users.find(u => u.email === email && u.password === password);

        if (!foundUser) {
            throw new Error('Invalid email or password');
        }

        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        localStorage.setItem('khojiUser', JSON.stringify(userWithoutPassword));

        return userWithoutPassword;
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('khojiUser');
    };

    const value = {
        user,
        isLoading,
        signup,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
