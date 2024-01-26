export const authCredential = [
  {
    id: 1,
    name: "Towhid",
    email: "Towhidulislam@gmail.com",
    password: "12345678",
  },
];

if(typeof window !== 'undefined'){
    localStorage.setItem("userCred", JSON.stringify(authCredential));
}
