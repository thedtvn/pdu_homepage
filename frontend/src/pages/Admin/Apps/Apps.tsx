import { Dialog } from '@base-ui-components/react/dialog';
import { useEffect, useState } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import styles from './../../../styles/apps.module.css';
import { getToken } from '../../../utils/Helper';
import { redirect } from 'react-router';

interface App {
    appId: string;
    appName: string;
    appSecret: string;
    appRedirectUri: string;
}

export default function Apps() {
    function dialog() {
        const [dialogOpen, setDialogOpen] = useState(false);
        const [appName, setAppName] = useState<string | null>(null);
        const [appRedirectUri, setAppRedirectUri] = useState<string | null>(null);
        const [apps, setApps] = useState<App[]>([]);

        function loadApps() {
            let tokens = getToken();
            if (!tokens) {
                redirect("/login");
                return;
            };
            fetch('/api/oauth2/apps', {
                headers: {
                    Authorization: tokens,
                }
            })
                .then(response => response.json())
                .then(data => setApps(data))
                .catch(error => console.error('Error fetching apps:', error));
        }

        useEffect(() => {
            loadApps();
        }, []);


        function handleClose() {
            setDialogOpen(false);
            setAppName(null);
            setAppRedirectUri(null);
        }

        function handleSave() {
            // Handle the save logic here
            console.log('App Name:', appName);
            console.log('App Redirect URI:', appRedirectUri);
            fetch('/api/oauth2/create_app', {
                headers: {
                    Authorization: getToken() || "",
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    app_name: appName,
                    redirect_uri: appRedirectUri
                })
            }).then(response => response.json())
                .then(data => {
                    console.log('App created:', data);
                    loadApps();
                    handleClose();
                })
                .catch(error => console.error('Error creating app:', error));
        }

        function handleDelete(appId: string) {
            fetch('/api/oauth2/delete_app', {
                headers: {
                    Authorization: getToken() || "",
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    app_id: appId
                })
            }).then(response => response.json())
                .then(data => {
                    alert("Xóa app thành công");
                    loadApps();
                })
                .catch(error => console.error('Error deleting app:', error));
        }

        return (
            <>
                <Flex justifyContent={"space-between"} alignItems={"center"} p={3} borderRadius={5} mb={3}>
                    <Text fontSize={20} fontWeight={"bold"}>Apps</Text>
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
                                <Dialog.Title className={styles.Title}>New Apps</Dialog.Title>
                                <Dialog.Description className={styles.Description}>
                                    Create a new app
                                </Dialog.Description>
                                <Input onChange={(v) => setAppName(v.target.value)} type='text' mt={3} placeholder='App Name' className={styles.Input} />
                                <Input onChange={(v) => setAppRedirectUri(v.target.value)} type='text' mt={3} placeholder='App Redirect URI' className={styles.Input} />
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
                    {apps.length > 0 ? apps.map((app, index) => {
                        return (
                            <Flex bg={"white"} justifyContent={"space-between"} alignItems={"center"} p={3} m={3} borderRadius={10}>
                                <Flex flexDirection={"column"} gap={2}>
                                    <Text fontSize={20} fontWeight={"bold"}>{app.appName}</Text>
                                    <Text fontSize={16}>App Redirect URI: {app.appRedirectUri}</Text>
                                    <Text fontSize={16}>
                                        App Secret: 
                                        <Button ml={2} colorScheme={"blue"} onClick={() => {
                                            navigator.clipboard.writeText(app.appSecret);
                                        }
                                        }>Nhấn để copy</Button>
                                    </Text>
                                    <Text fontSize={16}>App ID: {app.appId}</Text>
                                </Flex>
                                <Button colorScheme={"red"} onClick={() => handleDelete(app.appId)}>Delete</Button>
                            </Flex>
                        );
                    }) : (<Text fontSize={20} fontWeight={"bold"} textAlign={"center"}>Chưa có apps nào được tạo cả</Text>)
                    }
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