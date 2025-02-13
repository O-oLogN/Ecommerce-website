import InputField from "pages/CheckoutPage/components/InputField.tsx"
import Dropdown from "pages/CheckoutPage/components/Dropdown.tsx"
import Header from "pages/CheckoutPage/components/Header.tsx"

const ShippingAddress = () => {
    return (
        <div>
            <Header name='Shipping address' />
            <div className="flex">
                <div>
                    <InputField name="first-name" label="First name" required={ true } clss="first-name-input" />
                    <InputField name="address" label="Address" required={ true } clss="address-input" />
                    <InputField name="postal-code" label="Postal code" required={ true } clss="postal-code-input" />
                    <Dropdown name="country" clss="country-dropdown" options={['Country', 'Viet Nam', 'United States', 'Swiss', 'Japan']} />
                    <InputField name="email" label="Email" required={ true } clss="email-input" type="email" />
                </div>
                <div>
                    <InputField name="last-name" label="Last name" required={ true } clss="last-name-input" />
                    <InputField name="company" label="Company" clss="company-input" />
                    <InputField name="city" label="City" required={ true } clss="city-input" />
                    <InputField name="state-province" label="State/Province" clss="first-name-input" />
                    <InputField name="phone" label="Phone" required={ true } clss="phone-input" type="number" />
                </div>
            </div>
            <button className="">
                Continue to Delivery
            </button>
        </div>
    )
}

export default ShippingAddress