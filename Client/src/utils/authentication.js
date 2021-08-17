export default function authentication({next, router}) {
    if (!localStorage.getItem('token')) {
        return router.push({name: 'Login'});
    }
    return next();
}