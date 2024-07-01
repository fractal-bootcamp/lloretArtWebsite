// import React from 'react';
// import { SignUp } from '@clerk/nextjs';

// export default function SignUpPage() {
//     return (
//         <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
//             <h1>Sign Up</h1>
//             <SignUp path="/signup" routing="path" signInUrl="/signin" />
//         </div>
//     );
// }
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return <SignUp />;
}