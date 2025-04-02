import { Dialog } from '@base-ui-components/react/dialog';
import { useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import styles from './../../../styles/apps.module.css';
import { getToken } from '../../../utils/Helper';
import Select from 'react-select';


export default function User() {
    function dialog() {
        const [dialogOpen, setDialogOpen] = useState(false);
        const [username, setUsername] = useState<string | null>(null);
        const [password, setPassword] = useState<string | null>(null);
        const [role, setRole] = useState<"gv" | "sv" | "admin" | null>(null);
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
                               
                                <Input mt={3} placeholder='Username' value={username || ""} onChange={(e) => setUsername(e.target.value)}/>

                                <Input type='password' autocomplete="new-password" mt={3} placeholder='Password' value={password || ""} onChange={(e) => setPassword(e.target.value)} />
                                
                                <Box mt={3} mb={3}>
                                    <Select
                                        onChange={(tags) => setTags(tags.map(tag => tag.value))}
                                        isMulti
                                        name="Role"
                                        placeholder="Role"
                                        options={
                                            [
                                                { value: "gv", label: "Giảng Viên" },
                                                { value: "sv", label: "Sinh Viên" },
                                                { value: "admin", label: "Admin" }
                                            ]
                                        }
                                    />
                                </Box>
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