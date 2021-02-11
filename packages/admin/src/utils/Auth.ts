const authHandler = () => {
    let _isAuthenticated = true;

    const isAuthenticated = () => _isAuthenticated;
    const login = (cb?: () => void) => {
        _isAuthenticated = true;
        if (cb) cb();
    };
    const logout = (cb?: () => void) => {
        _isAuthenticated = false;
        if (cb) cb();
    };
    return {
        isAuthenticated,
        login,
        logout,
    };
};
export default authHandler();
