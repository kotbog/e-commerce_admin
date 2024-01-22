import {FC} from "react";
import {User} from "@/app/types";
type CustomerDataProps = {
    userData: User
};
const CustomerData : FC<CustomerDataProps> = ({userData}) => {
    return <div className={'flex flex-col basis-1'}>
        <h1 className={'font-bold my-5 text-xl'}>Customer&apos;s data</h1>
        <div className={'flex flex-col w-1/2'}>
            <p className={'flex justify-between'}><h3 className={'font-bold'}>Name: </h3><span>{`${userData.first_name} ${userData.last_name}`}</span></p>
            <p className={'flex justify-between'}><h3 className={'font-bold'}>Phone number: </h3><span>{`${userData.telephone || 'Not specified'}`}</span></p>
            <p className={'flex justify-between'}><h3 className={'font-bold'}>Address: </h3><span>{`${userData.address || 'Not specified'}`}</span></p>
            <p className={'flex justify-between'}><h3 className={'font-bold'}>Email: </h3><span>{`${userData.email || 'Not specified'}`}</span></p>
        </div>
    </div>
}

export default CustomerData;