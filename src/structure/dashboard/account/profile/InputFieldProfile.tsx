import { userProviderType, userServiceType } from "../../../../store/userTypeStore";

export interface InputFieldProfileType {
    scope: string;
    children: JSX.Element;
  }

const InputFieldProfileToggler = ({scope, children}: InputFieldProfileType) => {
    const serviceType = userServiceType();
    const providerType = userProviderType();

    const isMatchingScope = (scope: string) => {
        if (!serviceType) return false;
        const matchingArray = scope.replaceAll(",","").split(" ")
        return (matchingArray.includes(serviceType) || matchingArray.includes(`${serviceType}-${providerType}`))
    }
    
    const isVisible = isMatchingScope(scope)

    return (
        <>
            {isVisible && children }
        </>
    )
}

export default InputFieldProfileToggler;