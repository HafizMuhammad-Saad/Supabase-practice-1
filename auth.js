let fullName = document.getElementById('fullname');
let signUpEmail = document.getElementById('email');
let signUpPassword = document.getElementById('password');

let signUpBtn = document.getElementById('signup-btn');

let googleSignupBtn = document.getElementById('google-signup')


async function signup() {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: signUpEmail.value,
            password: signUpPassword.value,
            options: {
                data: {
                  first_name: fullName.value,
                }
              }
          })
          if(error) throw error

          if (data) {

              Swal.fire({
                title: "Good job!",
                text: "Now, Kindly verify your email address for confirmation!",
                icon: "success"
              });
            }
            return data;

    } catch (error) {
        console.log(error);
        
    }
}


signUpBtn.addEventListener('click', signup);



async function signupWithGoogle() {
   try {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: 'http://127.0.0.1:5500/welcome.html'
      })
      if (error) throw error;

      if (user) {
        Swal.fire({
            title: "Sign in!",
            text: "Google Sign in successfully",
            icon: "success"
          });        
      }
   } catch (error) {
    console.log(error + 'No user found');
    
   }
}

googleSignupBtn.addEventListener("click", signupWithGoogle)