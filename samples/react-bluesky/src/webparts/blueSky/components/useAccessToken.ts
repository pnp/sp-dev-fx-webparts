import { useState, useEffect } from 'react';

const getAccessToken = async (handle: string, appPassword: string): Promise<string> => {
    const response = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: handle, password: appPassword }),
    });
    if (!response.ok) throw new Error(`Failed to get access token: ${response.statusText}`);
    const data = await response.json();
    return data.accessJwt;
};

const useAccessToken = (handle: string, appPassword: string): { accessToken: string | undefined, error: string | undefined } => {
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchToken = async (): Promise<void> => {
            try {
                const token = await getAccessToken(handle, appPassword);
                setAccessToken(token);
            } catch (err) {
                if (err instanceof Error) setError("Failed to retrieve access token: " + err.message);
            }
        };
        fetchToken().catch((err) => console.error("Failed to fetch token:", err));
    }, [handle, appPassword]);

    return { accessToken, error };
};

export default useAccessToken;