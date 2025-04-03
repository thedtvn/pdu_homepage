import { Dialog } from '@base-ui-components/react/dialog';
import { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import styles from './../../../styles/apps.module.css';
import { getToken } from '../../../utils/Helper';
import Select from 'react-select';


export default function User() {
    function dialog() {
        const [dialogOpen, setDialogOpen] = useState(false);
        const [username, setUsername] = useState<string | null>(null);
        const [password, setPassword] = useState<string | null>(null);
        const [role, setRole] = useState<"gv" | "sv" | "admin" | null>("sv");
        const [fullname, setFullname] = useState<string | null>(null);
        const [users, setUsers] = useState<any[]>([]);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            getUsers();
        }, []);

        function getUsers() {
            const token = getToken();
            if (!token) return;
            fetch(`/api/auth/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setUsers(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        function handleClose() {
            setDialogOpen(false);
            setUsername(null);
            setPassword(null);
        }

        function handleSave() {
            const token = getToken();
            if (!token) return;
            if (role == "sv") {
                if (!/^[0-9]+/g.test(username || "")) {
                    setError("Mã sinh viên không hợp lệ");
                    return;
                }
            } else {
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(username || "")) {
                    setError("Email không hợp lệ");
                    return;
                }
            }
            const data = {
                username: username,
                password: password,
                fullname: fullname,
                role: role
            };
            fetch(`/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setDialogOpen(false);
                    setUsername(null);
                    setPassword(null);
                    getUsers();
                })
                .catch((err) => {
                    console.log(err);
                });
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
                                {error && <Text color={"red"}>{error}</Text>}
                                <Input mt={3} placeholder='Fullname' value={fullname || ""} onChange={(e) => setFullname(e.target.value)} />

                                <Input mt={3} placeholder='Username' value={username || ""} onChange={(e) => setUsername(e.target.value)} />

                                <Input type='password' autoComplete="new-password" mt={3} placeholder='Password' value={password || ""} onChange={(e) => setPassword(e.target.value)} />

                                <Box mt={3} mb={3}>
                                    <Select
                                        onChange={(input) => setRole(input?.value as "gv" | "sv" | "admin")}
                                        defaultValue={{ value: "sv", label: "Sinh Viên" }}
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
                    {users.length > 0 ? users.map((user, index) => {
                        const role = user.role === "sv" ? "Sinh Viên" : user.role === "gv" ? "Giảng Viên" : "Admin";
                        return (
                            <>
                                <Flex key={index} justifyContent={"space-between"} alignItems={"center"} mb={3} ml={3} mr={3}  p={3} borderRadius={5} bg={"white"}>
                                    <Flex flexDirection={"column"} ml={3}>
                                        <Text fontSize={16} fontWeight={"bold"}>{user.fullname}</Text>
                                        <Text fontSize={14} color={"gray.500"}>Username: {user.username}</Text>
                                        <Text fontSize={14} color={"gray.500"}>Role: {role}</Text>
                                    </Flex>
                                    <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                                        <Button mt={3} colorScheme='red' onClick={() => {
                                            const token = getToken();
                                            if (!token) return;
                                            fetch(`/api/auth/delete`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    Authorization: token
                                                },
                                                body: JSON.stringify({ userId: user.userId })
                                            })
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    console.log(data);
                                                    getUsers();
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                });
                                        }}>
                                            Delete
                                        </Button>
                                    </Flex>
                                </Flex>
                            </>
                        )
                    }) : <Text textAlign={"center"} fontSize={16} fontWeight={"bold"}>No users found</Text>}
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