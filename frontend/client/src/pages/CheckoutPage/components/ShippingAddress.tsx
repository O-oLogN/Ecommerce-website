import InputField from "pages/CheckoutPage/components/InputField.tsx"
import Dropdown from "pages/CheckoutPage/components/Dropdown.tsx"
import Header from "pages/CheckoutPage/components/Header.tsx"
import {ShippingAddressFormProps, ShippingAddressProps} from "pages/CheckoutPage/types"
import React, {useEffect, useState} from "react"

const ShippingAddress: React.FC<ShippingAddressProps> = ({ status, setStatus, setShippingAddressForm }) => {
    const [shippingAddressForm, saveShippingAddressForm] = useState<ShippingAddressFormProps>({
        firstName: '',
        lastName: '',
        address: '',
        postalCode: '',
        country: '',
        email: '',
        company: '',
        city: '',
        stateProvince: '',
        phone: '',
    })
    const validateForm = (formData: FormData) => {
        const firstName = (formData.get("first-name") ?? '').toString()
        const lastName = (formData.get("last-name") ?? '').toString()
        const email = (formData.get("email") ?? '').toString()
        const phone = (formData.get("phone") ?? '').toString()
        const address = (formData.get("address") ?? '').toString()
        const city = (formData.get("city") ?? '').toString()
        const country = (formData.get("country") ?? '').toString()
        const postalCode = (formData.get("postal-code") ?? '').toString()

        return firstName !== '' && lastName !== '' && email !== '' && phone !== ''
            && address !== '' && city !== '' && country !== '' && postalCode !== ''
    }
    const extractFormInputs = (formData: FormData) => {
        return {
            firstName: (formData.get("first-name") ?? '').toString(),
            lastName: (formData.get("last-name") ?? '').toString(),
            email: (formData.get("email") ?? '').toString(),
            phone: (formData.get("phone") ?? '').toString(),
            address: (formData.get("address") ?? '').toString(),
            city: (formData.get("city") ?? '').toString(),
            stateProvince: (formData.get("state-province") ?? '').toString(),
            country: (formData.get("country") ?? '').toString(),
            postalCode: (formData.get("postal-code") ?? '').toString(),
            company: (formData.get("company") ?? '').toString(),
        }
    }
    const onClickContinueToDeliveryButton = (event: any) => {
        event.preventDefault()
        const form = document.querySelector(".shipping-address-form") as HTMLFormElement
        const formData = new FormData(form!)
        if (!validateForm(formData)) return

        saveShippingAddressForm(extractFormInputs(formData))
        setStatus([true, status[1], status[2]])
    }

    useEffect(() => {
        if (status[0] && status[1] && status[2]) {
            setShippingAddressForm(shippingAddressForm)
        }
    }, [status])

    return (
        <div className="mt-[50px]">
            <Header
                name='Shipping address'
                sectionIndex={0}
                status={ status }
                setStatus={ setStatus }
            />
            { !status[0] && <>
                <form className="shipping-address-form flex" onSubmit={onClickContinueToDeliveryButton}>
                    <div className="mt-[10px]">
                        <InputField name="first-name" label="First name" required={true} clss="first-name-input" style="ml-[5px]" defaultValue={ shippingAddressForm.firstName } />
                        <InputField name="address" label="Address" required={true} clss="address-input" style="ml-[20px]" defaultValue={ shippingAddressForm.address }/>
                        <InputField name="postal-code" label="Postal code" required={true} clss="postal-code-input" style="-ml-[5px]" defaultValue={ shippingAddressForm.postalCode } />
                        <Dropdown name="country" clss="country-dropdown"
                                  options={['Country', 'Viet Nam', 'United States', 'Swiss', 'Japan']}
                                  style="mt-[20px] ml-[35px] border-2 w-[185px]"
                                  label="Country"
                                  defaultOption={ shippingAddressForm.country }
                        />
                        <InputField name="email" label="Email" required={true} clss="email-input" type="email" style="ml-[35px] w-[203px]" defaultValue={ shippingAddressForm.email } />
                    </div>
                    <div className="mt-[8px] ml-[20px]">
                        <InputField name="last-name" label="Last name" required={true} clss="last-name-inut" style="ml-[40px]" defaultValue={ shippingAddressForm.lastName } />
                        <InputField name="company" label="Company" clss="company-input" style="ml-[45px]" defaultValue={ shippingAddressForm.company } />
                        <InputField name="city" label="City" required={true} clss="city-input" style="ml-[85px]" defaultValue={ shippingAddressForm.city }/>
                        <InputField name="state-province" label="State/Province" clss="state-province-input" style="ml-[10px] mt-[5px]" defaultValue={ shippingAddressForm.stateProvince } />
                        <InputField name="phone" label="Phone" required={true} clss="phone-input" type="number" style="ml-[68px] mt-[10px]" defaultValue={ shippingAddressForm.phone }/>
                    </div>
                </form>
                <button className="w-[250px] mt-[40px] ml-[240px] p-2 mb-[40px] bg-gray-800 border border-white" type="submit" onClick={onClickContinueToDeliveryButton}>
                    Continue to Delivery
                </button>
            </> }
        </div>
    )
}

export default ShippingAddress