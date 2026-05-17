export const getUserRole = (): string => {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return 'GUEST';
        const user = JSON.parse(userStr);
        return user.role || 'USER';
    } catch {
        return 'GUEST';
    }
};