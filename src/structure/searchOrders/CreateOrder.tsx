import VendorCardFull from "../cards/VendorCardFull";
import CreateOrderInput from "./CreateOrderInput";

export default function CreateOrder() {
    return (
        <div className="max-w-5xl mx-auto">
            <VendorCardFull/>
            <div className="z-20 fixed top-0 left-0 w-full h-full opacity-70 bg-black"></div>
            <div className="absolute w-full max-w-xl z-30 left-1/2 top-0 bottom-0 sm:mt-10 sm:mb-10 -translate-x-1/2 bg-white py-10 sm:px-10 overflow-scroll">
                <CreateOrderInput />
            </div>
        </div>
    );
}
