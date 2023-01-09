import classNames from "../../../../helpers/classNames";
import { userProviderType, userServiceType } from "../../../../store/userTypeStore";
import InputField from "../../../../utilityComponents/InputField";
import { InputFieldProfileType } from "./Profile";

const InputFieldProfile: React.FC<InputFieldProfileType> = (props) => {
    const serviceType = userServiceType();
    const providerType = userProviderType();

    const isMatchingScope = (scope: string) => {
        const matchingArray = scope.replaceAll(",","").split(" ")
        return (matchingArray.includes(serviceType) || matchingArray.includes(`${serviceType}-${providerType}`))
    }
    
    const isVisible = isMatchingScope(props.scope)

    return (
        <>
            {isVisible && <InputField {...props} />}
        </>
    )
}

export default InputFieldProfile;