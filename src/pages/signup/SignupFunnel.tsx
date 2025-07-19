import { useFunnel, Step } from '@hook/useFunnel';
import Signup from './components/Signup';
import Signup2 from './components/Signup2';
import SingupAgree from './components/SingupAgree';
import SignupEmailVerify from './components/SignupEmailVerify';
import { useState } from 'react';

const SignupFunnel = () => {
  const { Funnel, setStep } = useFunnel('singupAgree');
  const [email, setEmail] = useState('');

  return (
    <Funnel>
      <Step name="singupAgree">
        <SingupAgree
          onNext={() => setStep('signupEmailVerify')}
          setEmail={setEmail}
        />
      </Step>

      <Step name="signupEmailVerify">
        <SignupEmailVerify onNext={() => setStep('signup')} email={email} />
      </Step>

      <Step name="signup">
        <Signup onNext={() => setStep('signup2')} />
      </Step>

      <Step name="signup2">
        <Signup2 />
      </Step>
    </Funnel>
  );
};

export default SignupFunnel;
