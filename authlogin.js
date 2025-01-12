let loginEmail = document.getElementById('email-login');
let loginPassword = document.getElementById('password-login');

let loginBtn = document.getElementById('login-btn');

let googleLoginBtn = document.getElementById('google-login');

let logoutBtn = document.getElementById('logout-btn');


async function login(e) {
    try {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmail.value,
            password: loginPassword.value,
          })
          if (error) throw error;
    
          if (data) {
            Swal.fire({
                title: "Good job!",
                text: "Successfully logged in",
                icon: "success"
              });
          }

          setTimeout(() => {
            location.assign = 'http://127.0.0.1:5500/welcome.html'
            
          }, 5000);
            
          return data
    } catch (error) {
        console.log(error);
        alert(error.message);
        
    }
   
}

async function loginWithGoogle() {
    try {
     const { user, session, error } = await supabase.auth.signInWithOAuth({
         provider: 'google',
         redirectTo: 'http://localhost:3000/login-form.html'
       })
       if (error) throw error;
 
       if (user) {
         alert("Google Sign In Successfully" + user.email)
         
       }
    } catch (error) {
     console.log(error + 'No user found');
     
    }
 }

        async function signOut() {
            const { error } = await supabase.auth.signOut()
            Swal.fire({
                title: "Log Out",
                text: 'log out successfully', 
                icon: "success"
              });
          }

logoutBtn.addEventListener('click', signOut)
 
 googleLoginBtn.addEventListener("click", loginWithGoogle)

loginBtn.addEventListener('click', login);