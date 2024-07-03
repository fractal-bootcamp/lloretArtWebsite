export const saveArt = async (artParams: string, getToken: () => Promise<string | null>) => {
    try {
        const response = await fetch('/api/backgrounds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`,
            },
            body: JSON.stringify({ artParams }),
        });

        if (!response.ok) {
            throw new Error('Failed to save data');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error saving data:', error);
        return null;
    }
};
