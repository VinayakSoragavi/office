import SampleForm from '@/components/common/Form/SampleForm';
import { visitorForm } from '@/json/form-data/previsitor';

export default function Home() {
  return (
    <>
      {/* <InputField type="text"/>
    <SelectField/>
    <ToggleSwitch/> */}
      <SampleForm  department={visitorForm}/>
      {/* <SampleFormSec/> */}
      {/* <SampleFormThree formValue={visitorForm}/> */}

    </>
  );
}
