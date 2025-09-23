import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import React from 'react'

export default function ModelCombonenet({onOpenChange,isOpen ,handelFunction,discription=' Are you Sure ??' , titel,isLoading}) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{titel}</ModalHeader>
                        <ModalBody>
                            <p>
                               {discription}
                            </p>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" onPress={onClose} variant="light" >
                                Cansel
                            </Button>
                            <Button color="danger" isLoading={isLoading} onPress={() => handelFunction(onClose)} >
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
