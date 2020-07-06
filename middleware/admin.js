export default function({ store, redirect }) {
  const isAdmin = store.getters["auth/isAdmin"];

  if (!isAdmin) {
    //nav to not authorized
    console.log("redirected");
    return redirect("/notAuthorized");
  }
}
