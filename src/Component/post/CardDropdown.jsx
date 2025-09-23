import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React from 'react'
export default function CardDropdown({onOpen,setIsInUpdateMode}) {

    return (
        <Dropdown>
            <DropdownTrigger>

                <svg className="w-fit  rotate-90 cursor-pointer outline-0" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"> </circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>

            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="edit" onPress={()=>setIsInUpdateMode(true)}>Edit post</DropdownItem>
                <DropdownItem key="delete" onPress={onOpen} className="text-danger" color="danger">
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
