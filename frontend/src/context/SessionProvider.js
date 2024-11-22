import React, { createContext, useContext, useState, useEffect } from 'react';
import { GetSessionId } from '../api/api';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionId = await GetSessionId();
                setSession(sessionId);
            } catch (error) {
                console.error("Failed to fetch session:", error);
            }
        };
        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};

export const waitForSessionId = async (checkInterval = 1000, maxRetries = 10) => {
    let retries = 0;

    const fetchSession = async () => {
        const sessionId = await GetSessionId();
        if (sessionId) {
            return sessionId; // 세션 ID가 유효하면 반환
        }
        if (retries >= maxRetries) {
            throw new Error("Session ID not available after max retries.");
        }
        retries++;
        await new Promise((resolve) => setTimeout(resolve, checkInterval)); // 대기
        return fetchSession(); // 재귀 호출
    };

    return fetchSession();
};