export default function({ store, redirect }) {
  const isAuth = store.getters["auth/isAuthenticated"];

  if (!isAuth) {
    //nav to not authenticated
    console.log("redirected")
    return redirect("/notAuthenticated");
  }
}
