import { useFunnel, Step } from '@hook/useFunnel';
import Signup from './components/Signup';
import Signup2 from './components/Signup2';
import SingupAgree from './components/SingupAgree';

const SignupFunnel = () => {
  const { Funnel, setStep } = useFunnel('singupAgree');

  return (
    <Funnel>
      <Step name="singupAgree">
        <SingupAgree onNext={() => setStep('signup')} />
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
