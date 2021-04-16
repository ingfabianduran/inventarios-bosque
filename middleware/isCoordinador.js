export default ({ $auth, redirect }) => {
  if ($auth.user.rol !== 'COORDINADOR') {
    return redirect('/inventarios/equipos');
  }
};
