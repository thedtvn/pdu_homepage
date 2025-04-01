import { Dialog } from '@base-ui-components/react/dialog';
import { useState } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import styles from './../../../styles/apps.module.css';
import { getToken } from '../../../utils/Helper';


export default function User() {
    function dialog() {
        const [dialogOpen, setDialogOpen] = useState(false);
        const [username, setUsername] = useState<string | null>(null);
        const [password, setPassword] = useState<string | null>(null);
        const [users, setUsers] = useState<any[]>([]);


        function handleClose() {
            setDialogOpen(false);
            setUsername(null);
            setPassword(null);
        }

        return (
            <>
                <Flex justifyContent={"space-between"} alignItems={"center"} p={3} borderRadius={5} mb={3}>
                    <Text fontSize={20} fontWeight={"bold"}>Users</Text>
                    <Dialog.Root
                        open={dialogOpen}
                        onOpenChange={(open) => {
                            console.log("open", open);
                            if (open) {
                                setDialogOpen(true);
                            } else {
                                handleClose();
                            }
                        }}
                    >
                        <Dialog.Trigger>
                            <Flex borderRadius={5} bg={"white"} p={3} alignItems={"center"} justifyContent={"center"} h={10} fontSize={16} fontWeight={"bold"}>
                                Create New App
                            </Flex>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Backdrop className={styles.Backdrop} />
                            <Dialog.Popup className={styles.Popup}>
                                <Dialog.Title className={styles.Title}>New Users</Dialog.Title>
                                <Dialog.Description className={styles.Description}>
                                    Create a new user
                                </Dialog.Description>
                               
                                <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className={styles.Input} />

                                <Input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.Input} />

                                

                                <Button onClick={() => handleClose()} className={styles.CloseButton}>
                                    Close
                                </Button>
                                <Button ml={3} onClick={() => handleSave()} className={styles.CloseButton}>
                                    Save
                                </Button>
                            </Dialog.Popup>
                        </Dialog.Portal>
                    </Dialog.Root>
                </Flex>
                <Flex flexDirection={"column"} gap={3}>
                    
                </Flex>
            </>
        );
    }
    return (
        <div>
            {dialog()}
        </div>
    )
}